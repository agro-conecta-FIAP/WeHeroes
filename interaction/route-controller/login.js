// Mock de usuários em memória
let users = [];

function saveUser(document) {
  const user = {
    id: Date.now(),
    document: document,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

function userExists(document) {
  return users.some((user) => user.document === document);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  const documentInput = document.getElementById("document");
  const documentError = document.getElementById("document-error");

  // Função para validar CPF
  function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  // Função para validar CNPJ
  function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, "");

    if (cnpj.length !== 14) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    // Validação do primeiro dígito verificador
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    // Validação do segundo dígito verificador
    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  }

  // Função para formatar o documento
  function formatDocument(value) {
    let formattedValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos

    // Limita o tamanho máximo baseado no tipo de documento
    if (formattedValue.length > 14) {
      formattedValue = formattedValue.slice(0, 14); // CNPJ
    } else if (formattedValue.length > 11) {
      formattedValue = formattedValue.slice(0, 11); // CPF
    }

    if (formattedValue.length <= 11) {
      // Formatação de CPF
      formattedValue = formattedValue.replace(/(\d{3})(\d)/, "$1.$2");
      formattedValue = formattedValue.replace(/(\d{3})(\d)/, "$1.$2");
      formattedValue = formattedValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      // Formatação de CNPJ
      formattedValue = formattedValue.replace(/^(\d{2})(\d)/, "$1.$2");
      formattedValue = formattedValue.replace(
        /^(\d{2})\.(\d{3})(\d)/,
        "$1.$2.$3"
      );
      formattedValue = formattedValue.replace(/\.(\d{3})(\d)/, ".$1/$2");
      formattedValue = formattedValue.replace(/(\d{4})(\d)/, "$1-$2");
    }

    return formattedValue;
  }

  // Adiciona formatação ao digitar
  documentInput.addEventListener("input", (e) => {
    e.target.value = formatDocument(e.target.value);
  });

  // Validação do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const documentValue = documentInput.value.replace(/\D/g, "");
    let isValid = false;

    console.log(documentValue.length);
    if (documentValue.length === 11) {
      isValid = validateCPF(documentValue);
      if (!isValid) {
        documentError.textContent = "CPF inválido";
        return;
      }
    } else if (documentValue.length === 14) {
      isValid = validateCNPJ(documentValue);
      if (!isValid) {
        documentError.textContent = "CNPJ inválido";
        return;
      }
    } else {
      documentError.textContent = "Documento inválido";
      return;
    }

    // Se chegou aqui, o documento é válido
    documentError.textContent = "";

    // Verifica se o usuário já existe
    if (userExists(documentValue)) {
      documentError.textContent = "Usuário já cadastrado";
      return;
    }

    // Salva o novo usuário
    const newUser = saveUser(documentValue);
    console.log("Novo usuário cadastrado:", newUser);
    documentError.textContent = "Usuário cadastrado com sucesso!";

    // Redireciona para a próxima página
    window.location.href = "pages/dashboard.html";
  });
});

// Função para listar todos os usuários
function listUsers() {
  return users;
}
