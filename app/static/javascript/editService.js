// Sets para manejar las selecciones múltiples
let selectedEditCharacterIds = new Set();
let selectedEditEventIds = new Set();
let selectedEditLocationIds = new Set();
let selectedEditObjectIds = new Set();

// Hacer las funciones accesibles globalmente
window.abrirEditModal = async function (type, id) {
  const modal = document.getElementById("customEditModal");
  modal.classList.remove("hidden");

  const formId = `formEdit${type}`;
  const form = document.getElementById(formId);
  form.classList.remove("hidden");

  // Limpiar las selecciones previas
  selectedEditCharacterIds.clear();
  selectedEditEventIds.clear();
  selectedEditLocationIds.clear();
  selectedEditObjectIds.clear();

  // Cargar las listas desplegables
  await Promise.all([loadEditCharacters(), loadEditEvents(), loadEditLocations(), loadEditObjects()]);

  debugger;
  const response = await fetch(`/search-specific-${type}/${id}`, {
    method: "GET",
  });
  const { results } = await response.json();
  const data = Array.isArray(results) ? results[0] : results;

  Object.entries(data).forEach(([key, value]) => {
    debugger;

    if (key === "muerte") {
      Object.keys(value).forEach((field) => {
        const deathElements = form.querySelectorAll(`[name="${field}"]`);
        deathElements.forEach((deathElement) => {
          deathElement.value = value[field];
        });
      });
    }

    const element = form.querySelector(`[name="${key}"]`);
    if (!element) return;

    let formattedValue = value;

    if (value === null) {
      formattedValue = "";
    }

    // Manejo de arrays de IDs para los selects múltiples
    if (Array.isArray(value)) {
      if (key === "personajes_involucrados" || key === "personajes_asociados" || key === "personajes_afectados" || key === "propietarios" || key === "soñador") {
        value.forEach((charId) => {
          if (typeof charId === "string") {
            selectedEditCharacterIds.add(charId);
          } else if (charId._id) {
            selectedEditCharacterIds.add(charId._id);
          }
        });
        updateSelectedEditCharactersDisplay();
        return;
      } else if (key === "eventos_principales" || key === "eventos_importantes" || key === "eventos_relacionados") {
        value.forEach((eventId) => {
          if (typeof eventId === "string") {
            selectedEditEventIds.add(eventId);
          } else if (eventId._id) {
            selectedEditEventIds.add(eventId._id);
          }
        });
        updateSelectedEditEventsDisplay();
        return;
      } else if (key === "localizaciones") {
        value.forEach((locId) => {
          if (typeof locId === "string") {
            selectedEditLocationIds.add(locId);
          } else if (locId._id) {
            selectedEditLocationIds.add(locId._id);
          }
        });
        updateSelectedEditLocationsDisplay();
        return;
      } else if (key === "objetos_relacionados") {
        value.forEach((objId) => {
          if (typeof objId === "string") {
            selectedEditObjectIds.add(objId);
          } else if (objId._id) {
            selectedEditObjectIds.add(objId._id);
          }
        });
        updateSelectedEditObjectsDisplay();
        return;
      } else if (key === "transformaciones" && Array.isArray(value)) {
        formattedValue = value.map((t) => `${t.capitulo}: ${t.descripcion}`).join("\n");
      } else if (typeof value === "object" && !Array.isArray(value)) {
        if (value.type === "characters" || value.type === "events" || value.type === "locations") {
          formattedValue = value.nombre || value.titulo || "";
        } else if (key === "muerte") {
          formattedValue = `${value.capitulo}: ${value.circunstancias}`;
        }
      } else {
        formattedValue = value
        .map((item) => {
          if (typeof item === "object") {
            if (item.nombre) return item.nombre;
            if (item.titulo) return item.titulo;
            if (item.tipo && item.descripcion) return `${item.tipo}: ${item.descripcion}`;
            return item._id || "";
          }
          return item;
        })
        .join(", ");
      }
    }

    if (key === "personaje1" || key === "personaje2" || key === "soñador") {
      selectedEditCharacterIds.add(value._id);
      updateSelectedEditCharactersDisplay();
    }

    if (element.tagName === "TEXTAREA" || element.tagName === "INPUT" || element.tagName === "SELECT") {
      console.log("Entro en textarea, input o select, " + key);
      element.value = formattedValue;
    }
  });
};

