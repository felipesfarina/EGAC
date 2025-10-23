document.addEventListener('DOMContentLoaded', function(){
    const select = document.getElementById('select');
    
    change();
    select.addEventListener('change', change);

    function change(){    
        let listas = document.querySelectorAll('table');            // SELECIONA A TABELA A EXIBIR
        for(let i=0; i< listas.length; i++){
            if(listas[i].id == select.value)
                listas[i].style.display = 'table';
            else
                listas[i].style.display = 'none';
        }
    }

    const btnExcluir = document.querySelectorAll('.btnExcluir');
    for(let i=0;i<btnExcluir.length;i++)
        btnExcluir[i].addEventListener('click',excluir);
    
    function excluir(){

        let btn = this;
        let id = this.dataset.id;
        let nome = this.dataset.nome;

        let msg = 'Confirma a exclusão do Cliente: '+nome+'?';
        if(confirm(msg)) {
            let obj = {
                id: id
            }
            fetch("/admin/excluirCliente", {
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