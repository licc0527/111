document.addEventListener('DOMContentLoaded', function() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    if (!products.length) return;

    // 随机打乱商品数组
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    // 获取所有商品容器
    const containers = document.querySelectorAll('.p-one.simpleCart_shelfItem');

    // 填充前8个商品
    containers.forEach((container, index) => {
        if (index < 8 && shuffled[index]) {
            const product = shuffled[index];
            container.innerHTML = `
                <a href="single.html?name=${product.name}&price=${product.price}">
                    <img src="${product.image}" alt="" />
                    <div class="mask">
                        <span>快速查看</span>
                    </div>
                </a>
                <h4>${product.name}</h4>
                <p><a class="item_add" href="#"><i></i> <span class="item_price">¥${product.price}</span></a></p>
            `;
        }
    });

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