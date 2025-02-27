// 从localStorage加载商品数据并显示
function loadProductsFromStorage() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    // 只显示有库存的商品
    const availableProducts = products.filter(product => product.stock > 0);
    const productContainer = document.querySelector('.product-one');
    const productContainer2 = document.querySelector('.product-one:nth-child(2)');
    const productContainer3 = document.querySelector('.product-one:nth-child(3)');
    
    // 清空所有商品容器
    if (productContainer) {
        productContainer.innerHTML = '';
    }
    if (productContainer2) {
        productContainer2.innerHTML = '';
    }
    if (productContainer3) {
        productContainer3.innerHTML = '';
    }
    
    // 只显示第一个容器的商品
    if (productContainer && availableProducts.length > 0) {
        let html = '';
        availableProducts.forEach((product, index) => {
            if(product.stock > 0) {  // 再次确认库存
                html += `
                    <div class="col-md-4 product-left single-left"> 
                        <div class="p-one simpleCart_shelfItem">
                            <a href="single.html?name=${product.name}&price=${product.price}">
                                <img src="${product.image}" alt="" />
                                <div class="mask mask1">
                                    <span>快速查看</span>
                                </div>
                            </a>
                            <h4>${product.name}</h4>
                            <p><a class="item_add" href="#"><i></i> <span class="item_price">¥${product.price}</span></a></p>
                        </div>
                    </div>
                `;
                
                // 每3个商品添加一个clearfix
                if ((index + 1) % 3 === 0) {
                    html += '<div class="clearfix"></div>';
                }
            }
        });
        
        productContainer.innerHTML = html;
    }
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', loadProductsFromStorage); 