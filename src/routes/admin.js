const express = require('express');
const config = require('../config');

const router = express.Router();

// 认证中间件
function requireLogin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  } else {
    res.redirect('/login.html');
  }
}

// 登录API
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === config.ADMIN_USER && password === config.ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    res.redirect('/admin.html');
  } else {
    res.redirect('/login.html?error=1');
  }
});

// 登出API
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/admin.html');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login.html');
  });
});

// 获取配置API
router.get('/config', requireLogin, (req, res) => {
  res.json({
    maxMails: config.MAX_MAILS,
    mailExpireMinutes: config.MAIL_EXPIRE_MINUTES,
    forbiddenPrefixes: config.FORBIDDEN_PREFIXES.join('\n'),
    adminUser: config.ADMIN_USER
  });
});

// 更新配置API
router.post('/config', requireLogin, (req, res) => {
  const { maxMails, mailExpireMinutes, forbiddenPrefixes, adminUser, adminPassword } = req.body;

  const newConfig = {
    MAX_MAILS: parseInt(maxMails, 10),
    MAIL_EXPIRE_MINUTES: parseInt(mailExpireMinutes, 10),
    FORBIDDEN_PREFIXES: forbiddenPrefixes.split(/[\\r\\n]+/).filter(p => p),
    ADMIN_USER: adminUser
  };

  // 只有当提供了新密码时才更新
  if (adminPassword) {
    newConfig.ADMIN_PASSWORD = adminPassword;
  }

  if (config.updateConfig(newConfig)) {
    res.json({ success: true, message: '配置更新成功！' });
  } else {
    res.status(500).json({ success: false, message: '配置更新失败！' });
  }
});

module.exports = router; 