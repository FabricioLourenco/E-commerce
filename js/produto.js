document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch('../json/magic.json')
        .then(response => response.json())
        .then(data => {
            const product = data.products.find(p => p.id == productId);

            if (product) {
                document.getElementById('produto-imagem').src = product.image;
                document.getElementById('produto-nome').innerText = product.name;
                document.getElementById('produto-preco').innerText = `R$ ${product.price.toFixed(2)}`;
                document.getElementById('produto-descricao').innerText = product.description;
                document.getElementById('produto-estoque').innerText = `Estoque: ${product.stock}`;
                document.getElementById('adicionar-carrinho').addEventListener('click', () => {
                    addToCart(product);
                    showConfirmationMessage(`Produto "${product.name}" adicionado ao carrinho.`);
                });
            } else {
                console.error('Produto não encontrado.');
            }
        })
        .catch(error => console.error('Erro ao carregar os detalhes do produto:', error));
});

function addToCart(product) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const existingProductIndex = carrinho.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        carrinho[existingProductIndex].quantity += 1;
    } else {
        carrinho.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
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
