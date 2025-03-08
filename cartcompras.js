document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');

    function displayCartItems() {
        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor
        let total = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.style.maxWidth = '100px';
            cartItem.appendChild(img);

            const itemDetails = document.createElement('div');

            const name = document.createElement('h3');
            name.textContent = item.name;
            itemDetails.appendChild(name);

            const count = document.createElement('p');
            count.textContent = `Cantidad: ${item.count} día(s)`;
            itemDetails.appendChild(count);

            const price = document.createElement('p');
            price.textContent = `Precio unitario: $${item.price.toLocaleString()}`;
            itemDetails.appendChild(price);

            const subtotal = document.createElement('p');
            subtotal.textContent = `Subtotal: $${(item.count * item.price).toLocaleString()}`;
            itemDetails.appendChild(subtotal);

            const pickupLocation = document.createElement('p');
            pickupLocation.textContent = `Local de retirada: ${item.pickupLocation}`;
            itemDetails.appendChild(pickupLocation);

            const pickupDate = document.createElement('p');
            pickupDate.textContent = `Fecha de recogida: ${item.pickupDate}`;
            itemDetails.appendChild(pickupDate);

            const pickupTime = document.createElement('p');
            pickupTime.textContent = `Hora de recogida: ${item.pickupTime}`;
            itemDetails.appendChild(pickupTime);

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-item');
            removeButton.dataset.index = index;
            removeButton.textContent = 'Eliminar';
            removeButton.setAttribute('aria-label', `Eliminar ${item.name} del carrito`); // Mejora de accesibilidad
            itemDetails.appendChild(removeButton);

            cartItem.appendChild(itemDetails);
            cartItemsContainer.appendChild(cartItem);
            total += item.count * item.price;
        });

        totalAmount.textContent = `$${total.toLocaleString()}`;

        // Agregar event listeners a los botones de eliminación
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                cartItems.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                displayCartItems(); // Volver a mostrar los elementos
            });
        });
    }

    displayCartItems(); // Mostrar los elementos iniciales

    // Manejar el evento de finalizar la compra
    document.getElementById('checkout-button').addEventListener('click', function() {
        const customerForm = document.getElementById('customerForm');
        if (customerForm.checkValidity()) {
            alert('Compra finalizada. ¡Gracias!');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        } else {
            alert('Por favor, complete la información del cliente.');
        }
    });
});
