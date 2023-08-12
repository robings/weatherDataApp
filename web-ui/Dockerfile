FROM node:18-alpine
LABEL Name=webui Version=0.0.1
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./
CMD ["npm", "start"]
