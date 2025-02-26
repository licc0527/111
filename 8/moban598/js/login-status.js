// 检查登录状态并更新按钮
function updateLoginButton() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginBtn = document.querySelector('.cart.box_1 a[href="account.html"]');
    
    if(currentUser && loginBtn) {
        loginBtn.href = "my-account.html";
        loginBtn.querySelector('.total').innerHTML = `
            <img src="images/user.png" alt="" style="width: 20px; vertical-align: middle;"/>
            <span style="vertical-align: middle;">个人中心</span>
        `;
    }
}

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', updateLoginButton);

function logout() {
    localStorage.removeItem('currentUser');
    simpleCart.empty(); // 清空购物车显示
    alert('退出成功');
    window.location.href = 'index.html';
} 