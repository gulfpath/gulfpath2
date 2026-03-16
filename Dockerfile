# 1. Build Phase
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Ensure the build process can see the API key to bake it into the frontend
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY
RUN npm run build

# 2. Production Execution Phase
FROM node:20-slim
WORKDIR /app

# Copy the compiled frontend from the build stage
COPY --from=build /app/dist ./dist

# Install 'serve', a robust production web server
RUN npm install -g serve

# Cloud Run expects traffic on 8080
EXPOSE 8080

# Serve the 'dist' folder. 
# The '-s' flag ensures React Router works correctly (Single Page App mode)
CMD ["serve", "-s", "dist", "-l", "8080"]
