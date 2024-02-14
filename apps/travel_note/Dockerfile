FROM node:20.10.0-alpine AS runtime
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4322
EXPOSE 4322
CMD node ./dist/server/entry.mjs