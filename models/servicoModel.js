const Database = require("../utils/database");

class ServicoModel{
    #id;
    #nome;
    #preco;
    #descricao;

    set id(valor){this.#id = valor};
    get id(){return this.#id};
    set nome(valor){this.#nome = valor};
    get nome(){return this.#nome};
    set preco(valor){this.#preco = valor};
    get preco(){return this.#preco};
    set descricao(valor){this.#descricao = valor};
    get descricao(){return this.#descricao};

    constructor(id,nome,preco,descricao){
        this.#id = id;
        this.#nome = nome;
        this.#preco = preco;
        this.#descricao = descricao;
    }

    async cadastrar(){
        const sql = 'insert into tb_Servico(serv_nome,serv_preco,serv_descricao) values(?,?,?)';
        const valores = [this.#nome, this.#preco, this.#descricao];
        const banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }

    async listar(){
        const sql ='select * from tb_Servico';
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql);
        
        let lista = [];
        for(let i=0; i<rows.length;i++){
            lista.push(new ServicoModel(rows[i]['serv_id'], rows[i]['serv_nome'], rows[i]['serv_preco'], rows[i]['serv_descricao']));
        }

        return lista;
    }

    async buscarId(id){
        const sql ='select * from tb_Servico where serv_id = ?';
        const valores = [id];
        const banco = new Database();
        
        const row = await banco.ExecutaComando(sql,valores);
        let servico = new ServicoModel(row['0']['serv_id'], row['0']['serv_nome'], row['0']['serv_preco'], row['0']['serv_descricao']);
        return servico;
    }

    async alterar(){
        const sql = 'update tb_Servico set serv_nome = ?, serv_preco = ?, serv_descricao = ? where serv_id = ?';
        const valores = [this.#nome, this.#preco, this.#descricao, this.#id];
        const banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }

    async excluir(id){
        const sql = 'delete from tb_Servico where serv_id = ?';
        const valores = [id];
        const banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }
}

module.exports = ServicoModel;