// Carrossel de Apresentação

let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  }

  function moveSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);

/* Cadastro */

/*Campo do cpf */

  document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    if (value.length > 11) value = value.slice(0, 11);

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  e.target.value = value;
});

// Organizando a data

 document.getElementById('nascimento').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (value.length >= 5) {
      value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    } else if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    }
    e.target.value = value;
  });

// Confirmar se as senhas são iguais

const senha = document.getElementById('senha');
const confirmaSenha = document.getElementById('confirmaSenha');
const erroSenha = document.getElementById('erroSenha');

function verificarSenhas() {
  if (confirmaSenha.value === '' || senha.value === '') {
    erroSenha.classList.add('d-none');
    return;
  }

  if (senha.value !== confirmaSenha.value) {
    erroSenha.classList.remove('d-none');
  } else {
    erroSenha.classList.add('d-none');
  }
}

senha.addEventListener('input', verificarSenhas);
confirmaSenha.addEventListener('input', verificarSenhas);

// Verificar se os campos foram preenchidos

const form = document.getElementById('formCadastro');
  const nome = document.getElementById('nome');
  const cpf = document.getElementById('cpf');
  const email = document.getElementById('email');
  const genero = document.getElementById('genero');
  

  form.addEventListener('submit', function (e) {
    // Previne o envio automático
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos
    if (
      nome.value.trim() === '' ||
      cpf.value.trim() === '' ||
      genero.value.trim() === '' ||
      email.value.trim() === '' ||
      senha.value.trim() === '' ||
      confirmaSenha.value.trim() === ''
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  });