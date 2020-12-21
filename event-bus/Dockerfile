FROM node:14-slim as base
WORKDIR /usr/app
RUN chown -R node:node .
COPY package*.json ./
USER node 
RUN npm install --only=production && npm cache clean --force
COPY --chown=node:node . .

FROM base as dev
RUN npm install --only=development
COPY --chown=node:node . .
EXPOSE 4005
CMD ["npm", "start"]