const express = require("express");
const UsuarioController = require("../controllers/usuarioController");

const router = express.Router();

const usuarioController = new UsuarioController();
router.get('/login', usuarioController.loginView);
router.get('/cadastro', usuarioController.cadastroView);

module.exports = router;