// 创建星星背景
function createStars() {
  const container = document.getElementById('stars-container');
  if (!container) {
    console.error('找不到星星容器元素');
    return;
  }
  
  // 清空容器，防止重复创建
  container.innerHTML = '';
  
  const starCount = window.innerWidth <= 640 ? 50 : 100; // 移动端减少星星数量以提高性能

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // 随机位置
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    // 随机大小
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // 动画设置
    star.style.setProperty('--duration', `${3 + Math.random() * 4}s`);
    star.style.setProperty('--delay', `${Math.random() * 4}s`);
    star.style.setProperty('--opacity', `${Math.random() * 0.8}`);
    star.style.setProperty('--min-opacity', `${Math.random() * 0.1}`);
    star.style.setProperty('--max-opacity', `${0.5 + Math.random() * 0.5}`);

    container.appendChild(star);
  }
}

// 创建流星 - 从右上角到左下角
function createMeteors() {
  const container = document.getElementById('meteor-container');
  if (!container) {
    console.error('找不到流星容器元素');
    return;
  }
  
  // 清空容器，防止重复创建
  container.innerHTML = '';

  // 创建单个流星
  function createMeteor(topOffset = null, rightOffset = null, delay = 0) {
    if (!container) return; // 再次检查容器是否存在
    
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');

    // 使用提供的偏移量或随机生成
    const top = topOffset !== null ? topOffset : Math.random() * 50;
    const right = rightOffset !== null ? rightOffset : Math.random() * 20;

    meteor.style.setProperty('--top', `${top}`);
    meteor.style.setProperty('--right', `${right}`);

    // 如果有延迟，设置延迟显示
    if (delay > 0) {
      meteor.style.opacity = '0';
      setTimeout(() => {
        if (container.isConnected) { // 确保容器仍然在DOM中
          container.appendChild(meteor);
        }
      }, delay);
    } else {
      container.appendChild(meteor);
    }

    // 动画结束后移除
    setTimeout(() => {
      if (meteor && meteor.isConnected) {
        meteor.remove();
      }
    }, 4000 + delay); // 增加时间与动画持续时间匹配
  }

  // 创建流星群
  function createMeteorShower() {
    if (!container || !container.isConnected) return;
    
    const count = 10 + Math.floor(Math.random() * 15); // 10-25个流星
    const baseTop = Math.random() * 30; // 基础顶部位置
    const baseRight = Math.random() * 15; // 基础右侧位置

    // 在基础位置附近创建多个流星
    for (let i = 0; i < count; i++) {
      // 在基础位置附近随机偏移
      const topOffset = baseTop + (Math.random() * 20 - 10);
      const rightOffset = baseRight + (Math.random() * 10 - 5);
      // 随机延迟
      const delay = i * 100 + Math.random() * 500;

      createMeteor(topOffset, rightOffset, delay);
    }

    console.log(`流星群出现！数量: ${count}`);
  }

  // 初始创建更多流星
  for (let i = 0; i < 5; i++) {
    setTimeout(() => createMeteor(), i * 800);
  }

  // 定期创建单个流星
  setInterval(() => {
    if (container && container.isConnected) {
      createMeteor();
    }
  }, 2000 + Math.random() * 2000);

  // 随机触发流星群
  function scheduleNextShower() {
    if (!container || !container.isConnected) return;
    
    // 随机 5-10 秒后触发流星群
    const nextShowerTime = 5000 + Math.random() * 5000;

    setTimeout(() => {
      if (container && container.isConnected) {
        createMeteorShower();
        scheduleNextShower(); // 安排下一次流星群
      }
    }, nextShowerTime);
  }

  // 启动流星群计划
  scheduleNextShower();
}

// 手动触发流星群的函数
function triggerMeteorShower() {
  const container = document.getElementById('meteor-container');
  if (!container) return;

  const count = 15 + Math.floor(Math.random() * 10); // 15-25个流星
  const baseTop = Math.random() * 30;
  const baseRight = Math.random() * 15;

  for (let i = 0; i < count; i++) {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');

    // 在基础位置附近随机偏移
    const topOffset = baseTop + (Math.random() * 20 - 10);
    const rightOffset = baseRight + (Math.random() * 10 - 5);

    meteor.style.setProperty('--top', `${topOffset}`);
    meteor.style.setProperty('--right', `${rightOffset}`);

    // 随机延迟添加
    const delay = i * 100 + Math.random() * 300;
    setTimeout(() => {
      if (container && container.isConnected) {
        container.appendChild(meteor);

        // 动画结束后移除
        setTimeout(() => {
          if (meteor && meteor.isConnected) {
            meteor.remove();
          }
        }, 4000);
      }
    }, delay);
  }
}

// 完整的主题切换功能
function setupTheme() {
  const darkToggle = document.getElementById('darkToggle');
  if (!darkToggle) {
    console.error('主题切换按钮未找到');
    return; // 如果按钮不存在，退出函数
  }
  
  const htmlEl = document.documentElement;

  // 检查用户偏好
  function setTheme(isLight) {
    if (isLight) {
      htmlEl.classList.add('light');
      htmlEl.classList.remove('dark');

      // 更新月亮图标为太阳图标
      const icon = darkToggle.querySelector('svg');
      if (icon) {
        icon.innerHTML = '<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />';
      }

      localStorage.setItem('theme', 'light');
    } else {
      htmlEl.classList.remove('light');
      htmlEl.classList.add('dark');

      // 更新太阳图标为月亮图标
      const icon = darkToggle.querySelector('svg');
      if (icon) {
        icon.innerHTML = '<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />';
      }

      localStorage.setItem('theme', 'dark');
    }

    // 切换星星动画速度
    document.querySelectorAll('.star').forEach(star => {
      const currentDuration = parseFloat(star.style.getPropertyValue('--duration'));
      if (!isNaN(currentDuration)) {
        star.style.setProperty('--duration', `${6 - currentDuration}s`);
      }
    });

    // 切换主题时触发流星群
    triggerMeteorShower();
  }

  // 初始化主题
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light') {
    setTheme(true);
  } else if (savedTheme === 'dark' || prefersDark) {
    setTheme(false);
  } else {
    // 默认使用深色主题
    setTheme(false);
  }

  // 点击切换主题
  darkToggle.addEventListener('click', () => {
    const isCurrentlyLight = htmlEl.classList.contains('light');
    setTheme(!isCurrentlyLight);
  });
}

// 确保即使脚本加载完也能启动特效
function initializeEffects() {
  // 尝试初始化特效
  try {
    createStars();
    createMeteors();
    setupTheme();
    console.log('特效初始化成功');
  } catch (error) {
    console.error('特效初始化失败', error);
    
    // 如果初始化失败，等待DOM完全加载后再次尝试
    if (document.readyState !== 'complete') {
      console.log('DOM尚未完全加载，将在加载完成后重试');
      window.addEventListener('load', () => {
        console.log('DOM加载完成，重新初始化特效');
        try {
          createStars();
          createMeteors();
          setupTheme();
        } catch (retryError) {
          console.error('特效重新初始化失败', retryError);
        }
      });
    }
  }
}

// 立即尝试初始化
initializeEffects();

// 确保DOM加载完成后再次尝试初始化（双保险）
document.addEventListener('DOMContentLoaded', () => {
  initializeEffects();
}); 