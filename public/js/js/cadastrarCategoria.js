document.addEventListener('DOMContentLoaded', function(){

    let btn = document.getElementById('cadastrar');
    btn.addEventListener('click', function(){
        const nome = document.getElementById('nomeval');

        if(!nome.value){
            alert('Favor Preencher os Campos Obrigatórios!');
            nome.style.borderColor = 'red';
        }
        else{
            nome.style.borderColor = '';
            obj = {
                nome : nome.value
            }
            fetch('/admin/cadastrarCategoria',{
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
                    nome.value='';
            })
        }  
    })
})