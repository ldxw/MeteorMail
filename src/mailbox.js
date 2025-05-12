const { nanoid } = require('nanoid');

// 存储邮箱与socket的映射
const mailboxes = new Map();

function createMailbox(socket) {
  const id = nanoid(8).toLowerCase();
  mailboxes.set(id, socket);
  return id;
}

function setMailbox(id, socket) {
  mailboxes.set(id, socket);
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