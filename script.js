// ==========================================
// 1. GET ALL HTML ELEMENTS
// ==========================================
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

const cartBtn = document.getElementById("cartToggleBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");

const cartBadge = document.getElementById("cartBadge");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartTotalDisplay = document.getElementById("cartTotalDisplay");
const checkoutBtn = document.getElementById("checkoutBtn");

const addToCartBtns = document.querySelectorAll(".add-to-cart");
const filterBtns = document.querySelectorAll(".filter-btn");
const foodCards = document.querySelectorAll(".food-card");
const toast = document.getElementById("toast");

// Store cart items in an array
let cart = [];

// ==========================================
// 2. MOBILE MENU OPEN & CLOSE
// ==========================================
hamburgerBtn.addEventListener("click", () => {
  navbar.classList.toggle("open");
});

// Close navbar when any link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
  });
});

// ==========================================
// 3. CART SIDEBAR OPEN & CLOSE
// ==========================================
function openCart() {
  cartSidebar.classList.add("open");
  cartOverlay.classList.add("show");
}

function closeCart() {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("show");
}

cartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// ==========================================
// 4. CATEGORY FILTER (Pizza, Burgers, etc.)
// ==========================================
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 1. Highlight clicked button
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // 2. Filter food items
    const selectedCategory = btn.getAttribute("data-category");

    foodCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (selectedCategory === "all" || selectedCategory === cardCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ==========================================
// 5. ADD TO CART FUNCTIONALITY
// ==========================================
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));

    // Add item to the array
    cart.push({ name: name, price: price });

    // Refresh cart display
    renderCart();
    showToast(`Added ${name} to cart!`);
  });
});

// Render Cart items in HTML
function renderCart() {
  // Update badge counter
  cartBadge.innerText = cart.length;

  // Clear existing items
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalDisplay.innerText = "$0.00";
    return;
  }

  let total = 0;

  // Loop through items and add them to HTML
  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button onclick="removeItem(${index})">X</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  // Display new total price
  cartTotalDisplay.innerText = "$" + total.toFixed(2);
}

// Remove item from cart
window.removeItem = function (index) {
  cart.splice(index, 1); // remove 1 item at specified index
  renderCart();
};

// Checkout button
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Order placed successfully!");
  cart = [];
  renderCart();
  closeCart();
});

// Show small message toast
function showToast(msg) {
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}