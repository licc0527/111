function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const accountType = document.getElementById('accountType').value;
    
    if (!email || !password) {
        showMessage('loginMessage', '请填写完整的登录信息！', 'error');
        return;
    }
    
    if (accountType === 'admin') {
        if (email === 'admin@example.com' && password === '123456') {
            localStorage.setItem('userType', 'admin');
            localStorage.setItem('isLoggedIn', 'true');
            showMessage('loginMessage', '登录成功！', 'success');
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1000);
        } else {
            showMessage('loginMessage', '管理员账号或密码错误！', 'error');
        }
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMessage('loginMessage', '登录成功！', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showMessage('loginMessage', '邮箱或密码错误', 'error');
    }
} 