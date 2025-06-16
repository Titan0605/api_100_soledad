function filtrarCaracteres(search) {
  search.value = search.value.replace(/[^A-Za-zÑñ0-9\s]/g, '');
}


//Validar para permitir comas
function filtrarCaracteres1(input) {
  input.value = input.value.replace(/[^A-Za-zÑñ,:\s]/g, '');
}


// Validar para solo texto
function filtrarCaracteres2(input) {
  input.value = input.value.replace(/[^A-Za-zÑñ\s]/g, '');
}


// Validar para ids
function filtrarCaracteres3(input) {
  input.value = input.value.replace(/[^A-Za-zÑñ0-9,\s]/g, '');
}


// Validar para varios cap
function filtrarCaracteres4(input) {
  input.value = input.value.replace(/[^0-9,\s]/g, '');
}


// Validar para inputs de 2
const length_2 = [ 
  document.getElementById('eventChapter'),
  document.getElementById('eventImportance'),
  document.getElementById('characterDeathChapter'),
  document.getElementById('objectImportance'),
  document.getElementById('chapterNumber'),
  document.getElementById('chapterImportance'),
  document.getElementById('dreamChapter'),
  document.getElementById('relationStart'),
];

length_2.forEach(input => {
  input.addEventListener("input", () => {
    if (input.value.length > 2) {
      input.value = input.value.slice(0, 2);
    }
  });
});

// Validar para inputs de 4
const length_4 = [
  document.getElementById('eventDate')
];

length_4.forEach(input => {
  input.addEventListener("input", () => {
    if (input.value.length > 4) {
      input.value = input.value.slice(0, 4);
    }
  });
});


//Validar para inputs de 1
const length_1 = [ 
  document.getElementById('characterGeneration')
];

length_1.forEach(input => {
  input.addEventListener("input", () => {
    if (input.value.length > 1) {
      input.value = input.value.slice(0, 1);
    }
  });
});