document.addEventListener('DOMContentLoaded', function () {

    var db = new PouchDB('reinotcg');
    var remoteCouch = 'http://127.0.0.1:5984/reinotcg';

    db.sync(remoteCouch, {
        live: true,
        retry: true
    }).on('change', function (info) {
        console.log('Mudança detectada: ', info);
    }).on('paused', function (err) {
        if (err) {
            console.error('Replicação pausada devido a um erro:', err);
            // Adicione lógica aqui para lidar com o erro de replicação
        } else {
            console.log('Replicação pausada (por exemplo, replicação atualizada, usuário ficou offline)');
        }
    }).on('active', function () {
        console.log('Replicação retomada (por exemplo, novas mudanças replicando, usuário voltou online)');
    }).on('denied', function (err) {
        console.error('Um documento falhou na replicação (por exemplo, devido a permissões): ', err);
    }).on('complete', function (info) {
        console.log('Replicação completa: ', info);
    }).on('error', function (err) {
        console.error('Ocorreu um erro não tratado: ', err);
    });


    // Funções de operações CRUD //

    function criarDocumento(id, titulo, conteudo) {
        db.put({
            _id: id,
            titulo: titulo,
            conteudo: conteudo
        }).then(function (response) {
            console.log('Documento criado: ', response);
        }).catch(function (err) {
            console.error('Erro ao criar documento: ', err);
        });
    }

    function lerDocumento(id) {
        db.get(id).then(function (doc) {
            console.log('Documento recuperado: ', doc);
        }).catch(function (err) {
            console.error('Erro ao recuperar documento: ', err);
        });
    }

    function atualizarDocumento(id, novoTitulo, novoConteudo) {
        db.get(id).then(function (doc) {
            doc.titulo = novoTitulo;
            doc.conteudo = novoConteudo;
            return db.put(doc);
        }).then(function (response) {
            console.log('Documento atualizado: ', response);
        }).catch(function (err) {
            console.error('Erro ao atualizar documento: ', err);
        });
    }

    function excluirDocumento(id) {
        db.get(id).then(function (doc) {
            return db.remove(doc);
        }).then(function (response) {
            console.log('Documento excluído: ', response);
        }).catch(function (err) {
            console.error('Erro ao excluir documento: ', err);
        });
    }

    // Função para carregar página HTML dinamicamente //

    function carregarPagina(pagina) {
        var mainContent = document.querySelector('.main-content');
        fetch(pagina)
            .then(response => response.text())
            .then(html => {
                mainContent.innerHTML = html;
                adicionarEventListenersFormularios();
            })
            .catch(error => console.error('Erro ao carregar página:', error));
    }

    // Adiciona event listeners aos formulários //

    function adicionarEventListenersFormularios() {
        var forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                var docId = form.querySelector('#docId').value;
                var titulo = form.querySelector('#titulo').value;
                var conteudo = form.querySelector('#conteudo').value;
                criarDocumento(docId, titulo, conteudo);
            });
        });
    }

    // Carregar a página inicial

    carregarPagina('pages/home.html');
});
