const funcionarioModel = require('../models/funcionarioModel')
class funcionarioController{

    async cadastrar(req,res){
        const nome = req.body.nome;
        const cpf = req.body.cpf;
        const telefone = req.body.telefone;
        const email = req.body.email;
        const senha = req.body.senha;
        const cargo = req.body.cargo;
        const tipo = 3;

        let func = new funcionarioModel(null, nome, telefone, tipo, email, senha, cpf, cargo);

        let ok = true;
        let msg;
        if(await func.procurarCpf()){
            ok = false;
            msg = 'Já existe um Usuário com este CPF!';
        }
        if(ok && await func.procurarEmail()){
            ok = false;
            msg = 'Já existe um Usuário com este Email!';
        }
        if(ok){
            let result = await func.cadastrar();
    
            if(result){
                ok = true;
                msg = 'Funcionário cadastrado com Sucesso!';
            }else{
                ok = false;
                msg = 'Erro ao cadastrar Funcionário!';
            }
        }
        res.send({ok, msg})
    }

    async logar(req,res){
        const email = req.body.email;
        const senha = req.body.senha;

        let func = new funcionarioModel(null,null,null,null,email,senha,null,null);
        func = await func.logar();
        if(func){
            res.cookie('FuncionarioEmail', func.email);
            res.cookie('FuncionarioSenha', func.senha);
            res.send({ok: true})
            // res.redirect('/');
        }
        else{res.send({ok: false})};
    }
}

module.exports = funcionarioController;