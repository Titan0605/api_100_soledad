  function filtrarCaracteres(input) {
    input.value = input.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]/g, '');
  }

  function validarInput() {
    const input = document.getElementById('to_search');
    const pattern = /^[A-Za-zÑñ0-9\s]{1,70}$/;

    if (!pattern.test(input.value)) {
      alert("Por favor, escribe solo letras, números y espacios (máx. 50 caracteres).");
      return false;
    }
    return true;
  }