document.querySelector("#customEditModal button.bg-green-600").addEventListener("click", async function () {
  // 1) Detectar qué formulario de edición está visible
  const formIds = ["formEditevents", "formEditcharacters", "formEditobjects", "formEditlocations", "formEditchapters", "formEditdreams_visions", "formEditrelationships", "formEditsymbols"];
  const activeFormId = formIds.find((fid) => !document.getElementById(fid).classList.contains("hidden"));
  if (!activeFormId) {
    alert("No hay formulario activo");
    return;
  }

  // 2) Obtener collection a partir del id del form
  //    Ej: formEventEdit → events
  let collection = "";
  // 3) Obtener el ID del objeto (hidden input con id `${activeFormId}Id`)
  console.log(activeFormId);
  const form = document.getElementById(activeFormId);
  const idInput = form.querySelector('input[name="_id"]');
  const id = idInput ? idInput.value : "";

  if (!id) {
    alert("Falta el ID en el formulario");
    return;
  }

  // 4) Armar el dictionary leyendo cada campo según tu getActiveFormData
  //    Aquí repetimos tu lógica por formulario:

  console.log(activeFormId);
  let dictionary = {};
  switch (activeFormId) {
    case "formEditevents":
      collection = "events";
      dictionary = {
        nombre: document.getElementById("eventEditName").value,
        descripcion: document.getElementById("eventEditDescription").value,
        capitulo: parseInt(document.getElementById("eventEditChapter").value),
        importancia: parseInt(document.getElementById("eventEditImportance").value),
        tipo: document.getElementById("eventEditType").value,
        fecha_narrativa: document.getElementById("eventEditDate").value,
        personajes_involucrados: Array.from(selectedEditCharacterIds),
        localizaciones: Array.from(selectedEditLocationIds),
        objetos_relacionados: Array.from(selectedEditObjectIds),
        simbolismo: document
          .getElementById("eventEditSymbolism")
          .value.split(",")
          .map((s) => s.trim()),
        consecuencias: document
          .getElementById("eventEditConsequences")
          .value.split(",")
          .map((c) => c.trim()),
        palabras_clave: document
          .getElementById("eventEditKeywords")
          .value.split(",")
          .map((k) => k.trim()),
        texto_completo: document.getElementById("eventEditFullText").value,
      };
      break;
    case "formEditcharacters":
      collection = "characters";
      dictionary = {
        nombre: document.getElementById("characterEditFirstName").value,
        apellido: document.getElementById("characterEditLastName").value,
        descripcion_fisica: document.getElementById("characterEditPhysicalDescription").value,
        generacion: parseInt(document.getElementById("characterEditGeneration").value),
        personalidad: document
          .getElementById("characterEditPersonality")
          .value.split(",")
          .map((p) => p.trim()),
        capitulos_aparicion: document
          .getElementById("characterEditChapters")
          .value.split(",")
          .map((c) => parseInt(c.trim())),
        eventos_principales: Array.from(selectedEditEventIds),
        transformacion: document.getElementById("characterEditTransformation").value,
        muerte: {
          capitulo: parseInt(document.getElementById("characterEditDeathChapter").value) || null,
          circunstancias: document.getElementById("characterEditDeathCircumstances").value,
          simbolismo: document.getElementById("characterEditDeathSymbolism").value,
        },
        simbolismo: document
          .getElementById("characterEditSymbolism")
          .value.split(",")
          .map((s) => s.trim()),
        palabras_clave: document
          .getElementById("characterEditKeywords")
          .value.split(",")
          .map((k) => k.trim()),
      };
      break;
    case "formEditobjects":
      collection = "objects";
      dictionary = {
        nombre: document.getElementById("objectEditName").value,
        tipo: document.getElementById("objectEditType").value,
        descripcion: document.getElementById("objectEditDescription").value,
        capitulos_aparicion: document
          .getElementById("objectEditChapters")
          .value.split(",")
          .map((c) => parseInt(c.trim())),
        propietarios: Array.from(selectedEditCharacterIds),
        ubicacion_fisica: document.getElementById("objectEditLocation").value,
        simbolismo: document
          .getElementById("objectEditSymbolism")
          .value.split(",")
          .map((s) => s.trim()),
        transformaciones: document
          .getElementById("objectEditTransformations")
          .value.split("\n")
          .map((t) => ({
            capitulo: parseInt(t.split(":")[0].trim()),
            descripcion: t.split(":")[1].trim(),
          })),
        importancia_narrativa: parseInt(document.getElementById("objectEditImportance").value),
        palabras_clave: document
          .getElementById("objectEditKeywords")
          .value.split(",")
          .map((k) => k.trim()),
      };
      break;
    case "formEditlocations":
      collection = "locations";
      dictionary = {
        nombre: document.getElementById("locationEditName").value,
        tipo: document.getElementById("locationEditType").value,
        descripcion: document.getElementById("locationEditDescription").value,
        capitulos_aparicion: document
          .getElementById("locationEditChapters")
          .value.split(",")
          .map((c) => parseInt(c.trim())),
        eventos_importantes: Array.from(selectedEditEventIds),
        simbolismo: document
          .getElementById("locationEditSymbolism")
          .value.split(",")
          .map((s) => s.trim()),
        transformaciones: document
          .getElementById("locationEditTransformations")
          .value.split("\n")
          .map((t) => ({
            capitulo: parseInt(t.split(":")[0].trim()),
            descripcion: t.split(":")[1].trim(),
          })),
        personajes_asociados: Array.from(selectedEditCharacterIds),
        palabras_clave: document
          .getElementById("locationEditKeywords")
          .value.split(",")
          .map((k) => k.trim()),
      };
      break;
    case "formEditchapters":
      collection = "chapters";
      dictionary = {
        numero: parseInt(document.getElementById("chapterEditNumber").value),
        titulo: document.getElementById("chapterEditTitle").value,
        resumen: document.getElementById("chapterEditSummary").value,
        temas_principales: document
          .getElementById("chapterEditThemes")
          .value.split(",")
          .map((t) => t.trim()),
        importancia: parseInt(document.getElementById("chapterEditImportance").value),
        palabras_clave: document
          .getElementById("chapterEditKeywords")
          .value.split(",")
          .map((k) => k.trim()),
        eventos_relacionados: Array.from(selectedEditEventIds),
      };
      break;
    case "formEditdreams_visions":
      debugger;
      collection = "dreams_visions";
      dictionary = {
        soñador: Array.from(selectedEditCharacterIds)[0],
        tipo: document.getElementById("dreamEditType").value,
        capitulo: parseInt(document.getElementById("dreamEditChapter").value),
        descripcion: document.getElementById("dreamEditDescription").value,
        interpretacion: document.getElementById("dreamEditInterpretation").value,
        elementos_simbolicos: document
          .getElementById("dreamEditElements")
          .value.split(",")
          .map((e) => e.trim()),
        cumplimiento: document.getElementById("dreamEditFulfillment").value,
        palabras_clave: document
          .getElementById("dreamEditKeywords")
          .value.split(",")
          .map((k) => k.trim()),
      };
      break;
    case "formEditrelationships":
      collection = "relationships";
      dictionary = {
        personaje1: Array.from(selectedEditCharacterIds)[0],
        personaje2: Array.from(selectedEditCharacterIds)[1],
        tipo_relacion: document.getElementById("relationEditType").value,
        capitulo_inicio: parseInt(document.getElementById("relationEditStart").value),
        descripcion: document.getElementById("relationEditDescription").value,
        obstaculos: document
          .getElementById("relationEditObstacles")
          .value.split(",")
          .map((o) => o.trim()),
        simbolismo: document
          .getElementById("relationEditSymbolism")
          .value.split(",")
          .map((s) => s.trim()),
        consecuencias: document
          .getElementById("relationEditConsequences")
          .value.split(",")
          .map((c) => c.trim()),
        palabras_clave: document
          .getElementById("relationEditKeywords")
          .value.split(",")
          .map((k) => k.trim()),
      };
      break;
    case "formEditsymbols":
      collection = "symbols";
      dictionary = {
        nombre: document.getElementById("symbolEditName").value,
        tipo: document.getElementById("symbolEditType").value,
        capitulos_aparicion: document
          .getElementById("symbolEditChapters")
          .value.split(",")
          .map((c) => parseInt(c.trim())),
        interpretaciones: document
          .getElementById("symbolEditInterpretations")
          .value.split(",")
          .map((i) => i.trim()),
        elementos_asociados: document
          .getElementById("symbolEditElements")
          .value.split(",")
          .map((e) => e.trim()),
        personajes_afectados: Array.from(selectedEditCharacterIds),
        eventos_relacionados: Array.from(selectedEditEventIds),
        palabras_clave: document
          .getElementById("symbolEditKeywords")
          .value.split(",")
          .map((k) => k.trim()),
      };
      break;
    // ... y así para cada formulario: formObjectEdit, formLocationEdit, etc.
    // Copia tu lógica de getFormData y ajusta los IDs de los campos añadiendo o quitando "Edit" según corresponda.
  }

  // 5) Enviar el PUT con id, collection y dictionary
  try {
    const res = await fetch("/general-update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, collection, dictionary }),
    });
    const result = await res.json();
    if (res.ok) {
      alert("✅ Actualización exitosa");
      document.getElementById("customEditModal").classList.add("hidden");
      document.getElementById(activeFormId).classList.add("hidden");
    } else {
      alert("❌ Error: " + result.message);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Error de red al actualizar");
  }
});

