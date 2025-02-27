// 检查管理员登录状态
function checkAdminAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn || userType !== 'admin') {
        window.location.href = 'account.html';
    }
}

// 显示不同的管理部分
function showSection(sectionName) {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionName + 'Section').style.display = 'block';
    
    // 更新导航栏活动状态
    document.querySelectorAll('.admin-nav a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

// 加载商品列表
function loadProducts() {
    const productsList = document.getElementById('productsList');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    productsList.innerHTML = products.map(product => `
        <tr id="product-${product.id}">
            <td>
                <span class="display-mode">
                    <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover;">
                </span>
                <div class="edit-mode" style="display:none;">
                    <input type="file" accept="image/*" onchange="previewImage(this, '${product.id}')" style="width: 120px;">
                    <img id="preview-${product.id}" src="${product.image}" style="width: 50px; height: 50px; object-fit: cover; margin-top: 5px;">
                </div>
            </td>
            <td>
                <span class="display-mode">${product.name}</span>
                <input type="text" class="edit-mode" value="${product.name}" style="display:none;">
            </td>
            <td>
                <span class="display-mode">${product.brand}</span>
                <input type="text" class="edit-mode" value="${product.brand}" style="display:none;">
            </td>
            <td>
                <span class="display-mode">¥${product.price}</span>
                <input type="number" class="edit-mode" value="${product.price}" style="display:none;">
            </td>
            <td>
                <span class="display-mode">${product.stock}</span>
                <input type="number" class="edit-mode" value="${product.stock}" style="display:none;">
            </td>
            <td>
                <div class="display-mode">
                    <button class="btn btn-info btn-sm" onclick="startEditProduct('${product.id}')">编辑</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">删除</button>
                </div>
                <div class="edit-mode" style="display:none;">
                    <button class="btn btn-success btn-sm" onclick="saveProduct('${product.id}')">确认</button>
                    <button class="btn btn-secondary btn-sm" onclick="cancelEditProduct('${product.id}')">取消</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 加载用户列表
function loadUsers() {
    const usersList = document.getElementById('usersList');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    usersList.innerHTML = users.map(user => `
        <tr id="user-${user.email}">
            <td>
                <span class="display-mode">${user.name || '未设置'}</span>
                <input type="text" class="edit-mode" value="${user.name || ''}" style="display:none;">
            </td>
            <td>
                <span class="display-mode">${user.email}</span>
                <input type="email" class="edit-mode" value="${user.email}" style="display:none;">
            </td>
            <td>${user.registerTime || '未知'}</td>
            <td>${user.status || '正常'}</td>
            <td>
                <div class="display-mode">
                    <button class="btn btn-info btn-sm" onclick="startEdit('${user.email}')">编辑</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.email}')">删除</button>
                    <button class="btn btn-warning btn-sm" onclick="resetPassword('${user.email}')">重置密码</button>
                </div>
                <div class="edit-mode" style="display:none;">
                    <button class="btn btn-success btn-sm" onclick="saveEdit('${user.email}')">确认</button>
                    <button class="btn btn-secondary btn-sm" onclick="cancelEdit('${user.email}')">取消</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 退出登录
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    window.location.href = 'account.html';
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();
    // 初始化商品数据
    if (!localStorage.getItem('products')) {
        const initialProducts = [
            {
                id: 'P1',
                name: 'Nike运动鞋',
                brand: 'Nike',
                price: 22541,
                stock: 100,
                image: 'images/11.png',
                description: 'Nike新款运动鞋'
            },
            {
                id: 'P2',
                name: 'Nike运动鞋',
                brand: 'Nike',
                price: 21888,
                stock: 100,
                image: 'images/12.png',
                description: 'Nike新款运动鞋'
            },
            {
                id: 'P3',
                name: 'Nike运动鞋',
                brand: 'Nike',
                price: 19999,
                stock: 100,
                image: 'images/13.png',
                description: 'Nike新款运动鞋'
            },
            {
                id: 'P4',
                name: 'Nike运动鞋',
                brand: 'Nike',
                price: 19888,
                stock: 100,
                image: 'images/14.png',
                description: 'Nike新款运动鞋'
            },
            {
                id: 'P5',
                name: '李宁运动鞋',
                brand: '李宁',
                price: 2588,
                stock: 100,
                image: 'images/15.png',
                description: '李宁新款运动鞋'
            },
            {
                id: 'P6',
                name: '李宁运动鞋',
                brand: '李宁',
                price: 2288,
                stock: 100,
                image: 'images/16.png',
                description: '李宁新款运动鞋'
            },
            {
                id: 'P7',
                name: '李宁运动鞋',
                brand: '李宁',
                price: 1888,
                stock: 100,
                image: 'images/17.png',
                description: '李宁新款运动鞋'
            },
            {
                id: 'P8',
                name: '李宁运动鞋',
                brand: '李宁',
                price: 1788,
                stock: 100,
                image: 'images/18.png',
                description: '李宁新款运动鞋'
            }
        ];
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }
    loadProducts();
    loadUsers();
});

// 开始编辑
function startEdit(userEmail) {
    const row = document.getElementById(`user-${userEmail}`);
    if (row) {
        // 隐藏显示模式，显示编辑模式
        row.querySelectorAll('.display-mode').forEach(el => el.style.display = 'none');
        row.querySelectorAll('.edit-mode').forEach(el => el.style.display = 'inline-block');
    }
}

// 取消编辑
function cancelEdit(userEmail) {
    const row = document.getElementById(`user-${userEmail}`);
    if (row) {
        // 显示显示模式，隐藏编辑模式
        row.querySelectorAll('.display-mode').forEach(el => el.style.display = 'inline-block');
        row.querySelectorAll('.edit-mode').forEach(el => el.style.display = 'none');
    }
}

