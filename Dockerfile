FROM node:18
WORKDIR /app
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
COPY package.json .
COPY medusa-config.js .
RUN npm install --legacy-peer-deps
COPY . .
RUN mkdir -p src/api src/services src/subscribers data
ENV NODE_ENV=development
ENV PORT=9000
# Pass JWT_SECRET and COOKIE_SECRET as build arguments from .env file while running docker container (if manually deploy not while using github actions)
EXPOSE 9000
CMD ["npm", "run", "start"]
