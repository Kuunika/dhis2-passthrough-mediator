FROM node:16 as building
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:16-alpine
WORKDIR /usr/src/app
COPY --from=building /usr/src/app/package*.json ./
RUN npm install --only=prod
COPY --from=building /usr/src/app ./
CMD ["node", "./dist/index.js"]