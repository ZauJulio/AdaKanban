FROM node:18.12-alpine3.16

WORKDIR /app

COPY package.json yarn.lock ./
COPY . .

RUN yarn build

EXPOSE 3080

CMD ["npm", "run", "dev"]