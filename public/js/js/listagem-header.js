document.addEventListener('DOMContentLoaded', function(){
    
    let titleOptions = document.querySelectorAll('.title-option');
    let titleSelected = document.getElementById('titleSelected');
    let select = document.getElementById('select');

    for(let i = 0; i < titleOptions.length; i++){
        titleOptions[i].addEventListener('click', mudarTitulo);
    }

    function mudarTitulo(e){
        e.preventDefault();
        let valor = this.dataset.value;              
        select.value = valor;                        
        titleSelected.textContent = this.textContent; 
        select.dispatchEvent(new Event('change'));    // muda o select manualmente com o dispatch
    }
});
