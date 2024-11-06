# AI Chat UI

This is a UI for use with AI chatbots started using create-next-app. This is based on the bare-bones next.js in order to keep complexity to a minimum.

## Implementation Steps

If you do not already have the dependencies necessary to run a Next.js app locally, if you are on a Mac:

### Install Yarn (optional)

Installation instructions at:
https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable

### Install Node (required)

If you are new to Node, it is recommended to use a Node Version Manager instead of installing Node directly. This makes it easier to maintain your Node environment as well as switch between versions for different projects.

Installation instructions at https://github.com/nvm-sh/nvm

### Clone the repository:

```
git clone git@github.com:Federated-GraphRAG/chat-ui.git
```
### Set up environment variables.

If you are going to be using an LLM, you will need to create a .env file at the root and add your API keys. See the file dotenv.example.txt for an easy copy/paste sample of what you will need.

Note that if you just want to test the UI, you do not need an API key.

### Set up the project
Use npm to install the necessary packages.
```
npm install
```

### Run the UI

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

There are mock API responses ready to go for you to test the UI without needing to implement a back-end. Preface your prompt with `mock`.

For example: `mock: What are the influenza trends?`

You can start editing the pages by modifying any page.tsx file, for example `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel. While the package is included in package.json, the font itself is not imported into any file. This will allow you to run and test the project completely offline as you get started.
