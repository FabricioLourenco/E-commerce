document.addEventListener('DOMContentLoaded', () => {
    fetch('../json/magic.json')
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
                    <button class="add-to-cart" data-product-id="${product.id}">Adicionar ao Carrinho</button>
                `;

                productList.appendChild(productCard);
            });

            // Adiciona evento de clique ao botão "Adicionar ao Carrinho"
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
});

function addToCart(event) {
    const productId = event.target.getAttribute('data-product-id');
    console.log(`Produto ID ${productId} adicionado ao carrinho`);
    // Aqui você pode adicionar a lógica para adicionar o produto ao carrinho
}
