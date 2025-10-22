const pfisicaModel = require ('../models/pfisicaModel');
const Database = require('../utils/database');
class funcionarioModel extends pfisicaModel{
    #id;
    #cargo;

    get id(){return this.#id}
    set id(value){this.#id = value}
    get cargo(){return this.#cargo}
    set cargo(value){this.#cargo = value}

    constructor(id,nome,telefone,cpf,email,senha,cargo){
        super(id,nome,telefone,cpf,email,senha)
        this.#cargo = cargo;
    }
    async cadastrar(){
        const banco = new Database;

        let sql = 'start transaction;'
        await banco.ExecutaComandoNonQuery(sql);

        sql = 'insert into tb_Pessoa(pessoa_nome, pessoa_telefone) values(?,?);'
        let valores = [this.nome, this.telefone];
        await banco.ExecutaComandoNonQuery(sql,valores);

        sql = 'set @last_id = last_insert_id();';
        await banco.ExecutaComandoNonQuery(sql);

        sql = 'insert into tb_PFisica(PF_id, PF_cpf,PF_email,PF_senha) values(@last_id,?,?,?);';
        valores = [this.cpf,this.email, this.senha];
        await banco.ExecutaComandoNonQuery(sql,valores);

        sql = 'insert into tb_Funcionario(func_id,func_cargo) values(@last_id,?);';
        valores = [this.#cargo];
        let result = await banco.ExecutaComandoNonQuery(sql,valores);

        sql = 'commit;'
        await banco.ExecutaComandoNonQuery(sql);

        return result
    }
}
module.exports = funcionarioModel;