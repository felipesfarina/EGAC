const categoriaModel = require('../models/categoriaModel');

class categoriaController{

    // TIPO 1 = PRODUTO
    // TIPO 2 = INSUMO
    // TIPO 3 = EQUIPAMENTO AGRICOLA
    // TIPO 4 = categoria
    // TIPO 5 = SERVIÇO

    async cadastrarView(req,res){
        res.render('admin/cadastrarCategoria', {layout: 'layout_admin'});
    }
    async cadastrar(req,res){
        const nome = req.body.nome;

        const categoria = new categoriaModel(null,nome);
        const result = await categoria.cadastrar();

        if(result)
            res.send({msg: 'Categoria cadastrada com Sucesso!'});
        else
            res.send({msg: 'Erro ao cadastrar Categoria!'});
    }

    async alterar(req,res){
        const categoria = new categoriaModel(req.body.id,req.body.nome);
        const result = await categoria.alterar();
        
        if(result)
            res.send({msg: 'Categoria alterada com Sucesso!'});
        else
            res.send({msg: 'Erro ao alterar Categoria!'});
    }

    async excluir(req,res) {
        const categoria = new categoriaModel(req.body.id,req.body.nome);

        if(await categoria.verificarChild()){
            console.log('não pode excluir, existem produtos vinculados');
            res.send({msg: 'Não é possível excluir esta categoria, existem produtos vinculados a ela!'});
        }

        const result = await categoria.excluir();

        if(result) 
            res.send({msg: 'Categoria excluída com Sucesso!'});
        else
            res.send({msg: 'Erro ao excluir Categoria!'});
    }
}
module.exports = categoriaController;


