function mostrarFormulario(id) {
  // Lista de todos los formularios
  ["formEvent", "formCharacter", "formObject", "formLocation", "formChapter", "formDream", "formRelation", "formSymbol"].forEach((f) => {
    document.getElementById(f).classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

document.getElementById("openModal").addEventListener("click", function () {
  document.getElementById("customModal").classList.remove("hidden");
});

document.getElementById("customModal").addEventListener("click", function (e) {
  if (e.target === this) {
    this.classList.add("hidden");
  }
});
