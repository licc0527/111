document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取所有商品数据
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    if (!products.length) return;

    // 2. 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const currentName = urlParams.get('name');
    const currentPrice = urlParams.get('price');

    // 3. 获取当前商品
    const currentProduct = products.find(product => 
        product.name === currentName && product.price == currentPrice
    );

    // 4. 显示当前商品信息
    if (currentProduct) {
        // 设置商品图片
        const productImage = document.getElementById('product-image');
        if (productImage) {
            productImage.src = currentProduct.image;
        }

        // 设置商品名称
        const productName = document.getElementById('productName');
        if (productName) {
            productName.textContent = currentProduct.name;
        }

        // 设置商品价格
        const productPrice = document.querySelector('.item_price');
        if (productPrice) {
            productPrice.textContent = `¥${currentProduct.price}`;
        }
        
        // 更新库存状态
        const stockStatus = document.getElementById('stockStatus');
        if (stockStatus) {
            if (currentProduct.stock > 0) {
                stockStatus.textContent = `有货 (库存: ${currentProduct.stock})`;
                stockStatus.style.color = 'green';
                const addToCartBtn = document.querySelector('.item_add');
                if (addToCartBtn) {
                    addToCartBtn.style.pointerEvents = 'auto';
                    addToCartBtn.style.opacity = '1';
                }
            } else {
                stockStatus.textContent = '缺货';
                stockStatus.style.color = 'red';
                const addToCartBtn = document.querySelector('.item_add');
                if (addToCartBtn) {
                    addToCartBtn.style.pointerEvents = 'none';
                    addToCartBtn.style.opacity = '0.5';
                }
            }
        }
    }

    // 5. 处理推荐商品
    function displayRecommendedProducts() {
        // 过滤掉当前商品
        const availableProducts = products.filter(product => 
            !(product.name === currentName && product.price == currentPrice)
        );

        // 随机打乱商品数组
        const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());

        // 获取推荐商品容器
        const recommendContainer = document.querySelector('.you-might-like .product-one');
        if (!recommendContainer) return;

        // 生成推荐商品HTML
        let html = '';
        for (let i = 0; i < 6 && i < shuffled.length; i++) {
            const product = shuffled[i];
            html += `
                <div class="col-md-4 product-left single-left">
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
                </div>
            `;
            
            // 每3个商品添加一个clearfix
            if ((i + 1) % 3 === 0) {
                html += '<div class="clearfix"></div>';
            }
        }

        // 添加最后的clearfix
        html += '<div class="clearfix"></div>';
        
        // 设置HTML内容
        recommendContainer.innerHTML = html;
    }

    // 6. 执行推荐商品显示
    displayRecommendedProducts();
}); 