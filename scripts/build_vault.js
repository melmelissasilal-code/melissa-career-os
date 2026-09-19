// scripts/build_vault.js
const fs = require('fs');
const path = require('path');

const repoDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(repoDir, 'data.js');
const dataJsonPath = path.join(repoDir, 'data.json');
const vaultJsPath = path.join(repoDir, 'assets', 'vault_data.js');

// Load data.js
const code = fs.readFileSync(dataJsPath, 'utf8');
const sandbox = { window: {} };
const fn = new Function('window', code);
fn(sandbox.window);

const rawData = sandbox.window.CAREER_DATA;
if (!rawData) {
  console.error('CAREER_DATA not found in data.js');
  process.exit(1);
}

// Extract private data
const privateData = {
  processos_seletivos: rawData.processos_seletivos || [],
  empresas_alvo: rawData.empresas_alvo || [],
  autopsias: rawData.autopsias || [],
  last_updated: new Date().toISOString()
};

console.log('Private data to encrypt:', {
  processos: privateData.processos_seletivos.length,
  empresas: privateData.empresas_alvo.length,
  autopsias: privateData.autopsias.length
});

const enc = new TextEncoder();

function bytesToBase64(bytes) {
  return Buffer.from(bytes).toString('base64');
}

async function deriveKey(password, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function createVault() {
  // 1. Generate master 256-bit vault key
  const masterKeyBytes = crypto.getRandomValues(new Uint8Array(32));
  const masterKey = await crypto.subtle.importKey(
    'raw',
    masterKeyBytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );

  // 2. Encrypt private data with master key
  const dataIv = crypto.getRandomValues(new Uint8Array(12));
  const encodedPayload = enc.encode(JSON.stringify(privateData));
  const encryptedPayload = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: dataIv },
    masterKey,
    encodedPayload
  );

  // 3. Encrypt masterKeyBytes with each authorized passphrase
  const passphrases = ['240926', 'melissa2026'];
  const slots = [];

  for (const pass of passphrases) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const slotIv = crypto.getRandomValues(new Uint8Array(12));
    const passKey = await deriveKey(pass, salt);
    const encryptedMasterKey = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: slotIv },
      passKey,
      masterKeyBytes
    );

    slots.push({
      id: 'slot_' + (pass.length === 6 ? 'pin' : 'pwd'),
      salt: bytesToBase64(salt),
      iv: bytesToBase64(slotIv),
      key: bytesToBase64(new Uint8Array(encryptedMasterKey))
    });
  }

  const vault = {
    version: '1.0',
    algorithm: 'AES-GCM-256',
    kdf: 'PBKDF2-SHA256-100k',
    slots: slots,
    dataIv: bytesToBase64(dataIv),
    payload: bytesToBase64(new Uint8Array(encryptedPayload))
  };

  const vaultContent = `/* MELISSA CAREER OS - Encrypted Vault (Zero-Knowledge) */
/* Criptografado com AES-GCM 256-bit e PBKDF2 (100.000 iterações). */
/* Apenas quem possui o PIN/Senha de Melissa consegue decifrar os dados. */
window.CAREER_VAULT = ${JSON.stringify(vault, null, 2)};
`;

  fs.writeFileSync(vaultJsPath, vaultContent, 'utf8');
  console.log('Encrypted vault created successfully at:', vaultJsPath);

  // 4. Update data.js and data.json to sanitize public file
  const publicData = { ...rawData };
  publicData.processos_seletivos = [];
  publicData.empresas_alvo = [];
  publicData.autopsias = [];

  const publicDataJsContent = `window.CAREER_DATA = ${JSON.stringify(publicData, null, 2)};\n`;
  fs.writeFileSync(dataJsPath, publicDataJsContent, 'utf8');
  console.log('Sanitized data.js created (public data only).');

  fs.writeFileSync(dataJsonPath, JSON.stringify(publicData, null, 2), 'utf8');
  console.log('Sanitized data.json created (public data only).');
}

createVault().catch(console.error);
