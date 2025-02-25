// 清空购物车
function clearCart() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser) {
        // 清空localStorage中的购物车数据
        const cartKey = `cart_${currentUser.email}`;
        localStorage.setItem(cartKey, JSON.stringify({"items":[]}));
    }
    // 清空simpleCart显示
    simpleCart.empty();
}

// simpleCart配置
simpleCart({
    cartStyle: "div",
    
    // 标记是否正在加载购物车数据
    loading: false,
    
    // 设置商品属性
    data: {
        name: function(item) {
            // 从URL获取商品名称
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('name') || item.get('name') || '时尚鞋品';
        },
        price: function(item) {
            // 从URL获取商品价格
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('price') || item.get('price');
        },
        image: function(item) {
            // 获取当前商品图片
            const img = document.getElementById('product-image');
            return img ? img.src : item.get('image');
        }
    },
    
    // 在添加商品到购物车时保存到用户数据
    beforeAdd: function(item) {
        if(this.loading) return true;
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(!currentUser) {
            alert('请先登录');
            return false;
        }
        
        // 从URL获取商品信息
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        const price = urlParams.get('price');
        
        // 设置商品信息
        if(name) item.set('name', name);
        if(price) item.set('price', price);
        
        // 设置商品图片
        const img = document.getElementById('product-image');
        const imgSrc = img ? img.src : 'images/default.png';
        item.set('image', imgSrc);
        
        const cartKey = `cart_${currentUser.email}`;
        let userCart = JSON.parse(localStorage.getItem(cartKey) || '{"items":[]}');
        
        const existingItem = userCart.items.find(i => i.name === item.get('name'));
        if(existingItem) {
            existingItem.quantity += item.get('quantity');
            existingItem.image = imgSrc;  // 更新图片
        } else {
            userCart.items.push({
                name: item.get('name'),
                price: item.get('price'),
                quantity: item.get('quantity'),
                size: item.get('size'),
                image: imgSrc,
                image: item.get('image')
            });
        }
        
        localStorage.setItem(cartKey, JSON.stringify(userCart));
        return true;
    },
    
    // 在删除商品时同步更新用户数据
    beforeRemove: function(item) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(!currentUser) return true;
        
        const cartKey = `cart_${currentUser.email}`;
        let userCart = JSON.parse(localStorage.getItem(cartKey) || '{"items":[]}');
        userCart.items = userCart.items.filter(i => i.name !== item.get('name'));
        localStorage.setItem(cartKey, JSON.stringify(userCart));
        return true;
    },

    cartColumns: [
        { view: function(item, column) {
            return `
            <div class="cart-item">
                <div class="cart-sec simpleCart_shelfItem" style="display: flex; align-items: center; padding: 15px 20px;">
                    <div style="width: 25%;">
                        <img src="${item.get('image')}" class="img-responsive" alt="">
                    </div>
                    <div style="width: 20%;">
                        <h3><a href="single.html">${item.get('name')}</a></h3>
                        <div class="delivery">
                            <p>尺码: ${item.get('size')}</p>
                        </div>
                    </div>
                    <div style="width: 12%;">
                        <span class="price">¥${item.get('price')}</span>
                    </div>
                    <div style="width: 18%;">
                        <div class="quantity-controls">
                            <button onclick="decreaseQuantity(this)" class="qty-btn">-</button>
                            <input type="number" value="${item.quantity()}" min="1" onchange="updateQuantity(this)" class="qty-input">
                            <button onclick="increaseQuantity(this)" class="qty-btn">+</button>
                        </div>
                    </div>
                    <div style="width: 15%;">
                        <span class="subtotal">¥${item.get('price') * item.quantity()}</span>
                    </div>
                    <div style="width: 10%; text-align: right;">
                        <a href="javascript:;" class="simpleCart_remove">删除</a>
                    </div>
                </div>
            </div>`;
        }}
    ]
});

// 页面加载时检查并加载用户购物车
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser) {
        const cartKey = `cart_${currentUser.email}`;
        const userCart = JSON.parse(localStorage.getItem(cartKey) || '{"items":[]}');
        
        // 保存当前购物车中的商品
        const currentItems = [];
        simpleCart.items().forEach(item => {
            currentItems.push({
                name: item.get('name'),
                price: item.get('price'),
                quantity: item.get('quantity'),
                size: item.get('size'),
                image: item.get('image')
            });
        });
        
        simpleCart.empty();
        simpleCart.loading = true;
        
        // 先加载localStorage中的商品
        userCart.items.forEach(item => {
            simpleCart.add(item);
        });
        
        // 再加载当前页面中的商品（如果不在localStorage中）
        currentItems.forEach(item => {
            if(!userCart.items.find(i => i.name === item.name)) {
                simpleCart.add(item);
            }
        });
        
        simpleCart.loading = false;
    }
});

// 删除单个商品
function removeOneItem(btn, itemName) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser) {
        // 清空localStorage中的该商品数据
        const cartKey = `cart_${currentUser.email}`;
        let userCart = JSON.parse(localStorage.getItem(cartKey) || '{"items":[]}');
        userCart.items = userCart.items.filter(item => item.name !== itemName);
        localStorage.setItem(cartKey, JSON.stringify(userCart));
    }
    // 清空simpleCart中的该商品
    simpleCart.items().forEach(item => {
        if(item.get('name') === itemName) {
            item.remove();
        }
    });
} 