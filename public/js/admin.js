document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('admin-form');
  const alertBanner = document.getElementById('alert-banner');
  const menuItems = document.querySelectorAll('.admin-menu-item');
  const contentCards = document.querySelectorAll('.admin-content-card');

  // 处理菜单点击事件
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // 移除所有菜单的激活状态
      menuItems.forEach(i => i.classList.remove('active-menu'));
      // 为当前菜单添加激活状态
      e.currentTarget.classList.add('active-menu');

      // 隐藏所有内容卡片
      contentCards.forEach(card => card.classList.add('hidden'));
      
      // 显示对应的内容卡片
      const targetId = e.currentTarget.getAttribute('href').substring(1);
      document.getElementById(targetId).classList.remove('hidden');
    });
  });

  // 默认显示第一个标签页
  document.querySelector('.admin-menu-item[href="#general"]').click();

  // 初始化语言和主题
  if(typeof setupLanguage === 'function') {
      setupLanguage();
  }
  if(typeof setupTheme === 'function') {
      setupTheme();
  }

  // 获取并填充当前配置
  fetch('/admin/config')
    .then(res => {
      if (!res.ok) {
        // 如果未授权，服务器会重定向，这里捕获跳转
        if (res.status === 401 || res.redirected) {
          window.location.href = '/login.html';
        }
        throw new Error('无法获取配置');
      }
      return res.json();
    })
    .then(config => {
      document.getElementById('mailExpireMinutes').value = config.mailExpireMinutes;
      document.getElementById('maxMails').value = config.maxMails;
      document.getElementById('forbiddenPrefixes').value = config.forbiddenPrefixes;
      document.getElementById('adminUser').value = config.adminUser;
    })
    .catch(error => {
      console.error('错误:', error);
      // 可能因为会话过期等，跳转到登录页
      window.location.href = '/login.html';
    });

  // 提交表单
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('/admin/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      showAlert(result.message, result.success);
      if (result.success) {
        // 如果修改了密码，密码框置空
        document.getElementById('adminPassword').value = '';
      }
    })
    .catch(error => {
      showAlert('发生错误，请查看控制台', false);
      console.error('保存失败:', error);
    });
  });

  function showAlert(message, success) {
    alertBanner.textContent = message;
    alertBanner.className = `fixed top-24 right-10 z-50 text-white py-2 px-4 rounded-lg shadow-lg ${success ? 'bg-green-500' : 'bg-red-500'}`;
    alertBanner.classList.remove('hidden');
    setTimeout(() => {
      alertBanner.classList.add('hidden');
    }, 3000);
  }
}); 