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
ENV JWT_SECRET=40c752ae0101bbd07e85d93e51c8635ad799e6a46fa76ef2c7e0e0b0bd78d750
ENV COOKIE_SECRET=91dec941486132d9c7b2420a9191dc8fff70798c768ff5a079c3f0e3de2d7ff5

# Expose port
EXPOSE 9000

# Start Medusa
CMD ["npm", "run", "start"]