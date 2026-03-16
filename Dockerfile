# Use Node.js LTS
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Build the Vite frontend
RUN npm run build

# Expose the port Cloud Run expects
EXPOSE 8080

# Start the application 
# Note: Since you have Express, you should have a server file (e.g., server.js)
# If you are just trying to serve the Vite build, use 'preview' with the correct flags:
CMD ["npm", "run", "preview", "--", "--port", "8080", "--host", "0.0.0.0"]
