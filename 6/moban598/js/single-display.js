document.addEventListener('DOMContentLoaded', function() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    if (!products.length) return;

    // 获取当前商品信息
    const urlParams = new URLSearchParams(window.location.search);
    const currentName = urlParams.get('name');
    const currentPrice = urlParams.get('price');

    // 设置当前商品图片
    const currentProduct = products.find(product => 
        product.name === currentName && product.price == currentPrice
    );
    if (currentProduct) {
        document.getElementById('product-image').src = currentProduct.image;
    }

    // 过滤掉当前商品
    let availableProducts = products.filter(product => 
        !(product.name === currentName && product.price == currentPrice)
    );

    // 随机打乱商品数组
    const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
    // 获取所有商品容器
    const containers = document.querySelectorAll('.p-one.simpleCart_shelfItem');

    // 填充6个商品
    containers.forEach((container, index) => {
        if (index < 6 && shuffled[index]) {
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
}); 