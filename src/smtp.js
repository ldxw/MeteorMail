const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');
const mailbox = require('./mailbox');
const { saveMail } = require('./mailstore');
const config = require('./config');

const server = new SMTPServer({
  authOptional: true,
  onConnect(session, callback) {
    console.log('有SMTP客户端连接:', session.remoteAddress);
    callback();
  },
  onData(stream, session, callback) {
    let raw = '';
    stream.on('data', chunk => {
      raw += chunk.toString();
    });
    stream.on('end', async () => {
      // 解析收件人完整邮箱地址
      const to = session.envelope.rcptTo[0].address;
      const id = to.split('@')[0].toLowerCase();

      // 直接使用原始收件人地址
      const correctTo = to;

      console.log('开始接收邮件，收件人:', to);
      // 使用mailparser解析邮件内容
      try {
        const parsed = await simpleParser(raw);
        const mail = {
          to: correctTo,  // 使用修正后的收件人地址
          from: parsed.from?.text || '',
          subject: parsed.subject || '',
          text: parsed.text || '',
          html: parsed.html || '',
          date: parsed.date || new Date(),
          attachments: parsed.attachments || [],
          raw
        };
        // 保存邮件到内存（以修正后的完整邮箱地址为key）
        saveMail(correctTo.toLowerCase(), mail);
        console.log('邮件已保存:', mail.subject);
        const socket = mailbox.getSocketByMailbox(id);
        if (socket) {
          socket.emit('mail', mail);
        }
      } catch (err) {
        console.error('邮件解析失败:', err);
      }
      callback();
    });
  },
  disabledCommands: ['STARTTLS', 'AUTH']
});

module.exports = server;