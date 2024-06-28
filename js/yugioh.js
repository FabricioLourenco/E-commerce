document.addEventListener('DOMContentLoaded', () => {
    fetch('../json/yugioh.json')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            data.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                productCard.innerHTML = `
                    <img src="${product.image}" alt="Imagem do Produto" class="product-image">
                    <h2 class="product-name">${product.name}</h2>
                    <div class="product-details">
                        <p class="product-price">R$ ${product.price}</p>
                        <p class="product-stock">Uni: ${product.stock}</p>
                    </div>
                    <button class="add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.image}" data-product-description="${product.description}" data-product-stock="${product.stock}">Adicionar ao Carrinho</button>
                `;

                productList.appendChild(productCard);
            });

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
});

function addToCart(event) {
    const button = event.target;
    const product = {
        id: button.getAttribute('data-product-id'),
        name: button.getAttribute('data-product-name'),
        price: button.getAttribute('data-product-price'),
        image: button.getAttribute('data-product-image'),
        description: button.getAttribute('data-product-description'),
        stock: button.getAttribute('data-product-stock'),
        quantity: 1
    };

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const existingProductIndex = carrinho.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        carrinho[existingProductIndex].quantity += 1;
    } else {
        carrinho.push(product);
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    showConfirmationMessage(`Produto "${product.name}" adicionado ao carrinho.`);
}

function showConfirmationMessage(message) {
    const confirmationMessage = document.createElement('div');
    confirmationMessage.className = 'confirmation-message';
    confirmationMessage.innerText = message;

    document.body.appendChild(confirmationMessage);

    setTimeout(() => {
        confirmationMessage.remove();
    }, 3000); // A mensagem será removida após 3 segundos
}
