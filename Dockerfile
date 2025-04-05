# Dockerfile for Medusa Assignment

FROM node:18-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json .
COPY medusa-config.js .

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Create directories if not exist
RUN mkdir -p src/api src/services src/subscribers data

# Set environment variables with default values
ENV NODE_ENV=development
ENV PORT=9000
ENV JWT_SECRET=demo-jwt-secret
ENV COOKIE_SECRET=demo-cookie-secret

# Expose port
EXPOSE 9000

# Start Medusa
CMD ["npm", "run", "start"]