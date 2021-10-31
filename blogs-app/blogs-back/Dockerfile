FROM node:14-alpine3.13
WORKDIR /usr/src/app
RUN chown node:node /usr/src/app
USER node
COPY --chown=node:node . .
RUN npm ci
ENV DEBUG=playground:*

CMD npm start