/**
 * 统一配置加载模块
 * 优先从 .env 文件加载配置，如果不存在或某些配置项不存在，则使用 config.json
 */
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// 默认配置
const defaultConfig = {
  PORT: 80,
  SMTP_PORT: 25,
  SMTP_HOST: '0.0.0.0',
  MAX_MAILS: 50,
  MAIL_EXPIRE_MINUTES: 10,
  ADMIN_USER: 'admin',
  ADMIN_PASSWORD: 'password',
  FORBIDDEN_PREFIXES: ['admin', 'root', 'support', 'test'],
  SESSION_SECRET: 'a_very_secret_key_that_should_be_changed'
};

// 尝试加载 .env 文件
const envPath = path.join(__dirname, '../.env');
let envConfig = {};

if (fs.existsSync(envPath)) {
  console.log(`找到 .env 文件: ${envPath}`);
  const result = dotenv.config({ path: envPath });

  if (result.error) {
    console.error('加载 .env 文件出错:', result.error);
  } else {
    console.log('成功加载 .env 文件');
    envConfig = result.parsed || {};
  }
}

// 加载 config.json
let jsonConfig = {};
try {
  jsonConfig = require('../config.json');
  console.log('成功加载 config.json 文件');
} catch (err) {
  console.error('加载 config.json 文件出错:', err.message);
}

// 合并配置，优先级: .env > config.json > 默认配置
const config = {
  ...defaultConfig,
  ...jsonConfig,
  ...envConfig
};

// 转换数字类型的配置项
['PORT', 'SMTP_PORT', 'MAX_MAILS', 'MAIL_EXPIRE_MINUTES'].forEach(key => {
  if (config[key] && typeof config[key] === 'string') {
    config[key] = parseInt(config[key], 10);
  }
});

// 确保 FORBIDDEN_PREFIXES 是一个数组
if (config.FORBIDDEN_PREFIXES && typeof config.FORBIDDEN_PREFIXES === 'string') {
  config.FORBIDDEN_PREFIXES = config.FORBIDDEN_PREFIXES.split(',').map(p => p.trim());
}

// 简化域名处理，不再依赖反向代理
config.getDomain = function() {
  // 直接使用配置中的BASE_URL或默认为localhost
  if (config.BASE_URL) {
    try {
      const url = new URL(config.BASE_URL);
      return url.hostname;
    } catch (e) {
      console.error('BASE_URL格式错误:', e);
    }
  }
  return 'localhost';
};

// 获取当前域名
config.getCurrentDomain = function() {
  return this.getDomain();
};

// 新增：持久化配置的函数
config.updateConfig = function(newConfig) {
  // 更新内存中的配置
  Object.assign(config, newConfig);

  // 准备要写入文件的数据（排除函数）
  const configToSave = { ...config };
  delete configToSave.getDomain;
  delete configToSave.getCurrentDomain;
  delete configToSave.updateConfig;

  // 写回 config.json
  const configPath = path.join(__dirname, '../config.json');
  try {
    fs.writeFileSync(configPath, JSON.stringify(configToSave, null, 2));
    console.log('配置已更新并保存到 config.json');
    return true;
  } catch (err) {
    console.error('保存配置到 config.json 失败:', err);
    return false;
  }
};

module.exports = config;
