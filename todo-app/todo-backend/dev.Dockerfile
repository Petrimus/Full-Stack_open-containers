FROM node:16
WORKDIR /usr/src/app
RUN chown node:node /usr/src/app
USER node
COPY --chown=node:node . .
RUN npm ci
ENV DEBUG=playground:*

CMD npm run dev