// Funciones para manejar los dropdowns
async function loadEditCharacters() {
  try {
    const response = await fetch("/characters-list");
    const data = await response.json();
    console.log("Characters data:", data); // Para debug

    if (data.status === "successful" && Array.isArray(data.results)) {
      const optionsContainers = document.querySelectorAll(".characterOptions");
      optionsContainers.forEach((optionsContainer) => {
        optionsContainer.innerHTML = data.results
          .map(
            (char) => `
            <div class="px-4 py-2 cursor-pointer text-white transition-all duration-200 hover:bg-slate-700/60" 
                 data-character-id="${char.id}" 
                 onclick="selectEditCharacter('${char.id}', '${char.nombre} ${char.apellido || ""}')">
              <span>${char.nombre} ${char.apellido || ""}</span>
            </div>
          `
          )
          .join("");
      });
    } else {
      console.error("Invalid data format for characters:", data);
    }
  } catch (error) {
    console.error("Error loading characters:", error);
  }
}

async function loadEditEvents() {
  try {
    const response = await fetch("/events-list");
    const data = await response.json();
    console.log("Events data:", data); // Para debug

    if (data.status === "successful" && Array.isArray(data.results)) {
      const optionsContainers = document.querySelectorAll(".eventOptions");
      optionsContainers.forEach((optionsContainer) => {
        optionsContainer.innerHTML = data.results
          .map(
            (event) => `
            <div class="px-4 py-2 cursor-pointer text-white transition-all duration-200 hover:bg-slate-700/60" 
                 data-event-id="${event.id}"
                 data-event-name="${event.nombre}" 
                 onclick="selectEditEvent('${event.id}', '${event.nombre}')">
              <span>${event.nombre}</span>
            </div>
          `
          )
          .join("");
      });
    } else {
      console.error("Invalid data format for events:", data);
    }
  } catch (error) {
    console.error("Error loading events:", error);
  }
}

