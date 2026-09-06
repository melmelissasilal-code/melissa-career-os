# CURRÍCULOS POR VAGA — DIRETRIZ DE VERSIONAMENTO

Esta pasta armazena as versões sob medida (cirúrgicas) de currículos geradas especificamente para cada vaga ou processo seletivo em que Melissa se candidatar.

---

## 1. Padrão de Nomenclatura Obrigatório
Cada currículo gerado deve seguir o padrão:
`[ANO-MES]_[EMPRESA]_[CARGO].md` e `[ANO-MES]_[EMPRESA]_[CARGO].pdf`

**Exemplos Válidos:**
- `2026-09_GOOGLE_BUSINESS_INTERN.md` / `.pdf`
- `2026-10_M_DIAS_BRANCO_ESTAGIO_GENTE_E_GESTAO.md` / `.pdf`
- `2026-11_ITAU_ESTAGIO_CORPORATIVO_DADOS.md` / `.pdf`

**Nomes Proibidos:**
- ❌ `curriculo_google_novo.pdf`
- ❌ `curriculo_mdias_certo_final.pdf`

---

## 2. Conteúdo de Cada Registro
Cada versão customizada deve conter um cabeçalho com:
1. **Link da Vaga** e Data da Candidatura.
2. **Palavras-Chave Incorporadas** do anúncio para aprovação no ATS (ex: Gupy).
3. **Eixo Base Utilizado** (um dos 7 do Currículo Camaleão).
4. **Resumo das Customizações Realizadas** (quais conquistas foram destacadas ou reordenadas).

---

## 3. Rastreabilidade
Ao enviar o currículo, vincule o nome do arquivo gerado à ficha do processo seletivo em `06_SALA_DE_GUERRA_DAS_VAGAS/PROCESSOS_ATIVOS/` e na tabela `processos_seletivos` do SQLite.
