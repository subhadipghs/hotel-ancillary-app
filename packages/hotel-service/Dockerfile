FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app/hotel-svc

COPY ["package.json", "yarn.lock*", "./"]

COPY . .

RUN yarn install --production=true

CMD ["yarn", "start"]
