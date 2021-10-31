FROM node:14-alpine3.13

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3001/api

CMD ["npm", "start"]