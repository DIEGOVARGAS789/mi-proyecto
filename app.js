document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    const rentButtons = document.querySelectorAll('.rent-button');
    const cartButton = document.getElementById('cart-button');
    const contactForm = document.getElementById('contactForm');

    function updateTotal(counterElement) {
        const countSpan = counterElement.querySelector('.count');
        const totalSpan = counterElement.parentElement.querySelector('.total');
        const priceElement = counterElement.parentElement.querySelector('.price');
        const price = parseInt(priceElement.getAttribute('data-price'));
        const count = parseInt(countSpan.textContent);
        const totalPrice = count * price;
        totalSpan.textContent = `Total: $${totalPrice.toLocaleString()}`;
    }

    function resetCounter(counterElement) {
        const countSpan = counterElement.querySelector('.count');
        const totalSpan = counterElement.parentElement.querySelector('.total');
        countSpan.textContent = '0';
        totalSpan.textContent = 'Total: $0';
    }

    counters.forEach(counter => {
        const minus = counter.querySelector('.minus');
        const plus = counter.querySelector('.plus');
        const countSpan = counter.querySelector('.count');
        let count = 0;

        minus.addEventListener('click', () => {
            if (count > 0) {
                count--;
                countSpan.textContent = count;
                updateTotal(counter);
            }
        });

        plus.addEventListener('click', () => {
            if (count < 20) {
                count++;
                countSpan.textContent = count;
                updateTotal(counter);
            }
        });

        updateTotal(counter);
        countSpan.textContent = count;
    });

    rentButtons.forEach(rentButton => {
        rentButton.addEventListener('click', function(event) {
            const car = rentButton.parentElement;
            const carName = car.querySelector('h3').textContent;
            const count = parseInt(car.querySelector('.count').textContent);
            const price = parseInt(car.querySelector('.price').getAttribute('data-price'));
            const carImage = car.querySelector('img').src;
            const pickupLocation = document.getElementById('pickupLocation').value;
            const pickupDate = document.getElementById('pickupDate').value;
            const pickupTime = document.getElementById('pickupTime').value;

            if (count > 0) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push({
                    name: carName,
                    count: count,
                    price: price,
                    image: carImage,
                    pickupLocation: pickupLocation,
                    pickupDate: pickupDate,
                    pickupTime: pickupTime,
                });
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount(); // Actualiza el contador del carrito
                alert(`Añadido ${count} día(s) de ${carName} al carrito.`);
                resetCounter(car.querySelector('.counter'));
            } else {
                alert('Debes seleccionar al menos un día.');
                event.preventDefault();
            }
        });
    });

    cartButton.addEventListener('click', function() {
        window.location.href = 'cartcompras.html';
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        counters.forEach(counter => {
            resetCounter(counter);
        });
        alert('Mensaje enviado correctamente.');
        contactForm.reset();
    });

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartButton.querySelector('#cart-count').textContent = cart.length;
    }

    updateCartCount(); // Inicializa el contador al cargar la página
});

window.onload = function() {
    const backToTopButton = document.getElementById("back-to-top");
    backToTopButton.style.display = "block";
};

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace

        window.scrollTo({
            top: 0, // Desplaza al inicio de la página
            behavior: 'smooth' // Desplazamiento suave
        });
    });

    // Opcional: Mostrar/ocultar el botón según la posición del scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) { // Mostrar después de 300px de scroll
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
});
