const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('./config');
const { getMailsByMailbox, getMailByIdx, deleteMail } = require('./mailstore');
const adminRoutes = require('./routes/admin');

const app = express();

// 修改helmet配置，完全禁用CSP检查，便于开发环境使用
app.use(helmet({
  contentSecurityPolicy: false  // 完全禁用CSP检查，便于开发环境使用
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 用于解析表单数据
app.use(cookieParser());

// Session 中间件
app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // 在生产环境中，如果使用HTTPS，应设为 true
}));

// 静态文件服务
app.use(express.static(path.join(__dirname, '../public')));

// 挂载管理路由
app.use('/admin', adminRoutes);

// 检查邮箱前缀是否被禁用的中间件
function checkForbiddenPrefix(req, res, next) {
  const mailboxAddr = decodeURIComponent(req.params.mailboxAddr);
  const prefix = mailboxAddr.split('@')[0].toLowerCase();
  
  if (config.FORBIDDEN_PREFIXES.includes(prefix)) {
    // 获取当前语言（如果有）
    const lang = req.headers['accept-language']?.includes('en') ? 'en' : 'zh-CN';
    
    // 根据语言返回错误消息
    const errorMessage = lang === 'en' ? 
      'This mailbox prefix is not allowed' : 
      '不允许使用该邮箱前缀';
    
    return res.status(403).json({ 
      error: errorMessage,
      code: 'forbidden_prefix'
    });
  }
  
  next();
}

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 提供配置信息给前端
app.get('/api/config', (req, res) => {
  // 使用配置中的域名
  const domain = config.getDomain();

  res.json({
    domain: domain
  });
});

// 删除某邮箱的指定邮件（邮箱为完整地址）
app.delete('/api/mails/:mailboxAddr/:idx', checkForbiddenPrefix, (req, res) => {
  const mailboxAddr = decodeURIComponent(req.params.mailboxAddr);
  const { idx } = req.params;
  const ok = deleteMail(mailboxAddr, Number(idx));
  res.json({ success: ok });
});

// 获取某邮箱的所有邮件列表（邮箱为完整地址）
app.get('/api/mails/:mailboxAddr', checkForbiddenPrefix, (req, res) => {
  const mailboxAddr = decodeURIComponent(req.params.mailboxAddr);
  const mails = getMailsByMailbox(mailboxAddr);
  res.json({ mails });
});

// 获取某邮箱的指定邮件（邮箱为完整地址）
app.get('/api/mails/:mailboxAddr/:idx', checkForbiddenPrefix, (req, res) => {
  const mailboxAddr = decodeURIComponent(req.params.mailboxAddr);
  const { idx } = req.params;
  const mail = getMailByIdx(mailboxAddr, Number(idx));

  if (mail) {
    res.json({ mail });
  } else {
    res.status(404).json({ error: '邮件不存在或已过期' });
  }
});

module.exports = app;