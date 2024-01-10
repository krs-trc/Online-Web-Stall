function showHome() {
  document.getElementById('home').style.display = 'block';
  document.getElementById('order').style.display = 'none';
  document.getElementById('menu').style.display = 'block';
  document.getElementById('about').style.display = 'block';
}

function showOrder() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('order').style.display = 'block';
  document.getElementById('menu').style.display = 'none';
  document.getElementById('about').style.display = 'none';
}

function openMenu(menuName) {
  var i, menuSections, menuLinks;
  menuSections = document.getElementsByClassName("menu-section");
  for (i = 0; i < menuSections.length; i++) {
    menuSections[i].style.display = "none";
  }
  menuLinks = document.getElementsByClassName("menu-options");
  for (i = 0; i < menuLinks.length; i++) {
    menuLinks[i].className = menuLinks[i].className.replace(" active", "");
  }
  document.getElementById(menuName).style.display = "block";
  event.currentTarget.className += " active";
}
document.getElementById("myLink").click();

let cartItems = [];
let cartTotal = 0;

function addItem(itemName, itemPrice, itemQuantity) {
  const item = {
    name: itemName,
    price: itemPrice,
    quantity: itemQuantity
  };
  cartItems.push(item);
  cartTotal += itemPrice * itemQuantity;

  displayCart();
}


function removeItem(index) {
  const removedItem = cartItems.splice(index, 1)[0];
  cartTotal -= removedItem.price;

  displayCart();
}

function displayCart() {
  const cartItemsElement = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  cartItemsElement.innerHTML = '';

  cartItems.forEach((item, index) => {
    const li = document.createElement('li');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = item.name;

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = item.quantity;
    quantityInput.min = '1';
    quantityInput.addEventListener('change', (event) => {
      updateItemQuantity(parseInt(event.target.value), index);
    });

    const priceSpan = document.createElement('span');
    priceSpan.textContent = `RM${(item.price * item.quantity).toFixed(2)}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => removeItem(index);

    li.appendChild(nameSpan);
    li.appendChild(quantityInput);
    li.appendChild(priceSpan);
    li.appendChild(deleteButton);

    cartItemsElement.appendChild(li);
  });

  cartTotalElement.textContent = cartTotal.toFixed(2);
}

function updateItemQuantity(newQuantity, index) {
  const oldQuantity = cartItems[index].quantity;
  cartItems[index].quantity = newQuantity;
  cartTotal += (newQuantity - oldQuantity) * cartItems[index].price;

  displayCart();
}

function addToCart(name, price, quantity) {
  const item = {
    name: name,
    price: price,
    quantity: quantity
  };
  cartItems.push(item);
  cartTotal += price * quantity;
  displayCart();
}

// Initial cart display
displayCart();
