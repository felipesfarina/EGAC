document.addEventListener("DOMContentLoaded", function () {
  var formulario = document.getElementById("formulario");

  var aplicarMascaras = () => {
    var cpfInput = document.getElementById('cpf');
    if (cpfInput) IMask(cpfInput, { mask: '000.000.000-00' });

    var telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
      IMask(telefoneInput, {
        mask: [
          { mask: '(00) 0000-0000' },
          { mask: '(00) 00000-0000' }
        ]
      });
    }

    var cepInput = document.getElementById('cep');
    if (cepInput) IMask(cepInput, { mask: '00000-000' });

    var rgInput = document.getElementById('rg');
    if (rgInput) IMask(rgInput, { mask: '00.000.000-0' });
  };

  aplicarMascaras();

  var campos = formulario.querySelectorAll("input, select");
  campos.forEach(function (campo) {
    campo.addEventListener("focus", function () {
      var divPai = campo.parentElement;
      var erro = divPai.querySelector(".erro");
      if (erro) erro.remove();
      campo.classList.remove("valido", "invalido");
    });
  });

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    let valido = true;

    formulario.querySelectorAll(".erro").forEach(e => e.remove());

    campos.forEach(function (campo) {
      var valor = campo.value.trim();
      var divPai = campo.parentElement;

      campo.classList.remove("valido", "invalido");

      if (valor === "" || (campo.tagName === "SELECT" && valor === "")) {
        mostrarErro(divPai, "Este campo é obrigatório.");
        campo.classList.add("invalido");
        valido = false;
        return;
      }

      switch (campo.id) {
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
            mostrarErro(divPai, "Digite um e-mail válido.");
            campo.classList.add("invalido");
            valido = false;
          }
          break;

        case "cpf":
          var cpfLimpo = valor.replace(/\D/g, "");
          if (cpfLimpo.length !== 11 || isNaN(cpfLimpo)) {
            mostrarErro(divPai, "CPF inválido.");
            campo.classList.add("invalido");
            valido = false;
          }
          break;

        case "telefone":
          var tel = valor.replace(/\D/g, "");
          if (tel.length < 10 || tel.length > 11 || isNaN(tel)) {
            mostrarErro(divPai, "Telefone inválido.");
            campo.classList.add("invalido");
            valido = false;
          }
          break;

        case "cep":
          var cep = valor.replace(/\D/g, "");
          if (cep.length !== 8 || isNaN(cep)) {
            mostrarErro(divPai, "CEP inválido.");
            campo.classList.add("invalido");
            valido = false;
          }
          break;

        case "data":
          if (!/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
            mostrarErro(divPai, "Data inválida. Use o formato dd/mm/aaaa.");
            campo.classList.add("invalido");
            valido = false;
          } else {
            var [dia, mes, ano] = valor.split("/").map(Number);
            var dataDigitada = new Date(ano, mes - 1, dia);

            var hoje = new Date();
            var dataValida = (
              dataDigitada.getFullYear() === ano &&
              dataDigitada.getMonth() === mes - 1 &&
              dataDigitada.getDate() === dia
            );

            if (!dataValida) {
              mostrarErro(divPai, "Data inválida.");
              campo.classList.add("invalido");
              valido = false;
            } else if (dataDigitada > hoje) {
              mostrarErro(divPai, "A data não pode ser futura.");
              campo.classList.add("invalido");
              valido = false;
            }
          }
          break;


        case "sexo":
          if (valor === "") {
            mostrarErro(divPai, "Este campo é obrigatório.");
            campo.classList.add("invalido");
            valido = false;
          }
          break;

        case "nome":
        case "profissao":
        case "empresa":
          if (valor.length < 3) {
            mostrarErro(divPai, "Mínimo de 3 caracteres.");
            campo.classList.add("invalido");
            valido = false;
          }
          break;
      }

      if (!campo.classList.contains("invalido")) {
        campo.classList.add("valido");
      }
    });

    if (valido) {
      alert("Formulário enviado com sucesso!");
      
    }
  });

  function mostrarErro(elemento, mensagem) {
    var erro = document.createElement("p");
    erro.className = "erro";
    erro.style.color = "red";
    erro.style.fontSize = "0.9em";
    erro.innerText = mensagem;
    elemento.appendChild(erro);
  }
});

 document.getElementById('formulario-login').addEventListener('submit', function (e) {
    e.preventDefault();

    var email = document.getElementById('login-email');
    var senha = document.getElementById('login-senha');

    let valido = true;
    let mensagensErro = [];

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      mensagensErro.push("O campo de e-mail é obrigatório.");
      valido = false;
    } else if (!emailRegex.test(email.value)) {
      mensagensErro.push("Digite um e-mail válido.");
      valido = false;
    }

    if (!senha.value.trim()) {
      mensagensErro.push("O campo de senha é obrigatório.");
      valido = false;
    } else if (senha.value.length < 6) {
      mensagensErro.push("A senha deve ter pelo menos 6 caracteres.");
      valido = false;
    }

    if (!valido) {
      alert(mensagensErro.join("\n"));
    } else {
      alert("Login validado com sucesso!");
      this.submit();
    }
  });

  function apagarErro(){
    
  }

  








