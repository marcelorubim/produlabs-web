FROM node:22-slim as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=builder /app/build/ /usr/share/nginx/html/
COPY public /usr/share/nginx/html/public
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
