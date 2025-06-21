<div align="center">

# 🌠 MeteorMail

MeteorMail is a self-hosted temporary email service based on Node.js, as brilliant and fleeting as a meteor across the night sky. It provides users with instantly created, disposable email addresses to protect your privacy, avoid spam, and meet various verification code reception needs.

MeteorMail 是一个基于 Node.js 的自托管临时邮箱服务，如同流星划过夜空般短暂绚丽。它为用户提供即时创建、即用即走的临时邮箱，帮助保护您的隐私，避免垃圾邮件，同时满足各类验证码接收需求。

[![简体中文](https://img.shields.io/badge/语言-简体中文-blue.svg)](#简体中文)
[![English](https://img.shields.io/badge/Language-English-red.svg)](#english)
[![GitHub stars](https://img.shields.io/github/stars/lbjlaq/MeteorMail?style=social)](https://github.com/lbjlaq/MeteorMail/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/lbjlaq/MeteorMail?style=social)](https://github.com/lbjlaq/MeteorMail/network/members)
[![GitHub issues](https://img.shields.io/github/issues/lbjlaq/MeteorMail)](https://github.com/lbjlaq/MeteorMail/issues)

</div>

---

# 简体中文

[前往英文文档 (To English Documentation)](#english)

## 更新日志

### 2025-06-21 更新
- **新增管理后台**：添加了带登录保护的管理页面
  - 动态设置邮件保留时效
  - 动态设置每个邮箱保留的邮件数量
  - 设置禁用的邮箱前缀列表（如 `admin`, `root`）
- **安全增强**：禁止使用特定前缀创建邮箱，防止敏感邮箱被滥用
- **多语言支持**：管理界面支持中英文切换
- **深色模式**：管理界面支持深色/浅色主题切换
- **Docker 镜像升级**：支持 ARM64 和 AMD64 多平台架构

## 目录结构
```
MeteorMail/
  src/           # 后端主代码
  public/        # 前端静态文件（HTML+JS+Tailwind）
  logs/          # 日志目录
  .env           # 环境变量配置文件（优先级更高）
  .env.example   # 环境变量示例文件
  config.json    # 基础配置文件
  Dockerfile     # Docker构建文件
  docker-compose.yml # Docker编排文件
  .dockerignore  # Docker忽略文件
  .gitignore     # Git忽略文件
  README.md      # 本文档
```

---

## 环境准备
- Node.js 16+（推荐 LTS 版本）
- 推荐 macOS/Linux 环境
- 需要确保25端口可用，可能需要root权限或特殊配置

---

## 配置说明
### 配置方式
项目支持两种配置方式：
1. **环境变量配置（.env文件）** - 优先级更高
2. **JSON配置（config.json文件）** - 作为默认配置

### 使用 .env 文件配置（推荐）
在项目根目录下创建 `.env` 文件：
```bash
# 复制示例配置文件
cp .env.example .env

# 编辑配置文件
nano .env
```

.env 文件示例：
```
PORT=80
SMTP_PORT=25
SMTP_HOST=0.0.0.0
MAX_MAILS=50
MAIL_EXPIRE_MINUTES=10
ADMIN_USER=admin
ADMIN_PASSWORD=password
FORBIDDEN_PREFIXES=admin,root,support
SESSION_SECRET=a_very_secret_key_that_should_be_changed
```

### 使用 config.json 配置
如果没有 .env 文件，系统将使用项目根目录下的 `config.json` 文件：
```json
{
  "MAX_MAILS": 50,              // 每个邮箱最多保留邮件数
  "MAIL_EXPIRE_MINUTES": 10,    // 邮件保留时长（分钟）
  "PORT": 80,                   // Web服务端口
  "SMTP_PORT": 25,              // SMTP服务端口
  "SMTP_HOST": "0.0.0.0",       // SMTP监听地址
  "ADMIN_USER": "admin",        // 管理员用户名
  "ADMIN_PASSWORD": "password", // 管理员密码
  "FORBIDDEN_PREFIXES": ["admin", "root", "support"], // 禁用的邮箱前缀列表
  "SESSION_SECRET": "a_very_secret_key_that_should_be_changed" // 会话密钥
}
```

> **注意**：如果同时存在 .env 和 config.json 文件，.env 中的配置会覆盖 config.json 中的同名配置。

---

## 安装与启动

### 方法一：直接安装
```bash
# 克隆仓库
git clone https://github.com/lbjlaq/MeteorMail.git
cd MeteorMail

# 安装依赖
npm install

# 启动服务
npm start
```
- 启动后，Web服务监听 `http://localhost:80`
- SMTP服务监听 `SMTP_PORT`（默认为25）

### 方法二：Docker 部署（推荐）
项目提供了完整的 Docker 支持，可以通过多种方式轻松部署：

#### 方式1：使用 docker-compose 部署

```bash
# 克隆仓库
git clone https://github.com/lbjlaq/MeteorMail.git
cd MeteorMail

# 构建镜像并启动服务
docker-compose up -d

# 查看容器状态
docker ps

# 查看日志
docker logs -f meteormail
```

#### 方式2：手动构建镜像并部署

```bash
# 克隆仓库
git clone https://github.com/lbjlaq/MeteorMail.git
cd MeteorMail

# 构建镜像
docker build -t meteormail:latest .

# 运行容器
docker run -d \
  --name meteormail \
  --restart=unless-stopped \
  -p 80:80 \
  -p 25:25 \
  -v $(pwd)/config.json:/app/config.json \
  -v $(pwd)/.env:/app/.env \
  -v $(pwd)/logs:/app/logs \
  -e PORT=80 \
  meteormail:latest
```

#### 方式3：一键运行（无需克隆仓库）

您可以使用以下命令一键部署 MeteorMail：

##### 最简单的一键部署命令

```bash
# 最简单的一键部署（使用默认配置）
docker run -d --name meteormail --restart=unless-stopped -p 80:80 -p 25:25 lbjlaq/meteormail:latest
```

这个命令会使用镜像中的默认配置，适合快速测试或简单使用场景。

##### 带持久化存储和自定义配置的部署命令

如果需要持久化存储和自定义配置，可以使用以下命令：

```bash
# 创建配置目录
mkdir -p ~/meteormail/{config,logs}

# 创建配置文件
cat > ~/meteormail/config/config.json << EOF
{
  "PORT": 80,
  "SMTP_PORT": 25,
  "SMTP_HOST": "0.0.0.0",
  "MAX_MAILS": 50,
  "MAIL_EXPIRE_MINUTES": 10,
  "ADMIN_USER": "admin",
  "ADMIN_PASSWORD": "your_secure_password",
  "FORBIDDEN_PREFIXES": ["admin", "root", "support"],
  "SESSION_SECRET": "your_very_secret_key_here"
}
EOF

# 运行容器
docker run -d \
  --name meteormail \
  --restart=unless-stopped \
  -p 80:80 \
  -p 25:25 \
  -v ~/meteormail/config:/app/config \
  -v ~/meteormail/logs:/app/logs \
  -e PORT=80 \
  lbjlaq/meteormail:latest
```

#### Docker 配置说明
- 默认映射主机的 80 和 25 端口到容器
- 配置文件通过卷挂载方式映射到容器内
- 日志目录持久化存储
- 环境变量 `PORT` 和 `SMTP_PORT` 用于设置服务端口

#### 域名配置

您可以通过多种方式将域名指向您的 MeteorMail 服务：

1. **使用 A 记录**

   直接将域名指向服务器 IP 地址：
   ```
   mail.yourdomain.com.  IN  A  123.456.789.10  # 您的服务器IP
   ```

   使用 A 记录时，系统会自动使用域名作为邮箱地址的后缀。

2. **使用 CNAME 记录**

   将域名指向另一个域名：
   ```
   mail.yourdomain.com.  IN  CNAME  your-server.example.com.
   ```

   使用 CNAME 记录时，系统也会自动使用域名作为邮箱地址的后缀。

#### 使用官方 Docker 镜像

您可以在任何安装了 Docker 的系统上使用以下命令一键运行 MeteorMail：

```bash
docker run -d \
  --name meteormail \
  --restart=unless-stopped \
  -p 80:80 \
  -p 25:25 \
  -e PORT=80 \
  -e ADMIN_USER=admin \
  -e ADMIN_PASSWORD=your_secure_password \
  lbjlaq/meteormail:latest
```

官方镜像已发布在 Docker Hub：[lbjlaq/meteormail](https://hub.docker.com/r/lbjlaq/meteormail)，支持 ARM64 和 AMD64 多平台架构。

#### 修改 Docker 端口
如果需要修改端口，请同时修改以下两个地方：

1. 修改 `.env` 或 `config.json` 中的端口配置
2. 修改 `docker-compose.yml` 中的端口映射，或者修改 `docker run` 命令中的端口映射

例如，将 Web 端口改为 3000，SMTP 端口改为 2525：

```yaml
# docker-compose.yml
ports:
  - "3000:3000"  # 主机端口:容器端口
  - "2525:2525"
```

Or using the `docker run` command:

```bash
docker run -d \
  --name meteormail \
  --restart=unless-stopped \
  -p 3000:3000 \
  -p 25:25 \
  -e PORT=3000 \
  -e SMTP_PORT=25 \
  lbjlaq/meteormail:latest
```

Meanwhile in `.env`:
```
PORT=3000
SMTP_PORT=25
```

Restart the container after modifications:
```bash
# If using docker-compose
docker-compose down
docker-compose up -d

# If using docker run
docker stop meteormail
docker rm meteormail
# Then re-run the docker run command above
```

---

## 前端访问
浏览器访问：
```
http://localhost
```
或者使用您在配置文件中设置的端口（默认为80）：
```
http://localhost:80
```
- 页面自动分配临时邮箱ID，可实时接收邮件
- 支持刷新ID、自定义ID、复制邮箱地址、手动删除邮件
- 访问 `/about.html` 查看项目介绍和技术架构

## 管理后台使用说明

### 访问管理后台
浏览器访问：
```
http://localhost/login.html
```

使用您在配置文件中设置的管理员用户名和密码登录（默认为 admin/password）。

### 管理后台功能

登录后，您可以：

1. **系统设置**
   - 调整邮件保留时间（分钟）
   - 设置每个邮箱最大保留邮件数量

2. **安全设置**
   - 管理禁用的邮箱前缀列表
   - 每行输入一个前缀，如 `admin`、`root`、`support` 等

3. **界面设置**
   - 切换语言（中文/英文）
   - 切换主题（深色/浅色模式）

### 安全建议

1. **修改默认凭据**：务必修改默认的管理员用户名和密码
2. **设置强会话密钥**：修改 `SESSION_SECRET` 为一个复杂的随机字符串
3. **禁用敏感前缀**：添加可能被滥用的邮箱前缀到禁用列表中

---

## 邮件测试方法

### 使用 SMTP 服务测试

您可以使用任何支持 SMTP 协议的客户端或工具发送邮件到您的临时邮箱。以下是一些测试方法：

### 1. 使用命令行工具 swaks 发送测试邮件
```bash
swaks --to <邮箱ID>@localhost --server 127.0.0.1:25 --from test@demo.com --header "Subject: 测试邮件" --body "你好，这是一封测试邮件"
```

### 2. 使用 telnet 手动测试 SMTP 协议
```bash
telnet localhost 25
```
依次输入：
```
HELO localhost
MAIL FROM:<test@demo.com>
RCPT TO:<邮箱ID@localhost>
DATA
Subject: 测试邮件

你好，这是一封测试邮件
.
QUIT
```

### 3. 使用邮件客户端

您也可以配置邮件客户端（如 Thunderbird、Outlook 等）发送邮件：
- SMTP 服务器：localhost 或您的服务器IP
- 端口：25
- 不需要身份验证
- 收件人：<邮箱ID>@localhost 或 <邮箱ID>@您的域名

---

## API 接口文档

访问 `/api.html` 可查看详细的API文档和使用示例。

### 获取邮箱邮件列表
```
GET /api/mails/:mailboxAddr
```
- `mailboxAddr` 为完整邮箱地址（如 `zdugawlb@localhost`），需URL编码。例如：
  - `GET /api/mails/zdugawlb%40localhost`
- 返回：
```json
{
  "mails": [
    {
      "to": "zdugawlb@localhost",
      "from": "test@demo.com",
      "subject": "测试邮件",
      "text": "你好，这是一封测试邮件",
      "html": "",
      "date": "2025-04-15T12:02:26.000Z",
      "attachments": [],
      "raw": "..."
    }
  ]
}
```

### 获取指定邮件
```
GET /api/mails/:mailboxAddr/:idx
```
- `mailboxAddr` 为完整邮箱地址（如 `zdugawlb@localhost`），需URL编码
- `idx` 为邮件在列表中的索引（从0开始）
- 例如：`GET /api/mails/zdugawlb%40localhost/0`
- 成功返回：
```json
{
  "mail": {
    "to": "zdugawlb@localhost",
    "from": "test@demo.com",
    "subject": "测试邮件",
    "text": "你好，这是一封测试邮件",
    "html": "",
    "date": "2025-04-15T12:02:26.000Z",
    "attachments": [],
    "raw": "..."
  }
}
```
- 邮件不存在或已过期返回404：
```json
{
  "error": "邮件不存在或已过期"
}
```

### 删除指定邮件
```
DELETE /api/mails/:mailboxAddr/:idx
```
- `mailboxAddr` 为完整邮箱地址（如 `zdugawlb@localhost`），需URL编码。例如：
  - `DELETE /api/mails/zdugawlb%40localhost/0`
- `idx` 为邮件在列表中的索引（从0开始）
- 返回：
```json
{ "success": true }
```

---

## 邮件自动过期
- 每封邮件只保留 `MAIL_EXPIRE_MINUTES` 分钟，超时自动删除
- 只保留最近 `MAX_MAILS` 封邮件

---

## 常见问题及解决方案

### 无法访问前端页面
- **问题**: 浏览器显示"无法访问此网站"，显示"ERR_CONNECTION_REFUSED"错误
- **解决方案**:
  1. 确保服务已启动，检查端口是否被占用 `netstat -an | grep LISTEN | grep 80`
  2. 修改 Helmet 安全策略，放宽 CSP 限制，允许外部资源加载
  3. 确保前端资源路径正确，替换为绝对路径 `/socket.io.min.js` 而非 `socket.io.min.js`

### Docker 容器无法访问
- **问题**: Docker 容器启动成功，但无法通过浏览器访问
- **解决方案**:
  1. 确认端口映射是否正确 `docker ps` 查看端口映射情况
  2. 检查容器日志 `docker logs meteormail` 确认服务是否正常启动
  3. 尝试使用 `curl` 命令测试连接 `curl -I http://localhost`
  4. 确保端口配置正确，例如 `-e PORT=80`

### Docker 镜像构建失败
- **问题**: 构建 Docker 镜像时出现错误
- **解决方案**:
  1. 确保 Dockerfile 文件存在且内容正确
  2. 检查 .dockerignore 文件，确保不会包含不必要的文件
  3. 尝试清理 Docker 缓存 `docker builder prune`
  4. 查看详细构建日志 `docker build --no-cache -t meteormail .`

### 25端口权限问题
- **问题**: 使用 25 端口时需要 root 权限
- **解决方案**:
  1. 使用 sudo 运行应用 `sudo npm start`
  2. 或使用 authbind 允许非 root 用户绑定特权端口 `authbind --deep npm start`
  3. 在 Linux 系统上，可以使用 `setcap` 命令授予 Node.js 绑定特权端口的能力
  4. 使用 Docker 时确保正确映射端口 `-p 25:25`

### 依赖包版本不兼容
- **问题**: npm install 报错，某些包版本不存在或不兼容
- **解决方案**:
  1. 修改 package.json 文件，调整包版本到可用版本
  2. mailparser 使用 `^3.7.2` 而非 `^3.10.0`
  3. nanoid 使用 `^4.0.1` 而非 `^4.0.2`
  4. 使用 Docker 部署可以避免这个问题

### Socket.IO 连接问题
- **问题**: 前端无法通过 WebSocket 实时接收邮件
- **解决方案**:
  1. 确保 socket.io.min.js 文件存在于 public 目录
  2. 放宽 CSP 安全策略，允许 WebSocket 连接 `connectSrc: ["'self'", "wss:", "ws:", "https:", "http:"]`
  3. 检查浏览器控制台是否有连接错误
  4. 使用 Docker 时确保端口映射正确

### 邮件不显示在前端界面
- **问题**: 邮件发送成功但前端界面不显示
- **解决方案**:
  1. 使用 API 检查邮件是否已保存 `curl http://localhost/api/mails/<邮箱ID>%40localhost`
  2. 检查服务器日志，确认邮件是否成功保存 `邮件已保存: 测试邮件`
  3. 刷新前端页面，重新建立 WebSocket 连接

### Docker 数据持久化问题
- **问题**: Docker 容器重启后数据丢失
- **解决方案**:
  1. 确保正确挂载了卷 `-v $(pwd)/logs:/app/logs -v $(pwd)/config:/app/config`
  2. 检查挂载目录的权限是否正确
  3. 使用 Docker 数据卷而不是绑定挂载 `docker volume create meteormail-data`

---

## 生产环境建议
- 生产环境可将 `SMTP_PORT` 设为25，需root权限并关闭系统自带SMTP服务
- 建议加防火墙限制，防止被滥用
- 部署到公网时启用 HTTPS，确保邮件安全
- 对外开放时建议设置仅允许指定域名访问，防止滥用

---

## 项目结构说明
- **src/server.js**: 主入口文件，启动HTTP服务和SMTP服务
- **src/app.js**: Express应用，提供Web服务和API接口
- **src/config.js**: 配置加载模块，处理.env和config.json配置
- **src/smtp.js**: SMTP服务器，接收和处理邮件
- **src/mailstore.js**: 邮件存储管理，负责邮件的保存、获取和删除
- **src/mailbox.js**: 邮箱ID管理，处理临时邮箱的创建和映射
- **public/**: 前端静态文件，包含HTML、JavaScript和样式
  - **public/index.html**: 主页面，提供临时邮箱功能
  - **public/about.html**: 关于页面，展示项目介绍和技术架构
  - **public/api.html**: API文档页面，详细说明API使用方法（访问路径：/api.html）
  - **public/diagnostic.html**: 系统诊断工具，用于开发和调试

---

## Contact and Contribution
- If you have any issues or suggestions, please open an issue on [GitHub Issues](https://github.com/lbjlaq/MeteorMail/issues)
- Contributions are welcome via pull requests
- Official WeChat Public Account: Ctrler

## 联系和贡献
- 如有问题或建议，请在 [GitHub Issues](https://github.com/lbjlaq/MeteorMail/issues) 上提交
- 欢迎通过 pull requests 贡献代码
- 官方微信公众号：Ctrler

## Acknowledgements | 鸣谢
- [denghongcai/forsaken-mail](https://github.com/denghongcai/forsaken-mail) - 感谢forsaken-mail项目的启发 | Thanks to the forsaken-mail project for inspiration

如有问题请提交 issue 或联系开发者。

---

# English

## Directory Structure
```
MeteorMail/
  src/           # Backend core code
  public/        # Frontend static files (HTML+JS+Tailwind)
  logs/          # Log directory
  .env           # Environment variables config file (higher priority)
  .env.example   # Example environment variables file
  config.json    # Base configuration file
  Dockerfile     # Docker build file
  docker-compose.yml # Docker compose file
  .dockerignore  # Docker ignore file
  .gitignore     # Git ignore file
  README.md      # This document
```

---

## Environment Preparation
- Node.js 16+ (LTS version recommended)
- macOS/Linux environment recommended
- Port 25 must be available, may require root privileges or special configuration

---

## Configuration Guide
### Configuration Methods
The project supports two configuration methods:
1. **Environment Variables (.env file)** - Higher priority
2. **JSON Configuration (config.json file)** - As default configuration

### Using .env File Configuration (Recommended)
Create a `.env` file in the project root directory:
```bash
# Copy the example configuration file
cp .env.example .env

# Edit the configuration file
nano .env
```

.env file example:
```
PORT=80
SMTP_PORT=25
SMTP_HOST=0.0.0.0
MAX_MAILS=50
MAIL_EXPIRE_MINUTES=10
ADMIN_USER=admin
ADMIN_PASSWORD=password
FORBIDDEN_PREFIXES=admin,root,support
SESSION_SECRET=a_very_secret_key_that_should_be_changed
```

### Using config.json Configuration
If there is no .env file, the system will use the `config.json` file in the project root directory:
```json
{
  "MAX_MAILS": 50,              // Maximum number of emails per mailbox
  "MAIL_EXPIRE_MINUTES": 10,    // Email retention time (minutes)
  "PORT": 80,                   // Web service port
  "SMTP_PORT": 25,              // SMTP service port
  "SMTP_HOST": "0.0.0.0",       // SMTP listening address
  "ADMIN_USER": "admin",        // Admin username
  "ADMIN_PASSWORD": "password", // Admin password
  "FORBIDDEN_PREFIXES": ["admin", "root", "support"], // List of forbidden email prefixes
  "SESSION_SECRET": "a_very_secret_key_that_should_be_changed" // Session secret
}
```

> **Note**: If both .env and config.json files exist, configurations in .env will override those with the same name in config.json.

## Update Log

### June 21, 2025 Update
- **Added Admin Dashboard**: Added a login-protected admin page
  - Dynamically set email retention time
  - Dynamically set the number of emails retained per mailbox
  - Configure a list of forbidden mailbox prefixes (e.g., `admin`, `root`)
- **Security Enhancement**: Prevent the creation of mailboxes with specific prefixes to prevent abuse
- **Multilingual Support**: Admin interface supports Chinese/English switching
- **Dark Mode**: Admin interface supports dark/light theme switching
- **Docker Image Upgrade**: Support for ARM64 and AMD64 multi-platform architectures

## Frontend Access
Access via browser:
```
http://localhost
```
Or use the port you set in the configuration file (default is 80):
```
http://localhost:80
```
- The page automatically assigns a temporary mailbox ID, can receive emails in real-time
- Supports refreshing ID, custom ID, copying email address, manual email deletion
- Visit `/about.html` to view project introduction and technical architecture

## Admin Dashboard Guide

### Accessing the Admin Dashboard
Access via browser:
```
http://localhost/login.html
```

Log in using the admin username and password set in your configuration file (default is admin/password).

### Admin Dashboard Features

After logging in, you can:

1. **System Settings**
   - Adjust email retention time (minutes)
   - Set the maximum number of emails kept per mailbox

2. **Security Settings**
   - Manage the list of forbidden mailbox prefixes
   - Enter one prefix per line, such as `admin`, `root`, `support`, etc.

3. **Interface Settings**
   - Switch language (Chinese/English)
   - Switch theme (Dark/Light mode)

### Security Recommendations

1. **Change Default Credentials**: Be sure to change the default admin username and password
2. **Set a Strong Session Key**: Modify `SESSION_SECRET` to a complex random string
3. **Disable Sensitive Prefixes**: Add potentially abusable mailbox prefixes to the forbidden list

## Acknowledgements | 鸣谢
- [denghongcai/forsaken-mail](https://github.com/denghongcai/forsaken-mail) - Thanks to the forsaken-mail project for inspiration

If you have any questions, please submit an issue or contact the developer.