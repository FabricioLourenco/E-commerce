document.addEventListener('DOMContentLoaded', function () {
    carregarCarrinho();
});

function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let carrinhoDiv = document.getElementById('carrinho');
    let detalhesProdutosDiv = document.getElementById('detalhes-produtos');
    carrinhoDiv.innerHTML = '';
    detalhesProdutosDiv.innerHTML = ''; // Limpa os detalhes de produtos antes de atualizar

    if (carrinho.length === 0) {
        carrinhoDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
        document.getElementById('total-final').innerText = 'Total Final: R$ 0,00';
    } else {
        let totalFinal = 0;
        carrinho.forEach(function (produto, index) {
            let totalProduto = produto.price * produto.quantity;
            totalFinal += totalProduto;
            let produtoDiv = document.createElement('div');
            produtoDiv.className = 'cart-item product-card'; // Adicionado 'product-card' para usar o mesmo estilo
            produtoDiv.innerHTML = `
                <img src="${produto.image}" alt="Imagem do Produto" class="cart-item-image product-image">
                <div class="cart-item-details product-details">
                    <h2 class="cart-item-name product-name">${produto.name}</h2>
                    <p class="cart-item-price product-price">R$ ${produto.price}</p>
                    <p class="cart-item-stock product-stock">Estoque: ${produto.stock}</p>
                    <label>Quantidade: <input type="number" min="1" max="${produto.stock}" value="${produto.quantity}" onchange="atualizarQuantidade(${index}, this.value)"></label>
                    <p class="cart-item-total">Total: R$ ${totalProduto.toFixed(2)}</p>
                    <button class="remove-from-cart" onclick="removerDoCarrinho(${index})">Remover</button>
                </div>
            `;
            carrinhoDiv.appendChild(produtoDiv);

            // Adiciona detalhes do produto na seção de detalhes
            let detalhesProduto = document.createElement('div');
            detalhesProduto.innerHTML = `
                <p>${produto.name} - Total: R$ ${totalProduto.toFixed(2)}</p>
            `;
            detalhesProdutosDiv.appendChild(detalhesProduto);
        });

        document.getElementById('total-final').innerText = `Total Final: R$ ${totalFinal.toFixed(2)}`;
    }
}

function atualizarQuantidade(index, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho[index].quantity = parseInt(quantidade);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho(); // Atualiza a visualização do carrinho
}

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1); // Remove o item do array
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho(); // Atualiza a visualização do carrinho
}

function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    // Aqui você pode adicionar a lógica para processar a compra, como enviar os dados para um servidor

    // Limpa o carrinho após a compra ser finalizada
    localStorage.removeItem('carrinho');
    alert('Compra finalizada com sucesso!');
    carregarCarrinho(); // Atualiza a visualização do carrinho
}
