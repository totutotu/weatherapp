FROM node:9.6.1

RUN mkdir /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

CMD ["npm", "start"]