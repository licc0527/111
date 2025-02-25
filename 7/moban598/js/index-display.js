document.addEventListener('DOMContentLoaded', function() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    if (!products.length) return;

    // 随机打乱商品数组
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    
    // 获取商品容器
    const productContainer = document.querySelector('.product-one');
    if (!productContainer) return;
    
    // 清空容器
    productContainer.innerHTML = '';
    
    // 填充前8个商品
    for (let i = 0; i < 8 && i < shuffled.length; i++) {
        const product = shuffled[i];
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-3 product-left';
        
        productDiv.innerHTML = `
            <div class="p-one simpleCart_shelfItem">
                <a href="single.html?name=${product.name}&price=${product.price}">
                    <img src="${product.image}" alt="" />
                    <div class="mask">
                        <span>快速查看</span>
                    </div>
                </a>
                <h4>${product.name}</h4>
                <p><a class="item_add" href="#"><i></i> <span class="item_price">¥${product.price}</span></a></p>
            </div>
        `;
        
        productContainer.appendChild(productDiv);
        
        // 每4个商品添加一个clearfix
        if ((i + 1) % 4 === 0) {
            const clearfix = document.createElement('div');
            clearfix.className = 'clearfix';
            productContainer.appendChild(clearfix);
        }
    }

    // 处理两个"立即购买"按钮的随机跳转
    const buyButtons = document.querySelectorAll('.b-btn a');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // 随机选择一个商品
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            // 跳转到商品详情页
            window.location.href = `single.html?name=${randomProduct.name}&price=${randomProduct.price}`;
        });
    });
}); 