async function loadEditLocations() {
  try {
    const response = await fetch("/locations-list");
    const data = await response.json();
    console.log("Locations data:", data); // Para debug

    if (data.status === "successful" && Array.isArray(data.results)) {
      const optionsContainers = document.querySelectorAll(".locationOptions");
      optionsContainers.forEach((optionsContainer) => {
        optionsContainer.innerHTML = data.results
          .map(
            (location) => `
            <div class="px-4 py-2 cursor-pointer text-white transition-all duration-200 hover:bg-slate-700/60" 
                 data-location-id="${location.id}"
                 data-location-name=${location.nombre}"
                 onclick="selectEditLocation('${location.id}', '${location.nombre}')">
              <span>${location.nombre}</span>
            </div>
          `
          )
          .join("");
      });
    } else {
      console.error("Invalid data format for locations:", data);
    }
  } catch (error) {
    console.error("Error loading locations:", error);
  }
}

async function loadEditObjects() {
  try {
    const response = await fetch("/objects-list");
    const data = await response.json();
    console.log("Objects data:", data); // Para debug

    if (data.status === "successful" && Array.isArray(data.results)) {
      const optionsContainers = document.querySelectorAll(".objectOptions");
      optionsContainers.forEach((optionsContainer) => {
        optionsContainer.innerHTML = data.results
          .map(
            (object) => `
            <div class="px-4 py-2 cursor-pointer text-white transition-all duration-200 hover:bg-slate-700/60" 
                 data-object-id="${object.id}" 
                 onclick="selectEditObject('${object.id}', '${object.nombre}')">
              <span>${object.nombre}</span>
            </div>
          `
          )
          .join("");
      });
    } else {
      console.error("Invalid data format for objects:", data);
    }
  } catch (error) {
    console.error("Error loading objects:", error);
  }
}

