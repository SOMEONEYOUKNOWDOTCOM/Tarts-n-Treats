const cakes = [
    {
        name: "Chocolate Dream Cake",
        description: "Rich, moist chocolate cake with layers of chocolate ganache and fresh cream",
        price: "$45"
    },
    {
        name: "Vanilla Bean Sponge",
        description: "Light and fluffy vanilla cake with real vanilla bean speckles and buttercream",
        price: "$35"
    },
    {
        name: "Red Velvet Classic",
        description: "Classic red velvet cake with cream cheese frosting and a hint of cocoa",
        price: "$40"
    },
    {
        name: "Lemon Drizzle Cake",
        description: "Zesty lemon cake with a sweet drizzle glaze and fresh lemon curd filling",
        price: "$38"
    },
    {
        name: "Carrot Walnut Cake",
        description: "Moist carrot cake with walnuts, raisins, and cream cheese frosting",
        price: "$42"
    },
    {
        name: "Black Forest Gateau",
        description: "German chocolate cake with cherries, whipped cream, and chocolate shavings",
        price: "$48"
    }
];

const pastries = [
    {
        name: "Classic Croissant",
        description: "Buttery, flaky croissant baked to golden perfection",
        price: "$6"
    },
    {
        name: "Fruit Tart",
        description: "Fresh seasonal fruits on vanilla custard in a crisp pastry shell",
        price: "$8"
    },
    {
        name: "Chocolate Éclair",
        description: "Choux pastry filled with cream and topped with chocolate icing",
        price: "$7"
    },
    {
        name: "Apple Danish",
        description: "Flaky pastry with cinnamon-spiced apples and vanilla glaze",
        price: "$6"
    },
    {
        name: "Almond Croissant",
        description: "Croissant filled with almond cream and topped with sliced almonds",
        price: "$8"
    },
    {
        name: "Berry Mille-Feuille",
        description: "Layers of puff pastry with fresh berries and vanilla cream",
        price: "$9"
    }
];

const contactInfo = {
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
            <div class="product-price">${cake.price}</div>
        `;
        card.onclick = () => showContact();
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
            <div class="product-price">${pastry.price}</div>
        `;
        card.onclick = () => showContact();
        productsContainer.appendChild(card);
    });
    
    productsSection.style.display = 'block';
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

function showContact() {
    const contactSection = document.getElementById('contactSection');
    const addressText = document.getElementById('addressText');
    const phoneText = document.getElementById('phoneText');
    const accountText = document.getElementById('accountText');
    
    // Create input fields for address and phone
    addressText.innerHTML = `<input type="text" id="addressInput" placeholder="Enter your address" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">`;
    phoneText.innerHTML = `<input type="tel" id="phoneInput" placeholder="Enter your phone number" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">`;
    accountText.textContent = contactInfo.account;
    
    contactSection.style.display = 'block';
}

function closeContact() {
    const contactSection = document.getElementById('contactSection');
    contactSection.style.display = 'none';
    
    // Save the entered values
    const addressInput = document.getElementById('addressInput');
    const phoneInput = document.getElementById('phoneInput');
    
    if (addressInput) {
        contactInfo.address = addressInput.value;
    }
    if (phoneInput) {
        contactInfo.phone = phoneInput.value;
    }
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
