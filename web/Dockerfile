FROM node:14-alpine

WORKDIR /app

ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
COPY package*.json ./


ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
RUN yarn

ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
COPY . .

ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
RUN yarn build

EXPOSE 3000

CMD ["build/index.js"]