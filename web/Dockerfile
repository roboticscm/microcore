FROM node:14-alpine

WORKDIR /app

ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
COPY package*.json ./

ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
RUN yarn

ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
COPY . .
COPY svelte.config.js ./
COPY jsconfig.json ./
COPY src ./src
COPY static ./static


ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
RUN yarn build

EXPOSE 3000

CMD ["build/index.js"]