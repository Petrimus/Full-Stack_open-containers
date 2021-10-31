FROM node:14-alpine3.13 AS build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=prod
COPY . .
ENV REACT_APP_BACKEND_URL=http://localhost:3001/api
RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html