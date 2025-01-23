FROM node:20-alpine
ENV NODE_ENV=prod 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx tsc -p ./tsconfig.build.json
EXPOSE 3000
CMD ["node", "./dist/api/server.js"]