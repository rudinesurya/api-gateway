FROM node:18
RUN mkdir -p /var/www/api-gateway
WORKDIR /var/www/api-gateway
ADD . /var/www/api-gateway
RUN npm install
CMD npm run build && npm run start:prod