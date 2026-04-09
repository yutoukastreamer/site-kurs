# Stage 1: Сборка приложения (build)
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем только package.json сначала (для лучшего кэширования)
COPY package*.json ./
RUN npm ci

# Копируем весь проект и собираем
COPY . .
RUN npm run build

# Stage 2: Запускаем через Nginx (самый правильный способ для production)
FROM nginx:stable-alpine

# Копируем собранный сайт из первой стадии
COPY --from=builder /app/dist /usr/share/nginx/html

# Чтобы страницы /bulldozer и т.д. работали
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