// 保存编辑
function saveEdit(oldEmail) {
    const row = document.getElementById(`user-${oldEmail}`);
    if (!row) return;

    const newName = row.querySelector('input[type="text"]').value;
    const newEmail = row.querySelector('input[type="email"]').value;
    
    if (!newName || !newEmail) {
        const statusCell = row.querySelector('td:nth-child(4)');
        statusCell.textContent = '请填写完整信息';
        setTimeout(() => {
            statusCell.textContent = '正常';
        }, 3000);
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === oldEmail);
    
    if (user) {
        // 检查新邮箱是否已被其他用户使用
        if (newEmail !== oldEmail && users.some(u => u.email === newEmail)) {
            const statusCell = row.querySelector('td:nth-child(4)');
            statusCell.textContent = '该邮箱已被使用';
            setTimeout(() => {
                statusCell.textContent = '正常';
            }, 3000);
            return;
        }
        
        user.name = newName;
        user.email = newEmail;
        localStorage.setItem('users', JSON.stringify(users));
        
        // 显示成功信息
        const statusCell = row.querySelector('td:nth-child(4)');
        statusCell.textContent = '更新成功';
        setTimeout(() => {
            loadUsers(); // 3秒后重新加载用户列表
        }, 3000);
    }
}

// 重置用户密码
function resetPassword(userEmail) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === userEmail);
    
    if (user) {
        const newPassword = '123456'; // 默认密码
        user.password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        
        // 显示重置成功信息
        const row = document.getElementById(`user-${userEmail}`);
        const statusCell = row.querySelector('td:nth-child(4)');
        const originalStatus = statusCell.textContent;
        statusCell.textContent = '密码已重置为：123456';
        
        // 3秒后恢复原状态显示
        setTimeout(() => {
            statusCell.textContent = originalStatus;
        }, 3000);
    }
}

// 删除用户
function deleteUser(userEmail) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.filter(u => u.email !== userEmail);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadUsers(); // 重新加载用户列表
}

// 显示添加用户表单
function showAddUserForm() {
    $('#addUserModal').modal('show');
}

// 添加新用户
function addNewUser() {
    const name = document.getElementById('newUserName').value;
    const email = document.getElementById('newUserEmail').value;
    const password = document.getElementById('newUserPassword').value;

    if (!name || !email || !password) {
        alert('请填写完整信息！');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // 检查邮箱是否已存在
    if (users.find(u => u.email === email)) {
        alert('该邮箱已被注册！');
        return;
    }

    // 创建新用户
    const newUser = {
        id: 'U' + Date.now(),
        name: name,
        email: email,
        password: password,
        registerTime: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // 关闭模态框并重新加载用户列表
    $('#addUserModal').modal('hide');
    document.getElementById('addUserForm').reset();
    loadUsers();
    alert('用户添加成功！');
}

// 开始编辑商品
function startEditProduct(productId) {
    const row = document.getElementById(`product-${productId}`);
    if (row) {
        row.querySelectorAll('.display-mode').forEach(el => el.style.display = 'none');
        row.querySelectorAll('.edit-mode').forEach(el => el.style.display = 'inline-block');
    }
}

// 取消编辑商品
function cancelEditProduct(productId) {
    const row = document.getElementById(`product-${productId}`);
    if (row) {
        row.querySelectorAll('.display-mode').forEach(el => el.style.display = 'inline-block');
        row.querySelectorAll('.edit-mode').forEach(el => el.style.display = 'none');
    }
}

// 预览选择的图片
function previewImage(input, productId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(`preview-${productId}`).src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// 修改保存商品函数
function saveProduct(productId) {
    const row = document.getElementById(`product-${productId}`);
    if (!row) return;

    const fileInput = row.querySelector('input[type="file"]');
    const newImage = fileInput.files.length > 0 ? 
        document.getElementById(`preview-${productId}`).src : 
        row.querySelector('.display-mode img').src;
    const newName = row.querySelectorAll('input')[1].value;
    const newBrand = row.querySelectorAll('input')[2].value;
    const newPrice = row.querySelectorAll('input')[3].value;
    const newStock = row.querySelectorAll('input')[4].value;
    
    if (!newName || !newBrand || !newPrice || !newStock) {
        const statusCell = row.querySelector('td:nth-child(4)');
        statusCell.textContent = '请填写完整信息';
        setTimeout(() => {
            statusCell.textContent = newStock;
        }, 3000);
        return;
    }

    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id === productId);
    
    if (product) {
        product.image = newImage;
        product.name = newName;
        product.brand = newBrand;
        product.price = parseFloat(newPrice);
        product.stock = parseInt(newStock);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    }
}

// 修改添加商品函数
function addProduct() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const newProduct = {
        id: 'P' + Date.now(),
        name: '新商品',
        brand: '品牌',
        price: 0,
        stock: 0,
        image: 'images/default.png',
        description: '商品描述'
    };
    
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
    
    // 自动开始编辑新商品
    setTimeout(() => {
        startEditProduct(newProduct.id);
    }, 100);
}

// 删除商品
function deleteProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = products.filter(p => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    // 更新products.html页面的商品显示
    updateProductsDisplay();
    loadProducts();
}

// 更新products.html页面的商品显示
function updateProductsDisplay() {
    // 这个函数会在products.html页面加载时自动执行
    // 我们只需要确保localStorage中的products数据是正确的
    // products.html页面会从localStorage读取数据来显示商品
} 