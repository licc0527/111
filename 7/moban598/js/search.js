function handleSearch(event) {
    // 如果是回车键或者点击搜索按钮
    if (event.type === 'click' || event.keyCode === 13) {
        const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
        
        // 如果搜索词为空，不执行搜索
        if (!searchTerm) return;
        
        // 获取所有商品
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        
        // 搜索匹配的商品
        const results = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
        
        // 将搜索结果存储到sessionStorage
        sessionStorage.setItem('searchResults', JSON.stringify(results));
        
        // 跳转到搜索结果页面
        window.location.href = 'search-results.html';
    }
}

// 在搜索结果页面显示结果
function displaySearchResults() {
    const results = JSON.parse(sessionStorage.getItem('searchResults') || '[]');
    const container = document.querySelector('.product-one');
    
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = '<div class="col-md-12"><h3 style="text-align: center;">未找到相关商品</h3></div>';
        return;
    }
    
    let html = '';
    results.forEach(product => {
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
    });
    
    container.innerHTML = html;
} 