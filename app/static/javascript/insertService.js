function mostrarFormulario(id) {
    ["formEvent", "formCharacter", "formObject", "formLocation"].forEach((f) => {
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