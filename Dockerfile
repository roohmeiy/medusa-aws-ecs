# Dockerfile for Medusa Assignment

FROM node:18

WORKDIR /app

# Install system dependencies
#RUN apk add --no-cache python3 make g++
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json .
COPY medusa-config.js .

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Create directories if not exist
RUN mkdir -p src/api src/services src/subscribers data

# Set environment variables with default values
ENV NODE_ENV=development
ENV PORT=9000
# Pass JWT_SECRET and COOKIE_SECRET as build arguments from .env file while running docker container

# Expose port
EXPOSE 9000

# Start Medusa
CMD ["npm", "run", "start"]
