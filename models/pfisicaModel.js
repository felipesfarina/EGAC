const pessoaModel = require('../models/pessoaModel');
const Database = require('../utils/database');

class pfisicaModel extends pessoaModel{
    #cpf;
    #email;
    #senha;

    set cpf(valor){ this.#cpf}
    get cpf(){return this.#cpf}
    set email(valor){ this.#email}
    get email(){return this.#email}
    set senha(valor){ this.#senha}
    get senha(){return this.#senha}

    constructor(id,nome, telefone, cpf, email, senha){
        super(id,nome,telefone);
        this.#cpf = cpf;
        this.#email = email;
        this.#senha = senha;
    }

    async cadastrar(){
        const banco = new Database;

        let sql = 'start transaction;'
        await banco.ExecutaComandoNonQuery(sql);

        sql = 'insert into tb_Pessoa(pessoa_nome, pessoa_telefone) values(?,?);'
        let valores = [this.nome, this.telefone];
        await banco.ExecutaComandoNonQuery(sql,valores);

        sql = 'set @last_id = last_insert_id();'
        await banco.ExecutaComandoNonQuery(sql);

        sql = 'insert into tb_PFisica(PF_id, PF_cpf, PF_email, PF_senha) values(@last_id,?,?,?);'
        valores = [this.cpf,this.email, this.senha];
        let result = await banco.ExecutaComandoNonQuery(sql,valores);

        sql = 'commit;'
        await banco.ExecutaComandoNonQuery(sql);
        
        console.log(result);
    }
}
module.exports = pfisicaModel;
