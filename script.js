document.getElementById("search-bar").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchProducts();
    }
});

let cartCount = 0;
let cartItems = [];

document.getElementById("cart-icon").addEventListener("click", () => {
    document.getElementById("cart-menu").classList.toggle("active");
});

document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("cart-menu").classList.remove("active");
});

function searchProducts() {
    let query = document.getElementById("search-bar").value;
    if (!query) return;

    fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        let container = document.getElementById("product-list");
        container.innerHTML = "";

        data.results.slice(0, 20).forEach((product) => {
          let card = document.createElement("div");
          card.classList.add("product-card");

          card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" />
            <p>${product.title}</p>
            <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
            <button class="add-to-cart">Adicionar ao Carrinho</button>
          `;

          let addToCartBtn = card.querySelector(".add-to-cart");
          addToCartBtn.addEventListener("click", () => addToCart(product));

          container.appendChild(card);
        });
      })
      .catch((error) => console.error("Erro ao buscar produtos:", error));
}

function addToCart(product) {
    cartCount++;
    cartItems.push(product);
    document.getElementById("cart-count").textContent = cartCount;
    updateCartMenu();
}

function updateCartMenu() {
    let cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";

    cartItems.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}">
            <div class="cart-item-info">
                <p>${item.title}</p>
                <p><strong>R$ ${item.price.toFixed(2)}</strong></p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">❌</button>
        `;
        cartList.appendChild(li);
    });
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    cartCount--;
    document.getElementById("cart-count").textContent = cartCount;
    updateCartMenu();
}

document.getElementById("login-btn").addEventListener("click", () => {
    alert("Login ainda não implementado!");
});