function updateSelectedEditCharactersDisplay() {
  const containers = document.querySelectorAll(".selectedCharacters");

  containers.forEach((container) => {
    container.innerHTML = "";

    selectedEditCharacterIds.forEach((id) => {
      const option = document.querySelector(`[data-character-id="${id}"]`);
      if (option) {
        const tag = document.createElement("div");
        tag.className = "px-3 py-1 bg-blue-400/20 text-blue-400 rounded-lg text-sm font-medium flex items-center gap-2";
        tag.innerHTML = `
                    <span>${option.textContent}</span>
                    <button type="button" class="hover:text-blue-200 transition-colors">
                        <i class="fa-solid fa-times"></i>
                    </button>
                `;
        tag.querySelector("button").addEventListener("click", () => removeEditCharacter(id));
        container.appendChild(tag);
      }
    });
  });

  const dropdownButtons = document.querySelectorAll(".characterDropdownButton");
  const count = selectedEditCharacterIds.size;
  dropdownButtons.forEach((dropdownButton) => {
    dropdownButton.querySelector("span").textContent = count > 0 ? `${count} personaje${count > 1 ? "s" : ""} seleccionado${count > 1 ? "s" : ""}` : "Seleccionar personajes";
  });
}

window.updateSelectedEditEventsDisplay = function() {
  const containers = document.querySelectorAll(".selectedEvents");

  containers.forEach((container) => {
    container.innerHTML = "";
    selectedEditEventIds.forEach((id) => {
      const eventName = document.querySelector(`[data-event-id="${id}"]`).getAttribute("data-event-name");
      const tag = document.createElement("div");
      tag.className = "px-3 py-1 bg-red-400/20 text-red-400 rounded-lg text-sm font-medium flex items-center gap-2";
      tag.innerHTML = `
                ${eventName}
                <button onclick="removeEditEvent('${id}')" class="hover:text-red-200 transition-colors">
                    <i class="fa-solid fa-times"></i>
                </button>
            `;
      container.appendChild(tag);
    });
  });

  const dropdownButtons = document.querySelectorAll(".eventDropdownButton");
  const count = selectedEditEventIds.size;
  dropdownButtons.forEach((dropdownButton) => {
    dropdownButton.querySelector("span").textContent = count > 0 ? `${count} evento${count > 1 ? "s" : ""} seleccionado${count > 1 ? "s" : ""}` : "Seleccionar eventos";
  });
}

function updateSelectedEditLocationsDisplay() {
  const containers = document.querySelectorAll(".selectedLocations");

  containers.forEach((container) => {
    container.innerHTML = "";
    selectedEditLocationIds.forEach((id) => {
      const option = document.querySelector(`[data-location-id="${id}"]`);
      if (option) {
        const tag = document.createElement("div");
        tag.className = "px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-lg text-sm font-medium flex items-center gap-2";
        tag.innerHTML = `
          <span>${option.textContent}</span>
          <button type="button" class="hover:text-yellow-200 transition-colors">
            <i class="fa-solid fa-times"></i>
          </button>
        `;
        tag.querySelector("button").addEventListener("click", () => removeEditLocation(id));
        container.appendChild(tag);
      }
    });
  });

  const dropdownButtons = document.querySelectorAll(".locationDropdownButton");
  const count = selectedEditLocationIds.size;
  dropdownButtons.forEach((dropdownButton) => {
    dropdownButton.querySelector("span").textContent = count > 0 ? `${count} localización${count > 1 ? "es" : ""} seleccionada${count > 1 ? "s" : ""}` : "Seleccionar localizaciones";
  });
}

function updateSelectedEditObjectsDisplay() {
  const containers = document.querySelectorAll(".selectedObjects");

  containers.forEach((container) => {
    container.innerHTML = "";
    selectedEditObjectIds.forEach((id) => {
      const option = document.querySelector(`[data-object-id="${id}"]`);
      if (option) {
        const tag = document.createElement("div");
        tag.className = "px-3 py-1 bg-green-400/20 text-green-400 rounded-lg text-sm font-medium flex items-center gap-2";
        tag.innerHTML = `
          <span>${option.textContent}</span>
          <button type="button" class="hover:text-green-200 transition-colors">
            <i class="fa-solid fa-times"></i>
          </button>
        `;
        tag.querySelector("button").addEventListener("click", () => removeEditObject(id));
        container.appendChild(tag);
      }
    });
  });

  const dropdownButtons = document.querySelectorAll(".objectDropdownButton");
  const count = selectedEditObjectIds.size;
  dropdownButtons.forEach((dropdownButton) => {
    dropdownButton.querySelector("span").textContent = count > 0 ? `${count} objeto${count > 1 ? "s" : ""} seleccionado${count > 1 ? "s" : ""}` : "Seleccionar objetos";
  });
}

