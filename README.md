# Orto Premium — Consulta de Freteiros

Sistema de consulta de cidades por freteiro da Orto Premium.

---

## Como subir no Railway

### 1. Subir para o GitHub

1. Crie um repositório novo no GitHub (ex: `ortopremium-freteiros`)
2. Faça upload de todos os arquivos desta pasta para o repositório

### 2. Conectar ao Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em **New Project → Deploy from GitHub Repo**
3. Selecione o repositório `ortopremium-freteiros`
4. O Railway detecta automaticamente que é Node.js

### 3. Configurar o start command

No painel do Railway, vá em **Settings → Deploy** e coloque:

```
npm run build && npm run start
```

### 4. Pronto!

O Railway vai gerar um link público (ex: `ortopremium-freteiros.up.railway.app`) que qualquer colaborador abre no navegador ou celular, sem precisar instalar nada.

---

## Estrutura do projeto

```
ortopremium-freteiros/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data.js
    └── index.css
```

## Rodar localmente (opcional)

```bash
npm install
npm run dev
```
