document.addEventListener('DOMContentLoaded', function(){
    const select = document.getElementById('select');
    
    change();
    select.addEventListener('change', change);

    function change(){    
        let listas = document.querySelectorAll('table');            // SELECIONA A TABELA A EXIBIR
        if(select.value == 1 || select.value == 2 || select.value == 3)
            listas[0].style.display = 'table';
        else
            listas[0].style.display = 'none';

        if(select.value == 4)
            listas[1].style.display = 'table';
        else
            listas[1].style.display = 'none';

        if(select.value == 5)
            listas[2].style.display = 'table';
        else
            listas[2].style.display = 'none';
        
        let linha = document.querySelectorAll('[data-tipoLinha]')           // ESCONDE LINHAS QUE NAO SAO DO TIPO ESCOLHIDO NO SELECT PRODUTOS
        for(let i=0;i<linha.length;i++){
            console.log(linha[i].classList.contains("tipo"+select.value))
            if( linha[i].classList.contains("tipo"+select.value))
                linha[i].style.display = 'table-row';
            else
                linha[i].style.display = 'none';
        }
    }

    const btnExcluir = document.querySelectorAll('.btnExcluir');
    for(let i=0;i<btnExcluir.length;i++)
        btnExcluir[i].addEventListener('click',excluir);
    
    function excluir(){

        let btn = this;
        let id = this.dataset.id;
        let tipo = this.dataset.tipo;
        let nome = this.dataset.nome;
        let aux;
        if(tipo == 1){aux = 'do Produto'}
        if(tipo == 2){aux = 'do Insumo'}
        if(tipo == 3){aux = 'do Serviço'}
        if(tipo == 4){aux = 'do Equipamento Agrícola'}
        if(tipo == 5){aux = 'da Marca'}

        let msg = 'Confirma a excluisão '+aux+': '+nome+'?';
        if(confirm(msg)) {
            let obj = {
                tipo: tipo,
                id: id
            }
            fetch("/admin/excluir", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({obj})
            })
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(corpo) {
                alert(corpo.msg);
                if(corpo.ok) {
                    btn.parentElement.parentElement.remove()
                }
            })
        }
    }
})