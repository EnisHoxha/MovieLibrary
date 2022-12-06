#build for dev environment
FROM node:19.1.0-bullseye
WORKDIR /usr/src/app
RUN chown node:node ./
COPY package*.json ./
RUN npm ci
COPY --chown=node:node . .
EXPOSE 5173
USER node
CMD ["npm","run","dev"]