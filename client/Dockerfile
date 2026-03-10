# Dùng Node 22 vì Vite 7 yêu cầu >=20.19
FROM node:22-alpine

# thư mục làm việc
WORKDIR /app

# copy package trước để cache
COPY package*.json ./

# cài dependencies
RUN npm install

# copy toàn bộ source
COPY . .

# build project
RUN npm run build

# cài serve để chạy build
RUN npm install -g serve

# port vite serve
EXPOSE 5173

# chạy frontend
CMD ["serve", "-s", "dist", "-l", "5173"]