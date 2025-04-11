# Stage 1: build stage
FROM node:22-alpine as build-stage
WORKDIR /app
ENV NODE_OPTIONS=--max_old_space_size=8192

# Copie le bon lockfile
COPY package.json package-lock.json ./

# Utilisation de npm, pas pnpm !
RUN npm ci

COPY . ./
RUN npm run build
RUN echo "✅ build successful 🎉"

# Stage 2: production
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
RUN echo "✅ deploy to nginx successful 🎉"
