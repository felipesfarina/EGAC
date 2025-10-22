
class pessoaModel{
    #id;
    #nome;
    #telefone;

    set id(valor){ this.#id}
    get id(){return this.#id}
    set nome(valor){ this.#nome}
    get nome(){return this.#nome}
    set telefone(valor){ this.#telefone}
    get telefone(){return this.#telefone}

    constructor(id,nome,telefone){
        this.#id = id;
        this.#nome = nome;
        this.#telefone = telefone;
    }
}
module.exports = pessoaModel;