// script.js

// --------------------------
// Ajouter au panier
// --------------------------
function addToCart(name, price, sold = false) {
  if (sold) {
    alert("⚠️ Cette œuvre est déjà vendue !");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Vérifie si l'œuvre est déjà dans le panier
  let exists = cart.find((item) => item.name === name);
  if (exists) {
    alert("⚠️ Cette œuvre est déjà dans votre panier");
    return;
  }

  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("✅ " + name + " ajouté au panier !");
  updateButton(name);
}

// --------------------------
// Mettre à jour le bouton après ajout au panier
// --------------------------
function updateButton(name) {
  let btn = document.querySelector(`[onclick*="${name}"]`);
  if (btn) {
    btn.innerText = "Déjà dans le panier";
    btn.disabled = true;
    btn.classList.remove("btn-dark");
    btn.classList.add("btn-secondary");
  }
}

// --------------------------
// Vérifie au chargement si des œuvres sont déjà dans le panier
// --------------------------
function checkCartButtons() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach((item) => {
    updateButton(item.name);
  });
}

// --------------------------
// Supprimer une œuvre du panier
// --------------------------
function removeFromCart(name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.name !== name);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("🗑️ " + name + " supprimé du panier");
  // Mettre à jour les boutons dans la galerie
  let btn = document.querySelector(`[onclick*="${name}"]`);
  if (btn) {
    btn.innerText = "Ajouter au panier";
    btn.disabled = false;
    btn.classList.remove("btn-secondary");
    btn.classList.add("btn-dark");
  }
}

// --------------------------
// Calculer le total du panier
// --------------------------
function getCartTotal() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((sum, item) => sum + item.price, 0);
}

// --------------------------
// Affiche le panier dans une page panier.html
// --------------------------
function displayCart(containerId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Votre panier est vide 🛒</p>";
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.classList.add(
      "mb-3",
      "d-flex",
      "justify-content-between",
      "align-items-center",
    );

    row.innerHTML = `
      <span>${item.name} - ${item.price}€</span>
      <button class="btn btn-sm btn-danger">Supprimer</button>
    `;

    row.querySelector("button").addEventListener("click", () => {
      removeFromCart(item.name);
      displayCart(containerId);
    });

    container.appendChild(row);
  });

  // Total
  const totalRow = document.createElement("div");
  totalRow.classList.add("mt-3", "fw-bold");
  totalRow.innerText = `Total : ${getCartTotal()}€`;
  container.appendChild(totalRow);
}

// --------------------------
// Au chargement de chaque page
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
  checkCartButtons();
});
