var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl)
})

// js boostrap para dropdown da pagina homeadmin 'cadastrar itens' BOLAR OUTRA FORMA 