document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const jsonFiles = ['yugioh.json', 'pokemon.json', 'magic.json', 'DragonBall.json', 'digimon.json', 'diversos.json'];
    let productFound = false;

    const loadProductDetails = (file) => {
        return fetch(`../json/${file}`)
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
                    productFound = true;
                }
            })
            .catch(error => console.error(`Erro ao carregar os detalhes do produto do arquivo ${file}:`, error));
    };

    const loadAllProducts = async () => {
        for (const file of jsonFiles) {
            await loadProductDetails(file);
            if (productFound) break;
        }

        if (!productFound) {
            console.error('Produto não encontrado em nenhum dos arquivos JSON.');
        }
    };

    loadAllProducts();
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
