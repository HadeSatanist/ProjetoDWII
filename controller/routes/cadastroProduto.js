const produtoBanco = require('../../model/repositories/produto-bd');
module.exports = function (app) {
    app.post('/produto', async (req, res) => {
        mensagem = {};
        try {
            const produto = {
                nome: req.body.nome,
                estoque_maximo: req.body.estoque_maximo,
                estoque_minimo: req.body.estoque_minimo
            }
            await produtoBanco.insertProduto(produto);
            mensagem = {tipo: 'sucesso', texto: 'Cadastro'};
        } catch (error) {
            mensagem = {tipo: 'erro', texto: 'Erro no Produto cadastrado'};
        } finally {
            const produtos = await produtoBanco.selectProduto();
            res.render('produto/index', {
                title: 'Cadastro',
                mensagem,
                produtos
            });
        }
    });

    app.get('/produto', async (req, res) => {
        const produtos = await produtoBanco.selectProduto();
        res.render('produto/index', {title: 'CadastroProduto', mensagem: null, produtos});
    });
}
/*const produtoBanco = require('../../model/repositories/produto-bd');
module.exports = function (app) {
    app.post('/produto', async (req, res) => {
        produtoBanco
            .insertProduto({nome: req.body.nome, estoque_maximo: req.body.estoque_maximo, estoque_minimo: req.body.estoque_minimo, })
            .then(() => {
                console.log('Sucesso')
                res.render('Cadastro', {title: 'Cadastro', mensagem: 'Produto Cadastrado com sucesso'});
            })
            .catch(() => {
                console.log('Erro')
                res.render('Cadastro', {title: 'Cadastro', mensagem: 'Erro no cadastrado'});
            });
    });

    app.get('/produto', async(req, res) => {
        const produtos = await produtoBanco.selectProduto();
        res.render('produto/index', {title: 'Cadastro', mensagem: null, produtos});
    });
}
*/


