# Stage 1: build stage
FROM node:20-alpine as build-stage

WORKDIR /app

ENV NODE_OPTIONS=--max_old_space_size=8192

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./

# Installation des dépendances avec npm
RUN npm ci

# Copie du reste des fichiers
COPY . .

# Build du projet
RUN npm run build
RUN echo "✅ Build success 🎉"

# Stage 2: production avec nginx
FROM nginx:alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
