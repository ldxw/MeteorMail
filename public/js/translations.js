// MeteorMail 多语言支持
// 支持中文和英文

// 翻译对象
const translations = {
  'zh-CN': {
    // 导航
    'nav_home': '首页',
    'nav_about': '关于',
    'toggle_dark_mode': '切换深色模式',
    'toggle_language': '切换语言',

    // 首页主标题和描述
    'main_title': 'MeteorMail，如流星般闪耀而短暂',
    'main_description': '快速创建一次性邮箱，保护您的隐私，避免垃圾邮件和广告骚扰。无需注册，即用即走。',

    // 邮箱操作区
    'your_mailbox': '您的 MeteorMail',
    'copy': '复制',
    'refresh': '刷新',
    'custom': '自定义',
    'realtime_notice': '邮件将在发送后实时显示，无需刷新页面',

    // 邮件列表
    'mail_list': '邮件列表',
    'sender': '发件人',
    'subject': '主题',
    'date': '日期',
    'actions': '操作',
    'empty_mailbox': '邮箱空空如也',
    'waiting_for_emails': '等待邮件到达...',
    'view_raw': '查看原始内容',
    'close': '关闭',
    'email_details': '邮件详情',

    // 自定义邮箱
    'custom_mailbox': '自定义邮箱',
    'custom_mailbox_tip': '请输入您想要的邮箱前缀',
    'custom_mailbox_placeholder': '仅限字母和数字',
    'ok': '确定',
    'cancel': '取消',
    'custom_error': '邮箱前缀只能包含字母和数字',
    'custom_empty_error': '邮箱前缀不能为空',

    // 功能亮点
    'feature_no_registration': '无需注册',
    'feature_realtime': '实时接收',
    'feature_auto_destroy': '10分钟自动销毁',
    'feature_privacy': '保护隐私',

    // 关于页面
    'about_title': '关于 MeteorMail',
    'about_intro_title': '项目介绍',
    'about_intro_text1': 'MeteorMail 是一个基于 Node.js 的自托管临时邮箱服务，如同流星划过夜空般短暂绚丽。它为用户提供即时创建、即用即走的临时邮箱，帮助保护您的隐私，避免垃圾邮件，同时满足各类验证码接收需求。',
    'about_intro_text2': '项目完全开源，您可以在自己的服务器上部署，掌握数据控制权，无需依赖第三方服务。',

    'about_features_title': '核心特性',
    'about_feature1_title': 'WebSocket 实时推送',
    'about_feature1_desc': '邮件到达时立即显示，无需刷新页面',
    'about_feature2_title': '自动过期机制',
    'about_feature2_desc': '邮件在设定时间后自动删除，增强隐私保护',
    'about_feature3_title': '直观界面',
    'about_feature3_desc': '简洁现代的用户界面，支持深色模式',
    'about_feature4_title': '完整API',
    'about_feature4_desc': '提供REST API接口方便程序化调用',
    'about_feature5_title': 'HTML邮件支持',
    'about_feature5_desc': '完整渲染HTML格式邮件',
    'about_feature6_title': '附件查看',
    'about_feature6_desc': '支持接收和查看邮件附件',
    'about_feature7_title': '自定义邮箱ID',
    'about_feature7_desc': '允许用户自定义邮箱前缀',

    'about_usecases_title': '使用场景',
    'about_usecase1_title': '保护隐私',
    'about_usecase1_desc': '注册不常用的网站或服务时使用临时邮箱，避免个人邮箱泄露带来的垃圾邮件风险。',
    'about_usecase2_title': '开发测试',
    'about_usecase2_desc': '开发者测试需要邮箱验证的功能，无需创建多个真实邮箱账号。',
    'about_usecase3_title': '自动化流程',
    'about_usecase3_desc': '通过API集成到自动化流程中，实现自动接收验证码和邮件处理。',
    'about_usecase4_title': '教育演示',
    'about_usecase4_desc': '在教学场景中演示邮件系统工作原理，无需设置复杂的邮件服务器。',

    'about_tech_title': '技术架构',
    'about_backend_title': '后端技术',
    'about_frontend_title': '前端技术',

    'about_usage_title': '使用方式',
    'about_usage_intro': 'MeteorMail 提供多种使用方式，即使不搭建自己的服务器，您也可以通过简单的域名配置来使用此服务。',
    'about_usage_a_title': '域名 A 记录配置',
    'about_usage_a_desc': '通过设置域名的 A 记录指向我们的服务器 IP，您可以使用自己的域名访问 MeteorMail 服务：',
    'about_usage_a_step1': '登录您的域名管理面板',
    'about_usage_a_step2': '添加一条 A 记录，将您的域名或子域名指向我们的服务器 IP',
    'about_usage_a_step3': '等待 DNS 解析生效（通常需要几分钟到几小时）',
    'about_usage_a_step4': '使用您的域名访问 MeteorMail 服务',

    'about_usage_cname_title': '域名 CNAME 记录配置',
    'about_usage_cname_desc': '如果您希望更灵活地使用服务，可以通过 CNAME 记录将您的域名指向我们的服务：',
    'about_usage_cname_step1': '登录您的域名管理面板',
    'about_usage_cname_step2': '添加一条 CNAME 记录，将您的域名或子域名指向 ',
    'about_usage_cname_step3': '等待 DNS 解析生效（通常需要几分钟到几小时）',
    'about_usage_cname_step4': '使用您的域名访问 MeteorMail 服务',
    'about_usage_cname_note': '使用 CNAME 方式时，您的邮箱地址将变为 用户名@您的域名，所有邮件将自动转发到我们的服务。',



    'about_author_title': '关于作者',
    'about_author_intro': 'MeteorMail 由 Ctrler 开发和维护。Ctrler 是一位热衷于开源项目的开发者，致力于创建简单实用的工具来解决实际问题。',
    'about_author_wechat': '欢迎关注作者的微信公众号「Ctrler」，获取更多技术分享和项目更新。',
    'about_author_wechat_account': '微信公众号：Ctrler',

    'about_opensource_title': '开源与贡献',
    'about_opensource_desc': 'MeteorMail 是一个开源项目，欢迎社区贡献代码、提出建议或报告问题。您可以在 GitHub 上找到我们的项目，参与贡献或部署自己的实例。',
    'github_repo': 'GitHub 仓库',

    // API 页面
    'api_doc_title': 'MeteorMail API 文档',
    'api_overview': 'API 概述',
    'api_overview_desc1': 'MeteorMail 提供了一组简单的 RESTful API，允许您以编程方式访问 MeteorMail 服务。这些 API 可以用于查询邮件列表、获取特定邮件内容或删除邮件。',
    'api_overview_desc2': '所有 API 返回 JSON 格式的数据，使用标准 HTTP 状态码表示请求结果。',
    
    // API 使用限制
    'api_restrictions': '使用限制',
    'api_forbidden_prefixes_desc': '系统禁止使用某些特定的邮箱前缀，如 "admin"、"root" 等。如果尝试通过API访问这些前缀的邮箱，将收到 403 Forbidden 错误。',
    'api_forbidden_example': '禁用前缀错误示例',
    'api_forbidden_note': '注意：错误消息会根据请求头中的 Accept-Language 返回中文或英文。',
    
    'api_base_url': '基础 URL',
    'api_base_url_desc': '所有 API 请求都使用以下基础 URL：',
    'api_base_url_example': '例如：',
    'api_endpoints': 'API 端点',
    'api_get_mails_title': '1. 获取邮箱邮件列表',
    'api_get_mails_desc': '获取指定邮箱地址中的所有邮件列表。<code>:mailboxAddr</code> 为完整邮箱地址（如 <code>zdugawlb@localhost</code>），需要进行 URL 编码。',
    'api_example_request': '示例请求',
    'api_example_response': '示例响应',
    'api_example_response_fail': '示例响应 - 邮件不存在',
    'api_example_response_success': '示例响应 - 成功',
    'api_get_mail_title': '2. 获取指定邮件',
    'api_get_mail_desc': '获取指定邮箱中特定索引的邮件。<code>:mailboxAddr</code> 为完整邮箱地址，需要 URL 编码；<code>:idx</code> 为邮件在列表中的索引（从0开始）。',
    'api_delete_mail_title': '3. 删除指定邮件',
    'api_delete_mail_desc': '删除指定邮箱中特定索引的邮件。<code>:mailboxAddr</code> 为完整邮箱地址，需要 URL 编码；<code>:idx</code> 为邮件在列表中的索引（从0开始）。',
    'api_usage_examples': '使用示例',
    'api_curl_examples': 'cURL 示例',
    'api_get_mail_list': '获取邮件列表',
    'api_get_specific_mail': '获取特定邮件',
    'api_delete_mail': '删除邮件',
    'api_js_examples': 'JavaScript 示例',
    'api_python_examples': 'Python 示例',
    'mail_not_exist': '邮件不存在或已过期',

    // 诊断页面
    'system_diagnostic': 'MeteorMail 系统诊断',
    'browser_info': '浏览器信息',
    'connection_test': '网络连接测试',
    'test_socket_connection': '测试Socket.IO连接',
    'connecting': '正在连接...',
    'script_loaded': 'Socket.IO脚本加载成功',
    'connection_success': '✅ 连接成功! Socket ID: ',
    'connection_error': '❌ 连接错误: ',
    'socket_error': '❌ Socket.IO连接错误: ',
    'script_load_error': '❌ Socket.IO脚本加载失败',
    'execution_error': '❌ 执行错误: ',

    // 页脚
    'footer_text': '© 2025 MeteorMail - 如流星般短暂而绚丽的邮箱服务',

    // 复制成功提示
    'copied': '已复制!',

    // 错误消息
    'forbidden_prefix': '不允许使用该邮箱前缀',
    'login_error': '用户名或密码错误。',
    'admin_login': '管理员登录',
    'admin_title': 'MeteorMail - 管理后台',
    'username': '用户名',
    'password': '密码',
    'login_button': '登录',
    'general_settings': '常规设置',
    'security_settings': '安全设置',
    'account_settings': '账户设置',
    'email_retention_duration': '邮件保留时长 (分钟)',
    'max_emails_per_mailbox': '邮箱最大邮件数',
    'forbidden_prefixes_label': '禁用邮箱前缀 (每行一个)',
    'admin_username_label': '管理员用户名',
    'new_password_label': '新密码 (留空则不修改)',
    'new_password_placeholder': '输入新密码',
    'save_all_settings': '保存所有设置',
    'logout': '登出'
  },
  'en': {
    // Navigation
    'nav_home': 'Home',
    'nav_about': 'About',
    'toggle_dark_mode': 'Toggle Dark Mode',
    'toggle_language': 'Switch Language',

    // Main title and description
    'main_title': 'MeteorMail, Brilliant and Fleeting Like a Meteor',
    'main_description': 'Quickly create disposable email addresses to protect your privacy and avoid spam. No registration required, use it and leave.',

    // Mailbox operations
    'your_mailbox': 'Your MeteorMail',
    'copy': 'Copy',
    'refresh': 'Refresh',
    'custom': 'Custom',
    'realtime_notice': 'Emails will display in real-time, no need to refresh the page',

    // Mail list
    'mail_list': 'Mail List',
    'sender': 'Sender',
    'subject': 'Subject',
    'date': 'Date',
    'actions': 'Actions',
    'empty_mailbox': 'Mailbox is Empty',
    'waiting_for_emails': 'Waiting for emails to arrive...',
    'view_raw': 'View Raw Content',
    'close': 'Close',
    'email_details': 'Email Details',

    // Custom mailbox
    'custom_mailbox': 'Custom Mailbox',
    'custom_mailbox_tip': 'Enter your desired mailbox prefix',
    'custom_mailbox_placeholder': 'Letters and numbers only',
    'ok': 'OK',
    'cancel': 'Cancel',
    'custom_error': 'Mailbox prefix can only contain letters and numbers',
    'custom_empty_error': 'Mailbox prefix cannot be empty',

    // Features highlights
    'feature_no_registration': 'No Registration',
    'feature_realtime': 'Real-time Reception',
    'feature_auto_destroy': '10-min Auto Destroy',
    'feature_privacy': 'Privacy Protection',

    // About page
    'about_title': 'About MeteorMail',
    'about_intro_title': 'Project Introduction',
    'about_intro_text1': 'MeteorMail is a self-hosted temporary email service based on Node.js, as brilliant and fleeting as a meteor across the night sky. It provides users with instantly created, disposable email addresses to protect your privacy, avoid spam, and meet various verification code reception needs.',
    'about_intro_text2': 'The project is completely open source. You can deploy it on your own server, maintain control over your data, and eliminate dependency on third-party services.',

    'about_features_title': 'Core Features',
    'about_feature1_title': 'WebSocket Real-time Push',
    'about_feature1_desc': 'Emails display immediately upon arrival, no need to refresh the page',
    'about_feature2_title': 'Auto-expiry Mechanism',
    'about_feature2_desc': 'Emails are automatically deleted after a set time, enhancing privacy protection',
    'about_feature3_title': 'Intuitive Interface',
    'about_feature3_desc': 'Clean, modern user interface with dark mode support',
    'about_feature4_title': 'Complete API',
    'about_feature4_desc': 'Provides REST API interfaces for programmatic access',
    'about_feature5_title': 'HTML Email Support',
    'about_feature5_desc': 'Complete rendering of HTML format emails',
    'about_feature6_title': 'Attachment Viewing',
    'about_feature6_desc': 'Support for receiving and viewing email attachments',
    'about_feature7_title': 'Custom Email ID',
    'about_feature7_desc': 'Allows users to customize their email prefix',

    'about_usecases_title': 'Use Cases',
    'about_usecase1_title': 'Privacy Protection',
    'about_usecase1_desc': 'Use temporary email when registering for infrequently used websites or services to avoid spam risks from personal email exposure.',
    'about_usecase2_title': 'Development Testing',
    'about_usecase2_desc': 'Developers can test email verification features without creating multiple real email accounts.',
    'about_usecase3_title': 'Automated Workflows',
    'about_usecase3_desc': 'Integrate with APIs into automated workflows for automatic verification code reception and email processing.',
    'about_usecase4_title': 'Educational Demonstrations',
    'about_usecase4_desc': 'Demonstrate email system principles in educational settings without setting up complex mail servers.',

    'about_tech_title': 'Technical Architecture',
    'about_backend_title': 'Backend Technologies',
    'about_frontend_title': 'Frontend Technologies',

    'about_usage_title': 'Usage Methods',
    'about_usage_intro': 'MeteorMail offers multiple usage methods. Even without setting up your own server, you can use this service through simple domain configuration.',
    'about_usage_a_title': 'Domain A Record Configuration',
    'about_usage_a_desc': 'By setting your domain\'s A record to point to our server IP, you can access the MeteorMail service using your own domain:',
    'about_usage_a_step1': 'Log in to your domain management panel',
    'about_usage_a_step2': 'Add an A record pointing your domain or subdomain to our server IP',
    'about_usage_a_step3': 'Wait for DNS resolution to take effect (usually takes a few minutes to hours)',
    'about_usage_a_step4': 'Access the MeteorMail service using your domain',

    'about_usage_cname_title': 'Domain CNAME Record Configuration',
    'about_usage_cname_desc': 'For more flexible service usage, you can point your domain to our service using a CNAME record:',
    'about_usage_cname_step1': 'Log in to your domain management panel',
    'about_usage_cname_step2': 'Add a CNAME record pointing your domain or subdomain to ',
    'about_usage_cname_step3': 'Wait for DNS resolution to take effect (usually takes a few minutes to hours)',
    'about_usage_cname_step4': 'Access the MeteorMail service using your domain',
    'about_usage_cname_note': 'When using the CNAME method, your email address will be username@yourdomain, and all emails will be automatically forwarded to our service.',



    'about_author_title': 'About the Author',
    'about_author_intro': 'MeteorMail is developed and maintained by Ctrler. Ctrler is a developer passionate about open-source projects, dedicated to creating simple and practical tools to solve real-world problems.',
    'about_author_wechat': 'Follow the author\'s WeChat public account "Ctrler" for more technical sharing and project updates.',
    'about_author_wechat_account': 'WeChat Public Account: Ctrler',

    'about_opensource_title': 'Open Source and Contribution',
    'about_opensource_desc': 'MeteorMail is an open-source project. Community contributions of code, suggestions, or issue reports are welcome. You can find our project on GitHub to contribute or deploy your own instance.',
    'github_repo': 'GitHub Repository',

    // API page
    'api_doc_title': 'MeteorMail API Documentation',
    'api_overview': 'API Overview',
    'api_overview_desc1': 'MeteorMail provides a simple set of RESTful APIs that allow you to programmatically access the MeteorMail service. These APIs can be used to query mail lists, get specific mail content, or delete mails.',
    'api_overview_desc2': 'All APIs return data in JSON format and use standard HTTP status codes to indicate request results.',
    
    // API restrictions
    'api_restrictions': 'Usage Restrictions',
    'api_forbidden_prefixes_desc': 'The system prohibits the use of certain mailbox prefixes, such as "admin", "root", etc. If you attempt to access mailboxes with these prefixes via API, you will receive a 403 Forbidden error.',
    'api_forbidden_example': 'Forbidden Prefix Error Example',
    'api_forbidden_note': 'Note: Error messages will be returned in Chinese or English based on the Accept-Language header in the request.',
    
    'api_base_url': 'Base URL',
    'api_base_url_desc': 'All API requests use the following base URL:',
    'api_base_url_example': 'For example:',
    'api_endpoints': 'API Endpoints',
    'api_get_mails_title': '1. Get Mailbox Email List',
    'api_get_mails_desc': 'Get all emails in the specified mailbox address. <code>:mailboxAddr</code> is the complete email address (e.g., <code>zdugawlb@localhost</code>) and needs to be URL encoded.',
    'api_example_request': 'Example Request',
    'api_example_response': 'Example Response',
    'api_example_response_fail': 'Example Response - Email Not Found',
    'api_example_response_success': 'Example Response - Success',
    'api_get_mail_title': '2. Get Specific Email',
    'api_get_mail_desc': 'Get a specific email by index from the specified mailbox. <code>:mailboxAddr</code> is the complete email address and needs to be URL encoded; <code>:idx</code> is the index of the email in the list (starting from 0).',
    'api_delete_mail_title': '3. Delete Specific Email',
    'api_delete_mail_desc': 'Delete a specific email by index from the specified mailbox. <code>:mailboxAddr</code> is the complete email address and needs to be URL encoded; <code>:idx</code> is the index of the email in the list (starting from 0).',
    'api_usage_examples': 'Usage Examples',
    'api_curl_examples': 'cURL Examples',
    'api_get_mail_list': 'Get Email List',
    'api_get_specific_mail': 'Get Specific Email',
    'api_delete_mail': 'Delete Email',
    'api_js_examples': 'JavaScript Examples',
    'api_python_examples': 'Python Examples',
    'mail_not_exist': 'Email does not exist or has expired',

    // Diagnostic page
    'system_diagnostic': 'MeteorMail System Diagnostic',
    'browser_info': 'Browser Information',
    'connection_test': 'Connection Test',
    'test_socket_connection': 'Test Socket.IO Connection',
    'connecting': 'Connecting...',
    'script_loaded': 'Socket.IO script loaded successfully',
    'connection_success': '✅ Connection successful! Socket ID: ',
    'connection_error': '❌ Connection error: ',
    'socket_error': '❌ Socket.IO connection error: ',
    'script_load_error': '❌ Socket.IO script load failed',
    'execution_error': '❌ Execution error: ',

    // Footer
    'footer_text': '© 2025 MeteorMail - A brilliant and fleeting email service',

    // Copy success message
    'copied': 'Copied!',

    // Error messages
    'forbidden_prefix': 'This mailbox prefix is not allowed',
    'login_error': 'Invalid username or password.',
    'admin_login': 'Admin Login',
    'admin_title': 'MeteorMail - Admin Panel',
    'username': 'Username',
    'password': 'Password',
    'login_button': 'Login',
    'general_settings': 'General Settings',
    'security_settings': 'Security Settings',
    'account_settings': 'Account Settings',
    'email_retention_duration': 'Email Retention (minutes)',
    'max_emails_per_mailbox': 'Max Mails per Mailbox',
    'forbidden_prefixes_label': 'Forbidden Prefixes (one per line)',
    'admin_username_label': 'Admin Username',
    'new_password_label': 'New Password (leave blank to keep current)',
    'new_password_placeholder': 'Enter new password',
    'save_all_settings': 'Save All Settings',
    'logout': 'Logout'
  }
};

