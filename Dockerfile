FROM node:16-alpine

WORKDIR /app

# 先复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制其余项目文件
COPY . .

# 创建日志目录
RUN mkdir -p logs

# 暴露端口
EXPOSE 80 25

# 启动服务
CMD ["node", "src/server.js"]