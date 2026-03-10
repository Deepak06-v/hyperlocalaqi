FROM node:20-alpine

WORKDIR /usr/share/nginx/html
COPY frontend /usr/share/nginx/html

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
