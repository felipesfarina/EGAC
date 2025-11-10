const CategoriaModel = require('../models/categoriaModel');

class HomeController {
    homeView(req, res) {
        res.render('home/home');
    }

    // renderiza cm as categorias do bd
    async shopView(req, res) {
        let categoriaModel = new CategoriaModel();              
        let listaCategorias = await categoriaModel.listar();    // busca as categorias cadastrada
        res.render('shop/shop', {listaCategorias: listaCategorias}); // categoria pra view
    }
    aboutView(req, res) {
        res.render('home/about');
    }
    blogView(req, res) {
        res.render('home/blog');
    }
    cartView(req, res) {
        res.render('shop/cart');
    }
    contactView(req, res) {
        res.render('home/contact');
    }
}
module.exports = HomeController;