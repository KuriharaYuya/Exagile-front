FROM node

WORKDIR /usr/src/app

RUN npm install -g npm@latest && npm install create-next-app

# docker compose run --rm app bash 