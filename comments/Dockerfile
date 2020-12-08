# The multi-stage process is not necessary.
# It is only for practice and reference.

FROM node:10-slim as base
WORKDIR /usr/app
# Change ownership from root to node for this directory down.
RUN chown -R node:node .
COPY package*.json ./
# Change from root to user.
USER node
RUN npm install --only=production && npm cache clean --force
COPY --chown=node:node . .

FROM base as dev 
RUN npm i --only=development
COPY --chown=node:node . .
EXPOSE 3001
CMD ["npm", "start"]