const Database = require("../utils/database");

class produtoModel{
    #id;
    #tipo;
    #nome;
    #preco;
    #descricao

    set id(valor){this.#id = valor};
    get id(){return this.#id};
    set tipo(valor){this.#tipo = valor};
    get tipo(){return this.#tipo};
    set nome(valor){this.#nome = valor};
    get nome(){return this.#nome};
    set preco(valor){this.#preco = valor};
    get preco(){return this.#preco};
    set descricao(valor){this.#descricao = valor};
    get descricao(){return this.#descricao};

    constructor(id,tipo,nome,preco,descricao){
        this.#id = id;
        this.#tipo = tipo;
        this.#nome = nome;
        this.#preco = preco;
        this.#descricao = descricao;
    }
    async cadastrar(){
        const sql = 'insert into tb_Produto(prod_nome,prod_tipo,prod_preco,prod_descricao) values(?,?,?,?)';
        const valores = [this.#nome, this.#tipo, this.#preco, this.#descricao];
        const banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }

    async listar(){
        const sql ='select * from tb_Produto';
        const banco = new Database();
        const rows = await banco.ExecutaComando(sql);
        
        let lista = [];
        for(let i=0; i<rows.length;i++){
            lista.push(new produtoModel(rows[i]['prod_id'],rows[i]['prod_tipo'], rows[i]['prod_nome'], rows[i]['prod_preco'], rows[i]['prod_descricao'], ));
        }

        return lista;
    }

    async buscarId(id){
        const sql ='select * from tb_Produto where prod_id = ?';
        const valores = [id];
        const banco = new Database();
        
        const result = await banco.ExecutaComando(sql,valores);
        let prod = new produtoModel(result['0']['prod_id'], result['0']['prod_tipo'], result['0']['prod_nome'], result['0']['prod_preco'], result['0']['prod_descricao']);
        return prod;
    }

    async alterar(){
        const sql = 'update tb_Produto set prod_nome = ?, prod_tipo = ?, prod_preco = ?, prod_descricao = ? where prod_id = ?';
        const valores = [this.#nome,this.#tipo,this.#preco,this.#descricao, this.#id];
        const banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }

    async excluir(id){
        const sql = 'delete from tb_Produto where prod_id = ?';
        const valores = [id];
        const banco = new Database();

        let result = await banco.ExecutaComandoNonQuery(sql,valores);
        return result;
    }
}

module.exports = produtoModel;