// Funciones de toggle para los dropdowns
// Hacer las funciones de toggle accesibles globalmente
toggleCharacterDropdown = function () {
  const dropdowns = document.querySelectorAll(".characterDropdown");
  dropdowns.forEach((dropdown) => dropdown.classList.toggle("hidden"));
};

toggleEventDropdown = function () {
  const dropdowns = document.querySelectorAll(".eventDropdown");
  dropdowns.forEach((dropdown) => dropdown.classList.toggle("hidden"));
};

toggleLocationDropdown = function () {
  const dropdowns = document.querySelectorAll(".locationDropdown");
  dropdowns.forEach((dropdown) => dropdown.classList.toggle("hidden"));
};

toggleObjectDropdown = function () {
  const dropdowns = document.querySelectorAll(".objectDropdown");
  dropdowns.forEach((dropdown) => dropdown.classList.toggle("hidden"));
};

window.selectEditCharacter = function (id, name) {
  if (!id) return;
  const option = document.querySelector(`[data-character-id="${id}"]`);
  if (option && !selectedEditCharacterIds.has(id)) {
    option.classList.add("bg-blue-500/20");
    selectedEditCharacterIds.add(id);
    updateSelectedEditCharactersDisplay();
  }
};

window.selectEditEvent = function (id, name) {
  if (!id) return;
  const option = document.querySelector(`[data-event-id="${id}"]`);
  if (option && !selectedEditEventIds.has(id)) {
    option.classList.add("bg-red-500/20");
    selectedEditEventIds.add(id);
    updateSelectedEditEventsDisplay();
  }
};

window.selectEditLocation = function (id, name) {
  if (!id) return;
  const option = document.querySelector(`[data-location-id="${id}"]`);
  if (option && !selectedEditLocationIds.has(id)) {
    option.classList.add("bg-yellow-500/20");
    selectedEditLocationIds.add(id);
    updateSelectedEditLocationsDisplay();
  }
};

window.selectEditObject = function (id, name) {
  if (!id) return;
  const option = document.querySelector(`[data-object-id="${id}"]`);
  if (option && !selectedEditObjectIds.has(id)) {
    option.classList.add("bg-green-500/20");
    selectedEditObjectIds.add(id);
    updateSelectedEditObjectsDisplay();
  }
};

// Funciones de eliminación
// Hacer las funciones de eliminación accesibles globalmente
window.removeEditCharacter = function (id) {
  selectedEditCharacterIds.delete(id);
  const option = document.querySelector(`[data-character-id="${id}"]`);
  if (option) {
    option.classList.remove("bg-blue-500/20");
  }
  updateSelectedEditCharactersDisplay();
};

window.removeEditEvent = function (id) {
  selectedEditEventIds.delete(id);
  const option = document.querySelector(`[data-event-id="${id}"]`);
  if (option) {
    option.classList.remove("bg-red-500/20");
  }
  updateSelectedEditEventsDisplay();
};

window.removeEditLocation = function (id) {
  selectedEditLocationIds.delete(id);
  const option = document.querySelector(`[data-location-id="${id}"]`);
  if (option) {
    option.classList.remove("bg-yellow-500/20");
  }
  updateSelectedEditLocationsDisplay();
};

window.removeEditObject = function (id) {
  selectedEditObjectIds.delete(id);
  const option = document.querySelector(`[data-object-id="${id}"]`);
  if (option) {
    option.classList.remove("bg-green-500/20");
  }
  updateSelectedEditObjectsDisplay();
};

// Manejador para cerrar dropdowns al hacer clic fuera
document.addEventListener("click", function (event) {
  const dropdowns = [
    { button: ".characterDropdownButton", dropdown: ".characterDropdown" },
    { button: ".locationDropdownButton", dropdown: ".locationDropdown" },
    { button: ".objectDropdownButton", dropdown: ".objectDropdown" },
    { button: ".eventDropdownButton", dropdown: ".eventDropdown" },
  ];

  dropdowns.forEach(({ button, dropdown }) => {
    const dropdownEl = document.querySelector(dropdown);
    if (dropdownEl && !event.target.closest(button) && !event.target.closest(dropdown) && !dropdownEl.classList.contains("hidden")) {
      dropdownEl.classList.add("hidden");
    }
  });
});
