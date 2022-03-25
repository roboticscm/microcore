FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache

RUN yarn build

EXPOSE 3000

CMD ["build/index.js"]