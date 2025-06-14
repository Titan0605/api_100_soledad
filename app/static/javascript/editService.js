async function abrirEditModal(type, id) {
  const modal = document.getElementById("customEditModal");
  modal.classList.remove("hidden");

  const formId = `formEdit${type}`;
  const form = document.getElementById(formId);
  form.classList.remove("hidden");

  const response = await fetch(`/search-specific-${type}/${id}`, {
    method: "GET",
  });
  const { results } = await response.json();
  const data = Array.isArray(results) ? results[0] : results;

  Object.entries(data).forEach(([key, value]) => {
    const element = form.querySelector(`[name="${key}"]`);
    if (!element) return;

    let formattedValue = value;

    if (value === null) {
      formattedValue = "";
    }

    // Special case for "transformaciones"
    else if (key === "transformaciones" && Array.isArray(value)) {
      formattedValue = value.map(t => `${t.capitulo}: ${t.descripcion}`).join("\n");
    }

    // If it's a plain object like muerte or character ref
    else if (typeof value === "object" && !Array.isArray(value)) {
      if (value.type === "characters" || value.type === "events" || value.type === "locations") {
        formattedValue = value.nombre || value.titulo || "";
      } else if (key === "muerte") {
        formattedValue = `${value.capitulo}: ${value.circunstancias}`;
      }
    }

    // General array handler
    else if (Array.isArray(value)) {
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

    if (element.tagName === "TEXTAREA" || element.tagName === "INPUT" || element.tagName === "SELECT") {
      console.log("Entro en textarea, input o select, " + key);
      element.value = formattedValue;
    }
  });
}


document.querySelector("#customEditModal button.bg-green-600").addEventListener("click", async function () {
  // 1) Detectar qué formulario de edición está visible
  const formIds = [
    "formEditevents",
    "formEditcharacters",
    "formEditobjects",
    "formEditlocations",
    "formEditchapters",
    "formEditdreams_visions",
    "formEditrelationships",
    "formEditsymbols"
  ];
  const activeFormId = formIds.find(fid => !document.getElementById(fid).classList.contains("hidden"));
  if (!activeFormId) {
    alert("No hay formulario activo");
    return;
  }

  // 2) Obtener collection a partir del id del form
  //    Ej: formEventEdit → events
  collection = ""
  // 3) Obtener el ID del objeto (hidden input con id `${activeFormId}Id`)
  console.log(activeFormId)
  const form = document.getElementById(activeFormId);
  const idInput = form.querySelector('input[name="_id"]');
  const id = idInput ? idInput.value : "";

  if (!id) {
    alert("Falta el ID en el formulario");
    return;
  }

  // 4) Armar el dictionary leyendo cada campo según tu getActiveFormData
  //    Aquí repetimos tu lógica por formulario:

  console.log(activeFormId)
  let dictionary = {};
  switch (activeFormId) {
    case "formEditevents":
      collection = "events"
      dictionary = {
        nombre:           document.getElementById("eventEditName").value,
        descripcion:      document.getElementById("eventEditDescription").value,
        capitulo:         parseInt(document.getElementById("eventEditChapter").value),
        importancia:      parseInt(document.getElementById("eventEditImportance").value),
        tipo:             document.getElementById("eventEditType").value,
        fecha_narrativa:  document.getElementById("eventEditDate").value,
        personajes_involucrados: Array.from(selectedCharacterIds),
        localizaciones:   document.getElementById("eventEditLocations").value.split(",").map(l => l.trim()),
        objetos_relacionados:  document.getElementById("eventEditObjects").value.split(",").map(o => o.trim()),
        simbolismo:       document.getElementById("eventEditSymbolism").value.split(",").map(s => s.trim()),
        consecuencias:    document.getElementById("eventEditConsequences").value.split(",").map(c => c.trim()),
        palabras_clave:   document.getElementById("eventEditKeywords").value.split(",").map(k => k.trim()),
        texto_completo:   document.getElementById("eventEditFullText").value
      };
      break;
    case "formEditcharacters":
      collection = "characters"
      dictionary = {
        nombre:               document.getElementById("characterEditFirstName").value,
        apellido:             document.getElementById("characterEditLastName").value,
        descripcion_fisica:   document.getElementById("characterEditPhysicalDescription").value,
        generacion:           parseInt(document.getElementById("characterEditGeneration").value),
        personalidad:         document.getElementById("characterEditPersonality").value.split(",").map(p => p.trim()),
        capitulos_aparicion:  document.getElementById("characterEditChapters").value.split(",").map(c => parseInt(c.trim())),
        eventos_principales:  document.getElementById("characterEditEvents").value.split(",").map(e => e.trim()),
        transformacion:       document.getElementById("characterEditTransformation").value,
        muerte: {
          capitulo:           parseInt(document.getElementById("characterEditDeathChapter").value) || null,
          circunstancias:     document.getElementById("characterEditDeathCircumstances").value,
          simbolismo:         document.getElementById("characterEditDeathSymbolism").value
        },
        simbolismo:           document.getElementById("characterEditSymbolism").value.split(",").map(s => s.trim()),
        palabras_clave:       document.getElementById("characterEditKeywords").value.split(",").map(k => k.trim())
      };
      break;
    case "formEditobjects":
      collection = "objects"
      dictionary= {
         nombre: document.getElementById("objectEditName").value,
        tipo: document.getElementById("objectEditType").value,
        descripcion: document.getElementById("objectEditDescription").value,
        capitulos_aparicion: document
          .getElementById("objectEditChapters")
          .value.split(",")
          .map((c) => parseInt(c.trim())),
        propietarios: Array.from(selectedCharacterIds),
        ubicacion_fisica: document.getElementById("objectEditLocation").value,
        simbolismo: document
          .getElementById("objectEditSymbolism")
          .value.split(",")
          .map((s) => s.trim()),
        transformaciones: document.getElementById("objectEditTransformations").value.split('\n').map(t => ({
            capitulo: parseInt(t.split(':')[0].trim()),
            descripcion: t.split(':')[1].trim()
            })),
        importancia_narrativa: parseInt(document.getElementById("objectEditImportance").value),
        palabras_clave: document
          .getElementById("objectEditKeywords")
          .value.split(",")
          .map((k) => k.trim()),

      }
      break;
    case "formEditlocations":
      collection = "locations"
      dictionary= {
        nombre: document.getElementById("locationEditName").value,
        tipo: document.getElementById("locationEditType").value,
        descripcion: document.getElementById("locationEditDescription").value,
        capitulos_aparicion: document
          .getElementById("locationEditChapters")
          .value.split(",")
          .map((c) => parseInt(c.trim())),
        eventos_importantes: Array.from(selectedEventIds),
        simbolismo: document
          .getElementById("locationEditSymbolism")
          .value.split(",")
          .map((s) => s.trim()),
        transformaciones: document.getElementById("locationEditTransformations").value.split('\n').map(t => ({
            capitulo: parseInt(t.split(':')[0].trim()),
            descripcion: t.split(':')[1].trim()
            })),
        personajes_asociados: Array.from(selectedCharacterIds),
        palabras_clave: document
          .getElementById("locationEditKeywords")
          .value.split(",")
          .map((k) => k.trim()),
      }
      break;
    case "formEditchapters":
        collection = "chapters"
        dictionary={
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
        eventos_relacionados: Array.from(selectedEventIds),
        }
      break;
    case "formEditdreams_visions":
        collection = "dreams_visions"
        dictionary = {
          soñador: Array.from(selectedCharacterIds),
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
        }
      break;
    case "formEditrelationships":
      collection = "relationships"
      dictionary = {
        personaje1: Array.from(selectedCharacterIds)[0],
        personaje2: Array.from(selectedCharacterIds)[1],
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
      }
      break;
    case "formEditsymbols":
      collection = "symbols"
      dictionary = {
        nombre: document.getElementById("symbolEditName").value,
        tipo: document.getElementById("symbolEditType").value,
        capitulos_aparicion: document
          .getElementById("symbolEditChapters")
          .value.split(",")
          .map((c) => parseInt(c.trim())),
        interpretaciones: document
          .getElementById("symbolEditInterpretations")
          .value.split("\n")
          .map((i) => i.trim()),
        elementos_asociados: document
          .getElementById("symbolEditElements")
          .value.split(",")
          .map((e) => e.trim()),
        personajes_afectados: Array.from(selectedCharacterIds),
        eventos_relacionados: Array.from(selectedEventIds),
        palabras_clave: document
          .getElementById("symbolEditKeywords")
          .value.split(",")
          .map((k) => k.trim()),
      }
      break;
    // ... y así para cada formulario: formObjectEdit, formLocationEdit, etc.
    // Copia tu lógica de getFormData y ajusta los IDs de los campos añadiendo o quitando "Edit" según corresponda.
  }

  // 5) Enviar el PUT con id, collection y dictionary
  try {
    const res = await fetch("/general-update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, collection, dictionary })
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
