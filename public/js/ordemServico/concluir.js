document.addEventListener('DOMContentLoaded', function(){
    
    let inputProcurarInsumo = document.getElementById('procurarInsumoval');
    let inputInsumoQtd = document.getElementById('quantidadeInsumoval');
    let selectInsumo = document.getElementById('insumoval')
    inputProcurarInsumo.addEventListener('blur', function(){
        if(inputProcurarInsumo.value){
            let nome = {nome : inputProcurarInsumo.value};
            fetch("/admin/buscarInsumoNome",{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(nome)
                })
            .then(function(resposta){
                return resposta.json();
            })
            .then(function(corpo){
                selectInsumo.innerHTML = '';
                if(corpo.lista.length == 0 ){
                    selectInsumo.innerHTML = '<option value="0">Insumo não existente no banco de dados!</option>'
                }
                else{
                    for(let i=0; i < corpo.lista.length;i++){
                        let insumo = corpo.lista[i];
                        selectInsumo.innerHTML += '<option value="'+insumo.id+'">'+insumo.nome+'</option>' 
                    }
                }
            })
        }
    });
    
    let listabtnExcluirInsumo = document.querySelectorAll('.btnExcluirInsumo');
    let msgErroInsumo = document.getElementById('msgErroInsumo');
    let listaInsumo = []
    let tableInsumo = document.getElementById('tableInsumo'); 
    document.getElementById('AddInsumo').addEventListener('click', addInsumo);
    function addInsumo(){
        msgErroInsumo.textContent = '';
        let ok = true;
        if(selectInsumo.value == 0){
            ok = false;
            msgErroInsumo.textContent = 'Selecione um Item para adicionar!';
        }
        for(i in listaInsumo){
            if(listaInsumo[i].id == selectInsumo.value){
                ok = false;
                msgErroInsumo.textContent = 'Este item já foi adicionado!';
            }
        }
        if(ok == true){
            listaInsumo.push({id: selectInsumo.value, qtd: inputInsumoQtd.value});
            console.log(listaInsumo);
            
            tableInsumo.innerHTML+= `
            <tr>
            <td>${selectInsumo.value}</td>
            <td>${selectInsumo.textContent}</td>
            <td>${inputInsumoQtd.value}</td>
            <td><button class='btn btn-danger btnExcluirInsumo' data-id='${selectInsumo.value}'><i class="bi bi-trash-fill"></i></button></td>
            </tr>`;

            listabtnExcluirInsumo = [];
            listabtnExcluirInsumo = document.querySelectorAll('.btnExcluirInsumo');

            for(let i=0; i<listabtnExcluirInsumo.length;i++){
                listabtnExcluirInsumo[i].addEventListener('click', removerInsumo);
            }
        }
    }

    function removerInsumo(){
        let id = this.dataset.id
        for(i in listaInsumo){
            if(listaInsumo[i].id == id){
                listaInsumo.splice(i,1);
            }
        }
        console.log(listaInsumo)
        this.parentElement.parentElement.remove();
    }
    
    let inputProcurarFuncionario = document.getElementById('procurarFuncval');
    let selectFuncionario = document.getElementById('funcval');
    inputProcurarFuncionario.addEventListener('blur', function(){
        if(inputProcurarFuncionario.value){
                let nome = {nome : inputProcurarFuncionario.value};
                fetch("/admin/buscarFuncionario",{
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(nome)
                })
            .then(function(resposta){
                return resposta.json();
            })
            .then(function(corpo){
                selectFuncionario.innerHTML = '';
                if(corpo.lista.length == 0 ){
                    selectFuncionario.innerHTML = '<option value="0">Funcionário não existente no banco de dados!</option>'
                }
                for(let i=0; i < corpo.lista.length;i++){
                    let func = corpo.lista[i];
                    selectFuncionario.innerHTML += '<option value="'+func.id+'">'+func.nome+'</option>' 
                }
            })
        }
    });

    let listabtnExcluirSubItem = document.querySelectorAll('.btnExcluirSubItem');
    let msgErroSubItem = document.getElementById('msgErroSubItem');
    let listaSubItem = []
    let tableSubItem = document.getElementById('tableSubItem'); 
    document.getElementById('AddSubItem').addEventListener('click', addSubItem);
    function addSubItem(){
        msgErroSubItem.textContent = '';
        let ok = true;
        if(selectFuncionario.value == 0){
            ok = false;
            msgErroSubItem.textContent = 'Selecione um Funcionario para adicionar Sub-Item!';
        }
        for(i in listaSubItem){
            if(listaSubItem[i].id == selectFuncionario.value){
                ok = false;
                msgErroSubItem.textContent = 'Este item já foi adicionado!';
            }
        }
        if(ok == true){
            listaSubItem.push({id: selectFuncionario.value, qtd: inputSubItemQtd.value}); // NO EJS , TEM QUE POR ID FUNC NA TABELA E ENTÃO VER AQ
            console.log(listaSubItem);
            
            tableSubItem.innerHTML+= `
            <tr>
            <td>${selectFuncionario.value}</td>
            <td>${selectFuncionario.textContent}</td>
            <td>${inputSubItemQtd.value}</td>
            <td><button class='btn btn-danger btnExcluirSubItem' data-id='${selectFuncionario.value}'><i class="bi bi-trash-fill"></i></button></td>
            </tr>`;

            listabtnExcluirSubItem = [];
            listabtnExcluirSubItem = document.querySelectorAll('.btnExcluirSubItem');

            for(let i=0; i<listabtnExcluirSubItem.length;i++){
                listabtnExcluirSubItem[i].addEventListener('click', removerSubItem);
            }
        }
    }

    function removerSubItem(){
        let id = this.dataset.id
        for(i in listaSubItem){
            if(listaSubItem[i].id == id){
                listaSubItem.splice(i,1);
            }
        }
        console.log(listaSubItem)
        this.parentElement.parentElement.remove();
    }

    document.getElementById('concluirOS').addEventListener('click', gravar);

    function gravar(){
        const pessoa = document.getElementById('pessoaval');
        const eqAg = document.getElementById('EqAgricolaval');
        const servico = document.getElementById('servicoval');
        const func = document.getElementById('funcval');
        const comentario = document.getElementById('comentarioval');

        let vetorVal= [];
        if(pessoa.value == 0)
            vetorVal.push(pessoa);
        else
            pessoa.style.borderColor = '';

        if(eqAg.value == 0)
            vetorVal.push(eqAg);
        else
            eqAg.style.borderColor = '';

        if(servico.value == 0)
            vetorVal.push(servico);
        else
            servico.style.borderColor = '';

        if(func.value == 0)
            vetorVal.push(func);
        else
            func.style.borderColor = '';

        if(vetorVal.length == 0){
            //if(nome.value && pessoa.value != 0 && preco.value && marca.value != 0){
                obj = {
                    pessoa: pessoa.value,
                    EqAg: eqAg.value,
                    servico: servico.value,
                    func: func.value,
                    comentario: comentario.value
                }
                fetch('/admin/ordemServicos/abrir',{
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                    })
                    .then(function(resposta) {//recebe a resposta como retorno do fetch
                        return resposta.json(); //converte o corpo da resposta para json (gera uma nova promise)
                    })
                    .then(function(corpo) {//recebe o corpo em formato de obj genérico
                        alert(corpo.msg);
                        pessoa.value='';
                        eqAg.value='';
                        servico.value='';
                        func.value ='';
                        comentario.value = '';
                })
            //}
        }
        else{
            alert('Favor Preencher os Campos Obrigatórios!');
            for(let i=0; i<vetorVal.length; i++){
                vetorVal[i].style.borderColor = 'red';
            }
        }
    }
})