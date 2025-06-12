FROM node:22-alpine AS build-stage
WORKDIR /app
ENV NODE_OPTIONS=--max_old_space_size=8192

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . ./
RUN npm run build
RUN echo "✅ build successful 🎉"

FROM nginx:latest AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

