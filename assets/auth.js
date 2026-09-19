/* MELISSA CAREER OS - Client-Side Vault Authentication (auth.js) */
/* Criptografia AES-GCM 256-bit com Web Crypto API nativa do navegador */

(function () {
  const SESSION_KEY = 'mcos_auth_token';
  const REMEMBER_KEY = 'mcos_remember_pref';

  const enc = new TextEncoder();
  const dec = new TextDecoder();

  function base64ToBytes(b64) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    return bytes;
  }

  function bytesToBase64(bytes) {
    let bin = '';
    for (let i = 0; i < bytes.length; i++) {
      bin += String.fromCharCode(bytes[i]);
    }
    return btoa(bin);
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

  async function decryptVaultWithPass(vault, pass) {
    if (!vault || !vault.slots) {
      throw new Error('Cofre criptografado não encontrado.');
    }

    for (const slot of vault.slots) {
      try {
        const salt = base64ToBytes(slot.salt);
        const iv = base64ToBytes(slot.iv);
        const encryptedMasterKey = base64ToBytes(slot.key);
        const passKey = await deriveKey(pass, salt);

        const masterKeyBytes = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv },
          passKey,
          encryptedMasterKey
        );

        const masterKey = await crypto.subtle.importKey(
          'raw',
          masterKeyBytes,
          { name: 'AES-GCM' },
          false,
          ['decrypt']
        );

        const dataIv = base64ToBytes(vault.dataIv);
        const encryptedPayload = base64ToBytes(vault.payload);
        const decrypted = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: dataIv },
          masterKey,
          encryptedPayload
        );

        return JSON.parse(dec.decode(decrypted));
      } catch (err) {
        // Tenta o próximo slot se este falhar
      }
    }
    throw new Error('PIN ou senha incorreta.');
  }

  const CareerAuth = {
    isAuthenticated: false,
    privateData: null,

    async init() {
      // Verifica se há credencial armazenada
      const savedPass =
        sessionStorage.getItem(SESSION_KEY) ||
        localStorage.getItem(SESSION_KEY);

      if (savedPass && window.CAREER_VAULT) {
        try {
          const data = await decryptVaultWithPass(window.CAREER_VAULT, savedPass);
          this.privateData = data;
          this.isAuthenticated = true;
          this.notifyChange();
          return true;
        } catch (e) {
          this.logout();
        }
      }
      this.notifyChange();
      return false;
    },

    async login(password, rememberMe = false) {
      if (!window.CAREER_VAULT) {
        return { success: false, error: 'Cofre criptografado não foi carregado.' };
      }

      try {
        const cleanPass = (password || '').trim();
        if (!cleanPass) {
          return { success: false, error: 'Por favor, informe seu PIN ou senha.' };
        }

        const data = await decryptVaultWithPass(window.CAREER_VAULT, cleanPass);
        this.privateData = data;
        this.isAuthenticated = true;

        sessionStorage.setItem(SESSION_KEY, cleanPass);
        if (rememberMe) {
          localStorage.setItem(SESSION_KEY, cleanPass);
          localStorage.setItem(REMEMBER_KEY, '1');
        } else {
          localStorage.removeItem(SESSION_KEY);
          localStorage.removeItem(REMEMBER_KEY);
        }

        this.notifyChange();
        return { success: true, data };
      } catch (err) {
        return { success: false, error: err.message || 'PIN ou senha inválidos.' };
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.privateData = null;
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
      this.notifyChange();
    },

    notifyChange() {
      if (document.body) {
        if (this.isAuthenticated) {
          document.body.classList.add('authenticated');
          document.body.classList.remove('not-authenticated');
        } else {
          document.body.classList.remove('authenticated');
          document.body.classList.add('not-authenticated');
        }
      }

      const evt = new CustomEvent('career-auth-change', {
        detail: {
          authenticated: this.isAuthenticated,
          data: this.privateData
        }
      });
      window.dispatchEvent(evt);
    },

    openLoginModal() {
      const modal = document.getElementById('authModal');
      if (modal) {
        modal.classList.add('active');
        const input = document.getElementById('authInput');
        if (input) {
          input.value = '';
          setTimeout(() => input.focus(), 100);
        }
        const err = document.getElementById('authError');
        if (err) err.textContent = '';
      }
    },

    closeLoginModal() {
      const modal = document.getElementById('authModal');
      if (modal) modal.classList.remove('active');
    }
  };

  window.CareerAuth = CareerAuth;

  // Auto inicialização quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CareerAuth.init());
  } else {
    CareerAuth.init();
  }
})();
