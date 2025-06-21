// 使用当前窗口的location作为Socket.IO连接地址
const socket = io(window.location.origin);
let currentMailboxId = '';
let mailList = [];
let selectedMailIdx = null;

const mailboxInput = document.getElementById('mailboxId');
const copyBtn = document.getElementById('copyBtn');
const refreshBtn = document.getElementById('refreshBtn');
const customBtn = document.getElementById('customBtn');
const mailListTbody = document.getElementById('mailList');
const emptyTip = document.getElementById('emptyTip');

const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalSubject = document.getElementById('modalSubject');
const modalFrom = document.getElementById('modalFrom');
const modalDate = document.getElementById('modalDate');
const modalContent = document.getElementById('modalContent');
const showRaw = document.getElementById('showRaw');
const rawContent = document.getElementById('rawContent');
const darkToggle = document.getElementById('darkToggle');

// 复制功能
new ClipboardJS('#copyBtn');

function setMailboxId(id) {
  currentMailboxId = id;
  // 使用配置中的域名或当前域名
  const domain = typeof getEmailDomain === 'function' ? getEmailDomain() : location.hostname;
  mailboxInput.value = id + '@' + domain;
  localStorage.setItem('mailboxId', id);
}

function renderMailList() {
  mailListTbody.innerHTML = '';
  const mailCards = document.getElementById('mailCards');
  mailCards.innerHTML = '';
  if (mailList.length === 0) {
    emptyTip.classList.remove('hidden');
    return;
  } else {
    emptyTip.classList.add('hidden');
  }
  // 桌面端表格
  mailList.forEach((mail, idx) => {
    const tr = document.createElement('tr');
    let selectedClass = idx === selectedMailIdx ? 'selected-row' : '';
    tr.className = `border-b transition cursor-pointer ${selectedClass}`;
    tr.style.borderColor = 'var(--border-color)';
    tr.style.borderOpacity = '0.5';

    // 添加悬停效果
    tr.onmouseover = function() {
      this.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
    };
    tr.onmouseout = function() {
      this.style.backgroundColor = '';
    };

    tr.innerHTML = `
      <td class="px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis" style="color: var(--text-primary);">${mail.from || ''}</td>
      <td class="px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis" style="color: var(--text-primary);">${mail.subject || ''}</td>
      <td class="px-4 py-3 whitespace-nowrap" style="color: var(--text-tertiary);">${mail.date ? new Date(mail.date).toLocaleString() : ''}</td>
      <td class="px-4 py-3 text-right">
        <button class="delete-btn p-1.5 rounded-lg transition-colors" title="${localStorage.getItem('language') === 'en' ? 'Delete Email' : '删除邮件'}" data-idx="${idx}" style="background-color: rgba(79, 70, 229, 0.1); color: #ef4444;">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </td>
    `;
    // 邮件详情点击（除操作按钮外）
    Array.from(tr.children).slice(0, 3).forEach(td => {
      td.addEventListener('click', () => {
        selectedMailIdx = idx;
        renderMailList();
        showMailDetail(mail);
      });
    });
    // 删除按钮点击
    tr.querySelector('.delete-btn').onclick = function(e) {
      e.stopPropagation();
      deleteMail(idx);
    };
    mailListTbody.appendChild(tr);

    // 移动端卡片
    const card = document.createElement('div');
    let cardSelected = idx === selectedMailIdx ? 'selected-card' : '';
    card.className = `rounded-lg px-4 py-3 ${cardSelected}`;
    card.style.backgroundColor = 'rgba(79, 70, 229, 0.05)';
    card.style.border = '1px solid var(--border-color)';

    card.innerHTML = `
      <div class="flex items-center justify-between mb-1">
        <span class="font-medium text-base truncate max-w-[60%]" style="color: var(--text-primary);">${mail.from || ''}</span>
        <span class="text-xs ml-2" style="color: var(--text-tertiary);">${mail.date ? new Date(mail.date).toLocaleString() : ''}</span>
      </div>
      <div class="text-sm font-medium truncate mb-2" style="color: var(--text-primary);">${mail.subject || ''}</div>
      <div class="flex justify-end">
        <button class="delete-btn p-1.5 rounded-lg transition-colors" title="${localStorage.getItem('language') === 'en' ? 'Delete Email' : '删除邮件'}" data-idx="${idx}" style="background-color: rgba(79, 70, 229, 0.1); color: #ef4444;">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    `;
    // 卡片点击（除操作按钮外）
    card.querySelectorAll('span,div.text-sm').forEach(el => {
      el.addEventListener('click', () => {
        selectedMailIdx = idx;
        renderMailList();
        showMailDetail(mail);
      });
    });
    // 删除按钮点击
    card.querySelector('.delete-btn').onclick = function(e) {
      e.stopPropagation();
      deleteMail(idx);
    };
    mailCards.appendChild(card);
  });
}

function fetchMailList() {
  if (!currentMailboxId) return;
  // 使用配置中的域名或当前域名
  const domain = typeof getEmailDomain === 'function' ? getEmailDomain() : location.hostname;
  fetch(`/api/mails/${encodeURIComponent(currentMailboxId + '@' + domain)}`)
    .then(res => res.json())
    .then(data => {
      mailList = data.mails || [];
      renderMailList();
    });
}

