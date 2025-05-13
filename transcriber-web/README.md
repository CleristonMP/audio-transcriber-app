# Audio Transcriber App

Bem-vindo ao **Audio Transcriber App**, um aplicativo web desenvolvido com **Next.js** que permite aos usuários fazer upload ou gravar áudios e transcrevê-los automaticamente. Este projeto foi criado para facilitar a transcrição de áudios de forma rápida e eficiente.

## 🚀 Funcionalidades

- **Upload de Áudio:** Faça upload de arquivos de áudio para transcrição.
- **Gravação de Áudio:** Grave áudio diretamente no navegador.
- **Editor de Texto:** Edite e formate as transcrições com ferramentas de formatação.
- **Salvar Transcrições:** Salve transcrições localmente no navegador.
- **Gerenciamento de Transcrições:** Visualize, edite e exclua transcrições salvas.
- **Ajuda ao Usuário:** Modal de ajuda com instruções detalhadas para novos usuários.

## 🛠️ Tecnologias Utilizadas

- **Next.js:** Framework React para desenvolvimento web.
- **React:** Biblioteca para construção de interfaces de usuário.
- **Draft.js:** Editor de texto rico para edição de transcrições.
- **Tailwind CSS:** Framework CSS para estilização.
- **Font Awesome:** Ícones para melhorar a interface do usuário.

## 📦 Estrutura do Projeto

```plaintext
audio-transcriber-app/
├── public/                # Arquivos estáticos
├── src/
│   ├── app/               # Páginas do Next.js
│   │   ├── page.tsx       # Página inicial
│   │   ├── transcription/ # Página de edição de transcrições
│   │   └── saved-transcriptions/ # Página de transcrições salvas
│   ├── components/        # Componentes reutilizáveis
│   ├── services/          # Serviços para lógica de negócios
│   ├── utils/             # Funções utilitárias
│   ├── data/              # Dados estáticos (ex.: instruções)
│   └── config/            # Configurações (ex.: Font Awesome)
├── README.md              # Documentação do projeto
└── package.json           # Dependências e scripts do projeto
```

## 🖥️ Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- Gerenciador de pacotes: `npm`, `yarn`, `pnpm` ou `bun`

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/audio-transcriber-app.git
   cd audio-transcriber-app/transcriber-web/
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Abra o navegador e acesse:
   ```
   http://localhost:3000
   ```

## 🧪 Testes

Este projeto ainda não possui testes automatizados. No entanto, recomenda-se o uso de **Jest** e **React Testing Library** para testes unitários e de integração.

## 📂 Funcionalidades Principais

### Página Inicial
- Faça upload ou grave áudios para transcrição.
- Acesse transcrições salvas.

### Página de Transcrição
- Edite e formate suas transcrições.
- Salve ou copie o texto para a área de transferência.

### Página de Transcrições Salvas
- Visualize todas as transcrições salvas.
- Edite ou exclua transcrições específicas.
- Exclua todas as transcrições com confirmação.

## 🌐 Deploy

Este projeto pode ser facilmente implantado na plataforma [Vercel](https://vercel.com/). Para fazer o deploy:

1. Faça login na Vercel.
2. Clique em **New Project** e importe o repositório.
3. Configure as variáveis de ambiente, se necessário.
4. Clique em **Deploy**.

## 📖 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

---

### **Contato**

Se tiver dúvidas ou sugestões, entre em contato:

- **Autor:** Cleriston
- **Email:** seu-email@example.com
- **GitHub:** [seu-usuario](https://github.com/seu-usuario)

---
**Divirta-se transcrevendo! 🎉**
