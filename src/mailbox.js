const { nanoid } = require('nanoid');
const config = require('./config');

// 存储邮箱与socket的映射
const mailboxes = new Map();

function createMailbox(socket) {
  const id = nanoid(8).toLowerCase();
  mailboxes.set(id, socket);
  return id;
}

function setMailbox(id, socket) {
  // 检查ID是否在禁用列表中
  if (config.FORBIDDEN_PREFIXES.includes(id.toLowerCase())) {
    socket.emit('mailbox_error', 'forbidden_prefix');
    // 不更新邮箱映射，保持原状态
    return false;
  }
  
  // 保存新的映射关系
  mailboxes.set(id, socket);
  // 通知前端设置成功
  socket.emit('mailbox', id);
  return true;
}

function removeMailbox(id) {
  mailboxes.delete(id);
}

function getSocketByMailbox(id) {
  return mailboxes.get(id);
}

module.exports = {
  createMailbox,
  setMailbox,
  removeMailbox,
  getSocketByMailbox
}; 