function deleteMail(idx) {
  if (!currentMailboxId) return;
  // 使用配置中的域名或当前域名
  const domain = typeof getEmailDomain === 'function' ? getEmailDomain() : location.hostname;
  fetch(`/api/mails/${encodeURIComponent(currentMailboxId + '@' + domain)}/${idx}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        fetchMailList();
      } else {
        alert(localStorage.getItem('language') === 'en' ? 'Delete failed' : '删除失败');
      }
    });
}

function showMailDetail(mail) {
  // 邮件详情弹窗
  modalSubject.textContent = mail.subject || (localStorage.getItem('language') === 'en' ? '(No Subject)' : '(无主题)');

  // 获取当前语言
  const lang = localStorage.getItem('language') || 'zh-CN';
  const senderLabel = lang === 'zh-CN' ? '发件人：' : 'From: ';

  modalFrom.innerHTML = `<span class='font-semibold' style='color: var(--text-secondary);'>${senderLabel}</span><span style='color: var(--text-secondary);'>${mail.from || ''}</span>`;
  modalDate.textContent = mail.date ? new Date(mail.date).toLocaleString() : '';

  if (mail.html) {
    modalContent.innerHTML = mail.html;
  } else {
    modalContent.textContent = mail.text || '';
  }

  // 附件支持
  if (mail.attachments && mail.attachments.length > 0) {
    const attDiv = document.createElement('div');
    attDiv.className = 'mt-4 flex flex-wrap gap-2';
    attDiv.innerHTML = mail.attachments.map(att => `<span class='inline-flex items-center px-2 py-1 rounded text-xs' style='background-color: rgba(79, 70, 229, 0.1); color: var(--text-secondary);'><svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>${att.filename || (localStorage.getItem('language') === 'en' ? 'Attachment' : '附件')}</span>`).join('');
    modalContent.appendChild(attDiv);
  }

  rawContent.textContent = mail.raw || '';
  rawContent.classList.add('hidden');
  modal.classList.remove('hidden');
}

closeModal.onclick = () => {
  modal.classList.add('hidden');
};

showRaw.onclick = () => {
  rawContent.classList.toggle('hidden');
};

refreshBtn.onclick = () => {
  socket.emit('request mailbox');
};

// WebSocket事件
socket.on('connect', () => {
  let id = localStorage.getItem('mailboxId');
  if (id) {
    socket.emit('set mailbox', id);
  } else {
    socket.emit('request mailbox');
  }
});

socket.on('mailbox', id => {
  setMailboxId(id);
  fetchMailList();
});

socket.on('mailbox_error', message => {
  // 如果自定义邮箱模态框已打开，在其中显示错误
  const customModal = document.getElementById('customModal');
  const customError = document.getElementById('customError');
  
  // 恢复之前的邮箱ID（如果有）
  const previousId = localStorage.getItem('mailboxId');
  if (previousId) {
    // 恢复之前的邮箱ID
    currentMailboxId = previousId;
    // 更新显示
    const domain = typeof getEmailDomain === 'function' ? getEmailDomain() : location.hostname;
    mailboxInput.value = previousId + '@' + domain;
  }
  
  // 获取当前语言
  const lang = localStorage.getItem('language') || 'zh-CN';
  
  // 根据错误代码获取翻译文本
  let errorMessage = message;
  
  // 检查是否存在全局 translations 对象
  if (window.translations && window.translations[lang]) {
    // 如果错误消息是一个键名，尝试从翻译中获取
    if (window.translations[lang][message]) {
      errorMessage = window.translations[lang][message];
    }
  } else {
    // 如果没有找到翻译，使用默认错误消息
    if (message === 'forbidden_prefix') {
      errorMessage = lang === 'en' ? 
        'This mailbox prefix is not allowed' : 
        '不允许使用该邮箱前缀';
    }
  }
  
  if (customModal && customModal.style.display !== 'none' && !customModal.classList.contains('hidden') && customError) {
    // 在模态框中显示错误
    customError.textContent = errorMessage;
    customError.classList.remove('hidden');
  } else {
    // 创建一个临时的错误提示
    showFloatingError(errorMessage);
  }
});

// 显示浮动错误提示
function showFloatingError(message) {
  // 检查是否已存在错误提示
  let errorAlert = document.getElementById('floating-error');
  if (!errorAlert) {
    errorAlert = document.createElement('div');
    errorAlert.id = 'floating-error';
    errorAlert.className = 'fixed top-24 right-10 z-50 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg transition-opacity duration-300';
    errorAlert.style.opacity = '0';
    document.body.appendChild(errorAlert);
  }
  
  // 设置错误消息
  errorAlert.textContent = message;
  
  // 显示错误提示
  setTimeout(() => {
    errorAlert.style.opacity = '1';
  }, 10);
  
  // 3秒后隐藏
  setTimeout(() => {
    errorAlert.style.opacity = '0';
    setTimeout(() => {
      if (errorAlert.parentNode) {
        errorAlert.parentNode.removeChild(errorAlert);
      }
    }, 300);
  }, 3000);
}

socket.on('mail', mail => {
  mailList.unshift(mail);
  if (mailList.length > 50) mailList.length = 50;
  renderMailList();
});

// 定时轮询API获取历史邮件，防止漏信
setInterval(fetchMailList, 10000);

// 让全局可访问socket
window.socket = socket;