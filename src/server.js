const config = require('./config');
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const mailbox = require('./mailbox');
const smtpServer = require('./smtp');

const PORT = config.PORT || 3000;
const SMTP_PORT = config.SMTP_PORT || 25;
const SMTP_HOST = config.SMTP_HOST || '0.0.0.0';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// 预留socket.io事件处理
io.on('connection', (socket) => {
  console.log('新客户端连接:', socket.id);

  // 请求分配邮箱ID
  socket.on('request mailbox', () => {
    const id = mailbox.createMailbox(socket);
    socket.mailboxId = id;
    socket.emit('mailbox', id);
  });

  // 设置自定义邮箱ID
  socket.on('set mailbox', (id) => {
    const success = mailbox.setMailbox(id, socket);
    if (success) {
      socket.mailboxId = id;
      // 注意：mailbox.setMailbox 已经发送了 mailbox 事件，这里不需要重复发送
    }
    // 如果失败，mailbox.setMailbox 已经发送了错误消息
  });

  // 断开连接时注销邮箱
  socket.on('disconnect', () => {
    if (socket.mailboxId) {
      mailbox.removeMailbox(socket.mailboxId);
    }
    console.log('客户端断开:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`服务已启动，端口: ${PORT}`);
});

// 启动SMTP服务
smtpServer.listen(SMTP_PORT, SMTP_HOST, () => {
  console.log(`SMTP服务已启动，端口: ${SMTP_PORT}, 地址: ${SMTP_HOST}`);
});