#!/bin/bash

# Create necessary directories
mkdir -p src/app/api/graphrag
mkdir -p src/app/dashboard
mkdir -p src/components
mkdir -p src/lib
mkdir -p src/store/slices
mkdir -p src/types

# Create new files
touch src/app/api/graphrag/route.ts
touch src/app/dashboard/page.tsx
touch src/components/GraphVisualization.tsx
touch src/components/QueryInterface.tsx
touch src/components/ResultsDisplay.tsx
touch src/lib/neo4j.ts
touch src/lib/openai.ts
touch src/lib/utils.ts
touch src/store/index.ts
touch src/store/slices/graphSlice.ts
touch src/types/index.ts

# Modify next.config.mjs
echo "/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    INSTANCE_TYPE: process.env.INSTANCE_TYPE || 'CDC',
  },
};

export default nextConfig;" > next.config.mjs

# Create Dockerfile
echo "FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [\"npm\", \"start\"]" > Dockerfile

# Create .dockerignore
echo "node_modules
.next
.git" > .dockerignore

echo "Setup complete. New files and directories have been created."
