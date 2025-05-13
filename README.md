# 🎧 Audio Transcriber

Aplicativo completo para transcrição de áudio em tempo real, desenvolvido como projeto de aprendizado, com versões mobile (React Native com Expo) e web (Next.js com TypeScript). O app permite que usuários gravem ou façam upload de áudios e obtenham a transcrição automática, com funcionalidades de compartilhamento e cópia rápida do texto.

## 📱 Plataformas

* **Mobile:** React Native (Expo)
* **Web:** Next.js com TypeScript e Tailwind CSS
* **Backend:** Node.js com integração à API Google Speech-to-Text V1

---

## 🚀 Funcionalidades

✅ Gravação de áudio diretamente no app
✅ Upload de arquivos de áudio locais
✅ Transcrição automática via Google Speech-to-Text V1
✅ Compartilhamento da transcrição (mobile)
✅ Botão para copiar o texto (web)
✅ Histórico local de transcrições
✅ Interface limpa, responsiva e intuitiva

---

## 🧪 Tecnologias Utilizadas

### Mobile

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [expo-av](https://docs.expo.dev/versions/latest/sdk/av/)
* [expo-file-system](https://docs.expo.dev/versions/latest/sdk/filesystem/)
* [@react-navigation/native](https://reactnavigation.org/)
* [React Native Share](https://reactnative.dev/docs/share)

### Web

* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)

### Backend

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Google Cloud Speech-to-Text V1](https://cloud.google.com/speech-to-text)

---

## ⚙️ Como Funciona

1. O usuário envia um arquivo de áudio ou grava um.
2. O backend converte e envia o áudio para a API Google Speech-to-Text.
3. A resposta da API com o texto transcrito é enviada ao frontend.
4. O usuário pode visualizar, editar, copiar ou compartilhar o conteúdo.

---

## 📦 Instalação e Execução Local

> ⚠️ Este projeto é dividido em três partes: `mobile/`, `web/` e `backend/`.

### Pré-requisitos

* Node.js instalado
* Conta no Google Cloud com a API Speech-to-Text ativada
* Chave de API configurada como variável de ambiente

### 1. Clonar o Repositório

```bash
git clone https://github.com/SeuUsuario/audio-transcriber.git
cd audio-transcriber
```

### 2. Instalar Dependências

#### Backend

```bash
cd transcriber-backend
npm install
npm run dev
```

#### Web

```bash
cd ../transcriber-web
npm install
npm run dev
```

#### Mobile

```bash
cd ../transcriber-mobile
npm install
npx expo start
```

---

## 🔐 Observações de Segurança

* A chave da API Google Speech-to-Text **nunca** deve ser exposta no frontend. No app, ela é utilizada apenas no backend, garantindo segurança na comunicação.

---

## 📌 Decisões Técnicas

* **Exportação de arquivos (PDF, DOCX, TXT)**: **não incluída** propositalmente. Em vez disso:

  * Mobile: recurso de **compartilhamento** do texto transcrito via `Share`.
  * Web: **botão para copiar** texto transcrito para área de transferência.

* **Foco:** Manter o app leve, simples e funcional, com interface objetiva e centrada no fluxo de transcrição.

---

## 📚 Aprendizados

Este projeto foi criado com o objetivo de consolidar conhecimentos em:

* Integração de serviços de terceiros (Google APIs)
* Processamento e manipulação de arquivos de áudio
* Comunicação entre múltiplas plataformas (mobile, web, backend)
* Boas práticas com TypeScript, React, Express e APIs RESTful

---

## 📷 Imagens do App

> (Sugestão: adicionar screenshots do app mobile e web aqui para melhorar a apresentação.)

---

## 🧑‍💻 Autor

**Cleriston Pereira**
[Portfólio](https://cleristonmp.github.io/portfolio) • [GitHub](https://github.com/CleristonMP)

