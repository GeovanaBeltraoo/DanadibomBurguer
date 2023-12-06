let cartIcon = document.querySelector('.cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('.close-cart');

// Open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Cart working js
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Remove Items From Cart
    var cartContent = document.querySelector('.cart-content');
    cartContent.addEventListener('click', function (event) {
        if (event.target.classList.contains("cart-remove")) {
            removeCartItem(event);
        } else if (event.target.classList.contains("cart-quantity")) {
            quantityChanges(event);
        }
    });

    // Add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    // Buy button work
    document
        .getElementsByClassName('btn-buy')[0]
        .addEventListener('click', buyButtonClicked);
}

// Buy button
function buyButtonClicked() {
    alert('Seu pedido foi feito');
    var cartContent = document.querySelector('.cart-content');
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// Remove cart item
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.querySelector('.product-title').innerText;
    var price = shopProducts.querySelector('.price').innerText;
    var productImg = shopProducts.querySelector('.product-img').src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

// Quantity Changes
function quantityChanges(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.querySelector('.cart-content');
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert('Você já adicionou este item ao carrinho');
            return;
        }
    }

    var cartBoxContent = `
        <div class="cart-box">
            <img src="${productImg}" alt="amostra-img" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <!-- Remove Cart -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ff0000" class="cart-remove" height="16" width="14" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
        </div>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);
}

// Update Total
function updateTotal() {
    var cartContent = document.querySelector('.cart-content');
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector('.cart-price');
        var quantityElement = cartBox.querySelector('.cart-quantity');
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;

    document.querySelector('.total-price').innerText = "$" + total;
}