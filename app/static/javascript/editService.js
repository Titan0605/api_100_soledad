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

    // Handle null values
    if (value === null) {
      formattedValue = "";
    }
    // Handle complex objects (like relations, death info, transformations)
    else if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      if (value.type === "characters" || value.type === "events" || value.type === "locations") {
        formattedValue = value.nombre || value.titulo || "";
      } else if (key === "muerte") {
        formattedValue = `${value.capitulo}: ${value.circunstancias}`;
      } else if (key === "transformaciones") {
        formattedValue = value.map((t) => `${t.capitulo}: ${t.estado}`).join(", ");
      }
    }
    // Handle arrays (personajes_involucrados, eventos_principales, etc)
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
      element.value = formattedValue;
    }
  });
}

document.querySelector("#customEditModal button.bg-green-600").addEventListener("click", async function () {
  const visibleForm = Array.from(document.querySelectorAll("[id^=formEdit]")).find((f) => !f.classList.contains("hidden"));
  if (!visibleForm) return;

  const formData = {};
  const inputs = visibleForm.querySelectorAll("input, select, textarea");

  let id = "";
  let collection = "";

  inputs.forEach((el) => {
    const name = el.name;
    if (!name) return;

    let value = el.value;

    if (el.type === "number") {
      value = parseFloat(value);
    } else if (el.type === "checkbox") {
      value = el.checked;
    } else if (el.tagName === "TEXTAREA" || el.tagName === "INPUT" || el.tagName === "SELECT") {
      if (value.includes(",")) value = value.split(",").map((v) => v.trim());
    }

    if (name === "_id") {
      id = value;
    } else if (name === "type") {
      collection = value;
    } else {
      formData[name] = value;
    }
  });

  if (!id || !collection) {
    alert("Error: Missing ID or type to update.");
    return;
  }

  try {
    const response = await fetch("/general-update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        collection: collection,
        dictionary: formData,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Datos actualizados correctamente");
      document.getElementById("customEditModal").classList.add("hidden");
      visibleForm.classList.add("hidden");
    } else {
      alert("Error: " + result.message);
    }
  } catch (error) {
    console.error("Update error:", error);
    alert("Error al actualizar");
  }
});
