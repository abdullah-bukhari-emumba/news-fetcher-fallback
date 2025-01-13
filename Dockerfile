FROM node:16 as build
WORKDIR /app
COPY package.json ./
COPY .env .env
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]