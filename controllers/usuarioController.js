

class UsuarioController {

    loginView(req, res) {
        res.render('usuario/login');
    }
    cadastroView(req, res) {
        res.render('usuario/cadastro');
    }
}

module.exports = UsuarioController;