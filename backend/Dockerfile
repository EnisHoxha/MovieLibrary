FROM node:19.1.0-bullseye
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN chown node:node ./
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5002
USER node
CMD ["dumb-init","npm","start"]