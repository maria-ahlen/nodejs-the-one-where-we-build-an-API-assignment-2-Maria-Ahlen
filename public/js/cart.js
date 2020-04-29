// Show products in cart
function cartInfo(items) { 
    let cartItems = document.querySelector('#cartItems');
    cartItems.innerHTML = '';

    for(item of items) {
        let itemElem = document.createElement('div');
        itemElem.classList.add('item');
        itemElem.innerHTML += 
            '<p>Name: ' + item.Name + '</p>' + 
            '<p>Type: ' + item.Type + '</p>' + 
            '<p>Price: ' + item.Price + '</p>' + 
            '<p>Size: ' + item.Size + '</p>' + 
            '<img src="'+ item.imgUrl +'">' + 
            '<button class="deleteButton" value='+ item.id +'>Delete</button>';
        
        cartItems.append(itemElem);
    }   
    deleteFromCart();
}

async function getCart() {
    const url = 'http://localhost:8000/cart';
    const response = await fetch(url, {method: 'GET'});
    const data = await response.json();
    cartInfo(data);
}

getCart();



// Remove product from cart
async function deleteItem(id) {
    const url = `http://localhost:8000/cart/deleteproduct/${id}`;
    const response = await fetch(url, {method: 'DELETE'});
    const data = await response.json();
}

function deleteFromCart() {
    let deleteButton = document.querySelectorAll('.deleteButton');

    for(let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', () => {
            deleteItem(deleteButton[i].value);
            getCart();
        });
    }
}