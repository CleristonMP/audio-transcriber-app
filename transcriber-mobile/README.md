# **Audio Transcriber App**

Um aplicativo móvel para transcrição de áudio, permitindo que os usuários gravem, façam upload de arquivos de áudio, editem e gerenciem transcrições salvas.

---

## **Índice**
- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## **Visão Geral**

O **Audio Transcriber App** é um aplicativo móvel que permite aos usuários:
- Fazer upload de arquivos de áudio para transcrição.
- Gravar áudios diretamente no aplicativo.
- Visualizar, editar e excluir transcrições salvas.
- Exportar o texto das transcrições para outros aplicativos.

O aplicativo é construído com **React Native** e utiliza o **AsyncStorage** para persistência local de dados.

---

## **Funcionalidades**

- **Upload de Áudio**: Faça upload de arquivos de áudio salvos no dispositivo.
- **Gravação de Áudio**: Grave áudios diretamente no aplicativo para transcrição.
- **Gerenciamento de Transcrições**:
  - Visualize transcrições salvas.
  - Edite e exclua transcrições individualmente.
  - Exclua todas as transcrições de uma vez.
- **Exportação**: Compartilhe o texto das transcrições com outros aplicativos.
- **Ajuda ao Usuário**: Botões de ajuda em cada tela para orientar o uso do aplicativo.

---

## **Pré-requisitos**

Certifique-se de que você tem as seguintes ferramentas instaladas no seu ambiente de desenvolvimento:

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- **React Native CLI** (para projetos React Native CLI)
- **Expo CLI** (para projetos gerenciados pelo Expo)
- **Android Studio** (para emular ou compilar no Android)
- **Xcode** (para emular ou compilar no iOS, apenas em macOS)

---

## **Instalação**

1. Clone este repositório:
   ```bash
   git clone https://github.com/CleristonMP/audio-transcriber-app.git
   cd audio-transcriber-app/transcriber-mobile
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o aplicativo:
   - Para projetos Expo:
     ```bash
     npx expo start
     ```
   - Para projetos React Native CLI:
     ```bash
     react-native run-android
     react-native run-ios
     ```

---

## **Uso**
1. Tela Inicial:
   - Faça upload de áudios ou grave para transcrição.
   - Acesse transcrições salvas.

2. Tela de Transcrições Salvas:
   - Visualize, edite ou exclua transcrições.
   - Exclua todas as transcrições de uma vez.

3. Tela de Edição de Transcrição:
   - Edite o texto da transcrição.
   - Salve ou exporte a transcrição.

---

## **Estrutura do Projeto**

```
transcriber-mobile/
├── assets/                 # Arquivos estáticos (imagens, textos de ajuda, etc.)
├── components/             # Componentes reutilizáveis (DrawerButton, HelpButton, etc.)
├── screens/                # Telas do aplicativo (HomeScreen, SavedTranscriptionsScreen, etc.)
├── utils/                  # Funções utilitárias (exportText, storageUtils, etc.)
├── App.tsx                 # Arquivo principal do aplicativo
├── package.json            # Configuração do projeto e dependências
└── README.md               # Documentação do projeto
```

---

## **Tecnologias Utilizadas**

- **React Native**: Framework principal para desenvolvimento do aplicativo.
- **TypeScript**: Tipagem estática para maior segurança e clareza no código.
- **AsyncStorage**: Persistência local de dados.
- **Expo**: Gerenciamento simplificado do projeto (se aplicável).
- **React Navigation**: Navegação entre telas.
- **FontAwesome**: Ícones para botões e elementos visuais.

---

## **Contribuição**

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua funcionalidade ou correção:
   ```bash
   git checkout -b minha-branch
   ```
3. Faça as alterações e commit:
   ```bash
   git commit -m "Descrição das alterações"
   ```
4. Envie as alterações:
   ```bash
   git push origin minha-branch
   ```
5. Abra um Pull Request.

---

## **Licença**

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.
