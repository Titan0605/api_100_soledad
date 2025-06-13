function mostrarFormulario(id) {
  ["formEvent", "formCharacter", "formObject", "formLocation", "formChapter", "formDream", "formRelation", "formSymbol"].forEach((f) => {
    document.getElementById(f).classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");

  if (id === "formEvent") {
    loadCharacters();
  } else if (id === "formLocation") {
    loadCharacters();
  } else if (id === "formObject") {
    loadCharacters();
  } else if (id === "formDream") {
    loadCharacters();
  } else if (id === "formRelation") {
    loadCharacters();
  } else if (id === "formSymbol") {
    loadCharacters();
  }
}

document.getElementById("openModal").addEventListener("click", function () {
  document.getElementById("customModal").classList.remove("hidden");
});

document.getElementById("customModal").addEventListener("click", function (e) {
  if (e.target === this) {
    this.classList.add("hidden");
  }
});


/** Function to obtain the data from the active form
 */
function getActiveFormData() {
  const forms = {
    formEvent: {
      endpoint: "/insert/events",
      getFormData: () => ({
          nombre: document.getElementById("eventName").value,
          descripcion: document.getElementById("eventDescription").value,
          capitulo: parseInt(document.getElementById("eventChapter").value),
          importancia: parseInt(document.getElementById("eventImportance").value),
          tipo: document.getElementById("eventType").value,
          fecha_narrativa: document.getElementById("eventDate").value,
          personajes_involucrados: Array.from(selectedCharacterIds),
          localizaciones: document.getElementById("eventLocations").value.split(",").map((l) => l.trim()),
          objetos_relacionados: document.getElementById("eventObjects").value.split(",").map((o) => o.trim()),
          simbolismo: document.getElementById("eventSymbolism").value.split(",").map((s) => s.trim()),
          consecuencias: document.getElementById("eventConsequences").value.split(",").map((c) => c.trim()),
          palabras_clave: document.getElementById("eventKeywords").value.split(",").map((k) => k.trim()),
          texto_completo: document.getElementById("eventFullText").value,
        }),
    },
    formCharacter: {
        endpoint: "/insert/characters",
        getFormData: () => ({
        nombre: document.getElementById("characterFirstName").value,
        apellido: document.getElementById("characterLastName").value,
        descripcion_fisica: document.getElementById("characterPhysicalDescription").value,
        generacion: parseInt(document.getElementById("characterGeneration").value),
        personalidad: document.getElementById("characterPersonality").value.split(",").map((p) => p.trim()),
        capitulos_aparicion: document.getElementById("characterChapters").value.split(",").map((c) => parseInt(c.trim())),
        eventos_principales: document.getElementById("characterEvents").value.split(",").map((e) => e.trim()),
        transformacion: document.getElementById("characterTransformation").value,
        muerte: {
          capitulo: parseInt(document.getElementById("characterDeathChapter").value) || null,
          circunstancias: document.getElementById("characterDeathCircumstances").value,
          simbolismo: document.getElementById("characterDeathSymbolism").value,
        },
        simbolismo: document.getElementById("characterSymbolism").value.split(",").map((s) => s.trim()),
        palabras_clave: document.getElementById("characterKeywords").value.split(",").map((k) => k.trim()),
      }),
    },
    formObject: {
        endpoint: "/insert/objects",
        getFormData: () => ({
            nombre: document.getElementById("objectName").value,
        tipo: document.getElementById("objectType").value,
        descripcion: document.getElementById("objectDescription").value,
        capitulos_aparicion: document.getElementById("objectChapters").value.split(",").map((c) => parseInt(c.trim())),
        propietarios: Array.from(selectedCharacterIds),
        ubicacion_fisica: document.getElementById("objectLocation").value,
        simbolismo: document.getElementById("objectSymbolism").value.split(",").map((s) => s.trim()),
        transformaciones: document.getElementById("objectTransformations").value /* .split('\n').map(t => ({
            capitulo: parseInt(t.split(':')[0].trim()),
            estado: t.split(':')[1].trim()
            })) */,
        importancia_narrativa: parseInt(document.getElementById("objectImportance").value),
        palabras_clave: document.getElementById("objectKeywords").value.split(",").map((k) => k.trim()),
        }),
    },
    formLocation: {
        endpoint: "/insert/locations",
        getFormData: () => ({
        nombre: document.getElementById("locationName").value,
        tipo: document.getElementById("locationType").value,
        descripcion: document.getElementById("locationDescription").value,
        capitulos_aparicion: document.getElementById("locationChapters").value.split(",").map((c) => parseInt(c.trim())),
        eventos_importantes: document.getElementById("locationEvents").value.split(",").map((e) => e.trim()),
        simbolismo: document.getElementById("locationSymbolism").value.split(",").map((s) => s.trim()),
        transformaciones: document.getElementById("locationTransformations").value /* .split('\n').map(t => ({
            capitulo: parseInt(t.split(':')[0].trim()),
            estado: t.split(':')[1].trim()
            })) */,
        personajes_asociados: Array.from(selectedCharacterIds),
        palabras_clave: document.getElementById("locationKeywords").value.split(",").map((k) => k.trim()),
        }),
    },
    formChapter: {
      endpoint: "/insert/chapters",
      getFormData: () => ({
        numero: parseInt(document.getElementById("chapterNumber").value),
        titulo: document.getElementById("chapterTitle").value,
        resumen: document.getElementById("chapterSummary").value,
        temas_principales: document.getElementById("chapterThemes").value.split(",").map((t) => t.trim()),
        importancia: parseInt(document.getElementById("chapterImportance").value),
        palabras_clave: document.getElementById("chapterKeywords").value.split(",").map((k) => k.trim()),
        eventos_relacionados: document.getElementById("chapterEvents").value.split(",").map((e) => e.trim()),
    }),
    },
    formDream: {
        endpoint: "/insert/dreams",
        getFormData: () => ({
        soñador: Array.from(selectedCharacterIds),
        tipo: document.getElementById("dreamType").value,
        capitulo: parseInt(document.getElementById("dreamChapter").value),
        descripcion: document.getElementById("dreamDescription").value,
        interpretacion: document.getElementById("dreamInterpretation").value,
        elementos_simbolicos: document.getElementById("dreamElements").value.split(",").map((e) => e.trim()),
        cumplimiento: document.getElementById("dreamFulfillment").value,
        palabras_clave: document.getElementById("dreamKeywords").value.split(",").map((k) => k.trim()),
    }),
    },
    formRelation: {
      endpoint: "/insert/relationships",
      getFormData: () => ({
        personaje1: Array.from(selectedCharacterIds)[0],
        personaje2: Array.from(selectedCharacterIds)[1],
        tipo_relacion: document.getElementById("relationType").value,
        capitulo_inicio: parseInt(document.getElementById("relationStart").value),
        descripcion: document.getElementById("relationDescription").value,
        obstaculos: document.getElementById("relationObstacles").value.split(",").map((o) => o.trim()),
        simbolismo: document.getElementById("relationSymbolism").value.split(",").map((s) => s.trim()),
        consecuencias: document.getElementById("relationConsequences").value.split(",").map((c) => c.trim()),
        palabras_clave: document.getElementById("relationKeywords").value.split(",").map((k) => k.trim()),
    }),
    },
    formSymbol: {
      endpoint: "/insert/symbols",
      getFormData: () => ({
        nombre: document.getElementById("symbolName").value,
        tipo: document.getElementById("symbolType").value,
        capitulos_aparicion: document.getElementById("symbolChapters").value.split(",").map((c) => parseInt(c.trim())),
        interpretaciones: document.getElementById("symbolInterpretations").value.split("\n").map((i) => i.trim()),
        elementos_asociados: document.getElementById("symbolElements").value.split(",").map((e) => e.trim()),
        personajes_afectados: Array.from(selectedCharacterIds),
        eventos_relacionados: document.getElementById("symbolEvents").value.split(",").map((e) => e.trim()),
        palabras_clave: document.getElementById("symbolKeywords").value.split(",").map((k) => k.trim()),
    }),
    },
};

// Finds the active form
const activeFormId = Object.keys(forms).find((formId) => !document.getElementById(formId).classList.contains("hidden"));

if (!activeFormId) return null;

return {
    formId: activeFormId,
    endpoint: forms[activeFormId].endpoint,
    data: forms[activeFormId].getFormData(),
};
}

// Function to validate form data
function validateFormData(formData) {
    if (!formData || !formData.data) return false;
    
    // Verifies if the values are correct
    const requiredFields = Object.values(formData.data).filter((value) => value === "" || (Array.isArray(value) && value.length === 0) || value === undefined);
    
    return requiredFields.length === 0;
}

// Function to send data to the server and save it
async function submitFormData() {
  const formData = getActiveFormData();
  
  console.log(`Last data in ${formData.formId}:`, formData.data);
  
  if (!formData) {
    showNotification("Error: No hay formulario activo", "error");
    return;
  }

  if (!validateFormData(formData)) {
    showNotification("Error: Por favor completa todos los campos requeridos", "error");
    return;
  }
  
  try {
    const response = await fetch(formData.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify(formData.data),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      showNotification("¡Datos guardados exitosamente!", "success");
      document.getElementById("customModal").classList.add("hidden");
      document.getElementById(formData.formId).reset();
    } else {
      showNotification(`Error: ${result.message}`, "error");
    }
  } catch (error) {
      showNotification("Error al enviar los datos", "error");
    console.error("Error:", error);
  }
}

function showNotification(message, type = "info") {
  alert(message);
}

document.querySelector("#customModal button.bg-green-600").addEventListener("click", submitFormData);

// Section to manage character selection when responding the form

let selectedCharacterIds = new Set();

function toggleCharacterDropdown() {
  const dropdowns = document.querySelectorAll(".characterDropdown");
  dropdowns.forEach((dropdown) => {
    dropdown.classList.toggle("hidden");
  });
}

function updateSelectedCharactersDisplay() {
  const containers = document.querySelectorAll(".selectedCharacters");

  containers.forEach((container) => {
    container.innerHTML = "";

    selectedCharacterIds.forEach((id) => {
        const option = document.querySelector(`[data-character-id="${id}"]`);
        if (option) {
        const chip = document.createElement("div");
        chip.className = "inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-white";
        chip.innerHTML = `
                    <span>${option.textContent}</span>
                    <button type="button" class="hover:text-red-400">
                        <i class="fa-solid fa-times"></i>
                    </button>
                `;
        chip.querySelector("button").addEventListener("click", () => removeCharacter(id));
        container.appendChild(chip);
        }
    });
  });

  // Update dropdown button text
  const dropdownButtons = document.querySelectorAll(".characterDropdownButton");
  const count = selectedCharacterIds.size;
  dropdownButtons.forEach((dropdownButton) => {
    dropdownButton.querySelector("span").textContent = count > 0 ? `${count} personaje${count > 1 ? "s" : ""} seleccionado${count > 1 ? "s" : ""}` : "Seleccionar personajes";
  });
}

function selectCharacter(id, name) {
  if (!id) return; // Validación para asegurar que tenemos un ID
  const option = document.querySelector(`[data-character-id="${id}"]`);
  if (option && !selectedCharacterIds.has(id)) {
    option.classList.add("bg-red-500/20"); // Add selected state
    selectedCharacterIds.add(id);
    updateSelectedCharactersDisplay();
    // Ya no cerramos el dropdown para permitir selecciones múltiples
  }
}

function removeCharacter(id) {
  selectedCharacterIds.delete(id);
  const option = document.querySelector(`[data-character-id="${id}"]`);
  if (option) {
    option.classList.remove("bg-red-500/20"); // Remove selected state
  }
  updateSelectedCharactersDisplay();
}

async function loadCharacters() {
  try {
    const response = await fetch("/characters-list");
    const data = await response.json();

    if (data.status === "successful") {
      const optionsContainers = document.querySelectorAll(".characterOptions");
      optionsContainers.forEach((optionsContainer) => {
        optionsContainer.innerHTML = ""; // Clear existing options

        data.results.forEach((character) => {
            console.log(character);
            const option = document.createElement("div");
            const name = character.nombre + (character.apellido ? " " + character.apellido : "");
            option.className = `px-4 py-2 cursor-pointer text-white transition-all duration-200 ${selectedCharacterIds.has(character.id) ? "bg-red-500/20" : "hover:bg-slate-700/60"}`;
            option.setAttribute("data-character-id", character.id);
            option.textContent = name;
            option.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevenir que el click se propague
            const characterId = character.id;
            if (selectedCharacterIds.has(characterId)) {
                removeCharacter(characterId);
            } else {
                selectCharacter(characterId, name);
            }
            });
            optionsContainer.appendChild(option);
        });
      });
    } else {
      console.error("Error loading characters:", data.message);
      showNotification("Error cargando personajes", "error");
    }
  } catch (error) {
    console.error("Error loading characters:", error);
    showNotification("Error cargando personajes", "error");
  }
}

// Reset selected characters when opening modal
document.getElementById("openModal").addEventListener("click", function () {
  selectedCharacterIds.clear();
  document.getElementById("customModal").classList.remove("hidden");
});

// Close dropdown when clicking outside, but don't interfere with option clicks
document.addEventListener("click", function (event) {
  const dropdowns = document.querySelectorAll(".characterDropdown");
  const buttons = document.querySelectorAll(".characterDropdownButton");

  dropdowns.forEach((dropdown, i) => {
    if (dropdown && buttons[i] && !dropdown.contains(event.target) && !buttons[i].contains(event.target)) {
        dropdown.classList.add("hidden");
    }
  });
});