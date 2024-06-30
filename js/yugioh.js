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
                    <button class="view-details" data-product-id="${product.id}">Ver Detalhes do Produto</button>
                `;

                productList.appendChild(productCard);
            });

            document.querySelectorAll('.view-details').forEach(button => {
                button.addEventListener('click', event => {
                    const productId = event.target.getAttribute('data-product-id');
                    window.open(`produto.html?id=${productId}`, '_blank');
                });
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
});
