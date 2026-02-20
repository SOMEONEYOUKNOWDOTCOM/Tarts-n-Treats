const cakes = [
    {
        id: 'cake1',
        name: "Chocolate Dream Cake",
        description: "Rich, moist chocolate cake with layers of chocolate ganache and fresh cream",
        price: 45
    },
    {
        id: 'cake2',
        name: "Vanilla Bean Sponge",
        description: "Light and fluffy vanilla cake with real vanilla bean speckles and buttercream",
        price: 35
    },
    {
        id: 'cake3',
        name: "Red Velvet Classic",
        description: "Classic red velvet cake with cream cheese frosting and a hint of cocoa",
        price: 40
    },
    {
        id: 'cake4',
        name: "Lemon Drizzle Cake",
        description: "Zesty lemon cake with a sweet drizzle glaze and fresh lemon curd filling",
        price: 38
    },
    {
        id: 'cake5',
        name: "Carrot Walnut Cake",
        description: "Moist carrot cake with walnuts, raisins, and cream cheese frosting",
        price: 42
    },
    {
        id: 'cake6',
        name: "Black Forest Gateau",
        description: "German chocolate cake with cherries, whipped cream, and chocolate shavings",
        price: 48
    }
];

const pastries = [
    {
        id: 'pastry1',
        name: "Classic Croissant",
        description: "Buttery, flaky croissant baked to golden perfection",
        price: 6
    },
    {
        id: 'pastry2',
        name: "Fruit Tart",
        description: "Fresh seasonal fruits on vanilla custard in a crisp pastry shell",
        price: 8
    },
    {
        id: 'pastry3',
        name: "Chocolate Éclair",
        description: "Choux pastry filled with cream and topped with chocolate icing",
        price: 7
    },
    {
        id: 'pastry4',
        name: "Apple Danish",
        description: "Flaky pastry with cinnamon-spiced apples and vanilla glaze",
        price: 6
    },
    {
        id: 'pastry5',
        name: "Almond Croissant",
        description: "Croissant filled with almond cream and topped with sliced almonds",
        price: 8
    },
    {
        id: 'pastry6',
        name: "Berry Mille-Feuille",
        description: "Layers of puff pastry with fresh berries and vanilla cream",
        price: 9
    }
];

let cart = [];

const contactInfo = {
    name: "",
    address: "",
    phone: "",
    account: "ACC-BAKERY-2024-789"
};

function showCakes() {
    const productsSection = document.getElementById('productsSection');
    const productsContainer = document.getElementById('productsContainer');
    
    productsContainer.innerHTML = '';
    
    cakes.forEach(cake => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${cake.name}</h3>
            <p>${cake.description}</p>
            <div class="product-price">$${cake.price}</div>
            <button class="btn btn-buy" onclick="addToCart('${cake.id}')">Buy</button>
        `;
        productsContainer.appendChild(card);
    });
    
    productsSection.style.display = 'block';
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

function showPastries() {
    const productsSection = document.getElementById('productsSection');
    const productsContainer = document.getElementById('productsContainer');
    
    productsContainer.innerHTML = '';
    
    pastries.forEach(pastry => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${pastry.name}</h3>
            <p>${pastry.description}</p>
            <div class="product-price">$${pastry.price}</div>
            <button class="btn btn-buy" onclick="addToCart('${pastry.id}')">Buy</button>
        `;
        productsContainer.appendChild(card);
    });
    
    productsSection.style.display = 'block';
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

function addToCart(productId) {
    const allProducts = [...cakes, ...pastries];
    const product = allProducts.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartUI();
        showNotification(`${product.name} added to cart!`);
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total}`;
    }
}

function showCart() {
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalAmount.textContent = '$0';
    } else {
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity} = $${itemTotal}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="btn-quantity" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="btn-quantity" onclick="updateQuantity('${item.id}', 1)">+</button>
                    <button class="btn-remove" onclick="removeFromCart('${item.id}')">×</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        cartTotalAmount.textContent = `$${total}`;
    }
    
    cartModal.style.display = 'block';
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
            showCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showCart();
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'none';
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    closeCart();
    showCheckout();
}

function showCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.style.display = 'block';
}

function closeCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.style.display = 'none';
}

function processPayment() {
    const nameInput = document.getElementById('checkoutName');
    const addressInput = document.getElementById('checkoutAddress');
    const phoneInput = document.getElementById('checkoutPhone');
    
    if (!nameInput.value || !addressInput.value || !phoneInput.value) {
        showNotification('Please fill in all contact information!');
        return;
    }
    
    // Save contact info
    contactInfo.name = nameInput.value;
    contactInfo.address = addressInput.value;
    contactInfo.phone = phoneInput.value;
    
    // Process order
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    showNotification(`Order placed successfully! Total: $${total}`);
    
    // Clear cart and close modals
    cart = [];
    updateCartUI();
    closeCheckout();
    
    // Show order summary
    showOrderSummary();
}

function showOrderSummary() {
    const orderModal = document.getElementById('orderModal');
    const orderDetails = document.getElementById('orderDetails');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    orderDetails.innerHTML = `
        <h3>Thank you for your order!</h3>
        <p><strong>Name:</strong> ${contactInfo.name}</p>
        <p><strong>Address:</strong> ${contactInfo.address}</p>
        <p><strong>Phone:</strong> ${contactInfo.phone}</p>
        <p><strong>Account:</strong> ${contactInfo.account}</p>
        <p><strong>Total Paid:</strong> $${total}</p>
        <p class="order-confirmation">Your order has been received and will be delivered soon!</p>
    `;
    
    orderModal.style.display = 'block';
}

function closeOrderSummary() {
    const orderModal = document.getElementById('orderModal');
    orderModal.style.display = 'none';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    const bubbles = document.querySelectorAll('.bubble');
    
    bubbles.forEach(bubble => {
        const randomDelay = Math.random() * 15;
        const randomDuration = 15 + Math.random() * 10;
        bubble.style.animationDelay = `${randomDelay}s`;
        bubble.style.animationDuration = `${randomDuration}s`;
    });
    
    document.addEventListener('click', function(event) {
        if (event.target === document.getElementById('contactSection')) {
            closeContact();
        }
    });
});