// 确保翻译对象在全局范围内可用
window.translations = translations;

// 语言切换功能
function setupLanguage() {
  console.log('setupLanguage 函数被调用');

  // 获取语言切换按钮
  const langToggle = document.getElementById('langToggle');
  if (!langToggle) {
    console.error('语言切换按钮未找到');
    return;
  }

  console.log('找到语言切换按钮:', langToggle);

  // 获取当前语言或使用默认语言
  let currentLang = localStorage.getItem('language') || 'zh-CN';
  console.log('当前语言:', currentLang);

  // 应用语言
  function applyLanguage(lang) {
    // 保存语言偏好
    localStorage.setItem('language', lang);
    currentLang = lang;

    // 更新HTML lang属性
    document.documentElement.setAttribute('lang', lang);

    // 更新语言切换按钮图标
    updateLanguageIcon(lang);

    // 翻译页面内容
    translatePage(lang);

    // 触发语言切换事件，供其他脚本使用
    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    document.dispatchEvent(event);
  }

  // 更新语言图标
  function updateLanguageIcon(lang) {
    const icon = langToggle.querySelector('svg');
    if (icon) {
      if (lang === 'zh-CN') {
        // 显示英文图标，表示点击后切换到英文
        icon.innerHTML = '<path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389 16.87 16.87 0 01-.554-.514 19.05 19.05 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.054 17.054 0 003.07-3.293 18.013 18.013 0 01-1.487-2.594 1 1 0 111.79-.894c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clip-rule="evenodd" />';

        // 更新按钮标题
        langToggle.setAttribute('title', '切换到英文');
      } else {
        // 显示中文图标，表示点击后切换到中文
        icon.innerHTML = '<path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389 16.87 16.87 0 01-.554-.514 19.05 19.05 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.054 17.054 0 003.07-3.293 18.013 18.013 0 01-1.487-2.594 1 1 0 111.79-.894c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clip-rule="evenodd" />';

        // 更新按钮标题
        langToggle.setAttribute('title', '切换到中文');
      }

      // 添加一个小标记来区分当前语言
      if (lang === 'zh-CN') {
        langToggle.classList.add('zh-mode');
        langToggle.classList.remove('en-mode');
      } else {
        langToggle.classList.add('en-mode');
        langToggle.classList.remove('zh-mode');
      }
    }
  }

  // 翻译页面内容
  function translatePage(lang) {
    // 处理文本内容
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        // 如果元素有子元素，可能需要保留它们
        if (el.childElementCount > 0) {
          // 保存子元素
          const children = Array.from(el.children);
          // 设置翻译文本
          el.textContent = translations[lang][key];
          // 恢复子元素
          children.forEach(child => el.appendChild(child));
        } else {
          // 直接设置文本
          el.textContent = translations[lang][key];
        }
      }
    });

    // 处理 placeholder 属性
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });

    // 处理 title 属性
    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (translations[lang] && translations[lang][key]) {
        el.title = translations[lang][key];
      }
    });

    // 处理 data-original-title 属性（用于复制按钮等需要恢复原始标题的元素）
    const originalTitleElements = document.querySelectorAll('[data-i18n-original-title]');
    originalTitleElements.forEach(el => {
      const key = el.getAttribute('data-i18n-original-title');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('data-original-title', translations[lang][key]);
      }
    });

    // 处理特殊元素，如标题
    if (document.location.pathname === '/' || document.location.pathname === '/index.html') {
      document.title = lang === 'zh-CN' ? 'MeteorMail' : 'MeteorMail';
    } else if (document.location.pathname === '/about.html') {
      document.title = lang === 'zh-CN' ? '关于 MeteorMail' : 'About MeteorMail';
    } else if (document.location.pathname === '/diagnostic.html') {
      document.title = lang === 'zh-CN' ? 'MeteorMail 系统诊断' : 'MeteorMail System Diagnostic';
    } else if (document.location.pathname === '/api.html') {
      document.title = lang === 'zh-CN' ? 'MeteorMail API 文档' : 'MeteorMail API Documentation';
    }
  }

  // 初始化语言
  applyLanguage(currentLang);

  // 点击切换语言
  langToggle.addEventListener('click', () => {
    console.log('语言切换按钮被点击');
    const newLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
    console.log('切换到新语言:', newLang);
    applyLanguage(newLang);
  });
}

// 确保DOM加载完成后初始化语言功能
document.addEventListener('DOMContentLoaded', () => {
  console.log('translations.js: DOMContentLoaded 事件触发');
  setupLanguage();
});

// 导出函数供其他脚本使用
window.setupLanguage = setupLanguage;

// 立即执行一次，以防 DOMContentLoaded 已经触发
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('translations.js: 文档已加载，立即执行 setupLanguage');
  setTimeout(setupLanguage, 100); // 延迟一点执行，确保 DOM 已完全加载
}
