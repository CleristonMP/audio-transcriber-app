# Audio Transcriber Backend

Este é o backend do aplicativo **Audio Transcriber**, que processa arquivos de áudio enviados pelo frontend, converte-os para o formato adequado e utiliza a API do Google Speech-to-Text para transcrever o áudio.

## 🚀 Funcionalidades

- Upload de arquivos de áudio.
- Conversão de arquivos para o formato `wav` com taxa de amostragem de 16 kHz usando `ffmpeg`.
- Integração com a API do Google Speech-to-Text para transcrição de áudio.
- Suporte a múltiplos formatos de áudio, incluindo `webm`, `wav`, `mp3`, entre outros.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no backend.
- **Express.js**: Framework para criação de APIs REST.
- **Multer**: Middleware para upload de arquivos.
- **FFmpeg**: Ferramenta para manipulação de arquivos de áudio e vídeo.
- **Axios**: Cliente HTTP para comunicação com a API do Google.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **file-type**: Detecção do tipo de arquivo.

---

## 📂 Estrutura do Projeto

```plaintext
audio-transcriber-backend/ 
├── src/ 
│   ├── index.ts # Ponto de entrada do servidor 
│   ├── routes/ 
│   │   └── transcriber.ts # Rotas para upload e transcrição 
│   ├── services/ 
│   │   └── transcription.ts # Lógica de transcrição e integração com a API do Google 
├── uploads/ # Pasta para armazenar arquivos enviados 
├── .env # Variáveis de ambiente 
├── package.json # Configuração do projeto e dependências 
└── README.md # Documentação do projeto
```

---

## ⚙️ Configuração e Execução

### 1. Pré-requisitos

- **Node.js** (v16 ou superior)
- **FFmpeg** instalado no sistema
- Conta no Google Cloud com a API Speech-to-Text habilitada

### 2. Instalação

    1. Clone o repositório:
    ```bash
    git clone https://github.com/CleristonMP/audio-transcriber-backend.git
    cd audio-transcriber-backend
    ```

    2. Instale as dependências:

    ```bash
    npm install
    ```

    3. Configure o arquivo `.env`: Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```plaintext
    GOOGLE_APPLICATION_CREDENTIALS=./path/to/your-key.json
    PORT=3000
    ```

    4. Certifique-se de que o arquivo `google-credentials.json` está no caminho especificado.

---

### 3. ▶️ Execução

#### Modo de desenvolvimento:

```bash
npm run dev
```

#### Modo de produção:

```bash
npm run build
npm start
```

---

## 🖥️ Endpoints

### POST `/api/transcriber/upload`

- **Descrição**: Faz o upload de um arquivo de áudio e retorna a transcrição.

- **Parâmetros**:
    - `audio` (form-data): Arquivo de áudio a ser enviado.

- **Resposta**:
```json
{
  "transcription": "Texto transcrito do áudio"
}
```
---

### 🐛 Tratamento de Erros

- `400`: Nenhum arquivo foi enviado.
- `500`: Erro interno no servidor ou falha na transcrição.

---

## 📝 Licença

Este projeto está licenciado sob a MIT License.

---

## 📞 Contato

**Autor**: Cleriston Pereira  
**Github**: [cleriston.melo.pereira@example.com](https://github.com/CleristonMP)
