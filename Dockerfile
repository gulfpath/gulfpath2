# 1. Build Phase
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Execution Phase
FROM node:20-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
# Only install production dependencies to keep it light
RUN npm install --omit=dev

# Vite preview needs the vite package to run
RUN npm install vite

# Cloud Run injects the PORT env var, Vite preview must listen on 0.0.0.0
EXPOSE 8080
CMD ["npx", "vite", "preview", "--port", "8080", "--host", "0.0.0.0"]
