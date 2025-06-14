export function drawResults(results) {
  document.getElementById("not_found").classList.add("hidden");
  document.getElementById("loading_symbol").classList.add("hidden");

  const results_container = document.getElementById("results_container");
  results_container.innerHTML = ``;

  console.log("Results: ", results);

  // for each result find the type of the result and chose the respective card
  results.results.forEach((result) => {
    const card = document.createElement("div");
    switch (result.type) {
      case "events":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-bold text-white">${result.nombre}</h2>
                            <a onclick="abrirEditModal('${result.type}', '${result._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                            </a>
                        </div>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-red-600 text-white px-2 py-1 rounded">Evento</span>                            
                            <span class="text-sm text-gray-300 px-2 py-1 rounded">Capitulo ${result.capitulo}</span>                            
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion ? result.descripcion : "Sin descripción disponible"}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Personajes involucrados:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.personajes_involucrados
                                ? result.personajes_involucrados
                                    .slice(0, 3)
                                    .map((personaje) => `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${personaje.nombre}</span>`)
                                    .join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Simbolismo:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${result.simbolismo && result.simbolismo[0] ? result.simbolismo[0] : "No disponible"}
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.importancia ? `Importancia ${result.importancia}` : ""}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button class="see_more text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value='${JSON.stringify(
                                  [result._id, result.type]
                                )}'>
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "characters":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-bold text-white">${result.nombre} ${result.apellido || ""}</h2>
                            <a onclick="abrirEditModal('${result.type}', '${result._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                            </a>
                        </div>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-blue-600 text-white px-2 py-1 rounded">Personaje</span>                            
                            <span class="text-sm text-gray-300 px-2 py-1 rounded">Generación ${result.generacion}</span>                            
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion_fisica ? result.descripcion_fisica.split(".")[0] + "." : "Sin descripción disponible"}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Personalidad:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.personalidad
                                ? result.personalidad
                                    .slice(0, 3)
                                    .map((personalidad) => `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${personalidad}</span>`)
                                    .join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Simbolismo:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${
                              result.simbolismo
                                ? result.simbolismo
                                    .slice(0, 3)
                                    .map((simbolismo) => `${simbolismo}`)
                                    .join(", ")
                                : "No disponible"
                            }
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.capitulos_aparicion ? `Aparece en ${result.capitulos_aparicion.length} capítulo(s)` : ""}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button class="see_more text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value='${JSON.stringify(
                                  [result._id, result.type]
                                )}'>
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "locations":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-bold text-white">${result.nombre}</h2>
                            <a onclick="abrirEditModal('${result.type}', '${result._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                            </a>
                        </div>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-green-600 text-white px-2 py-1 rounded">Lugar</span>
                            <span class="text-sm text-gray-300 px-2 py-1 rounded">${result.tipo}</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion || "Sin descripción disponible"}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Transformaciones:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.transformaciones
                                ? result.transformaciones
                                    .slice(0, 2)
                                    .map((t) => `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">Cap. ${t.capitulo}: ${t.estado}</span>`)
                                    .join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Simbolismo:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${result.simbolismo ? result.simbolismo.slice(0, 3).join(", ") : "No disponible"}
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.capitulos_aparicion ? `Aparece en ${result.capitulos_aparicion.length} capítulo(s)` : ""}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button class="see_more text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value='${JSON.stringify(
                                  [result._id, result.type]
                                )}'>
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "objects":
        console.log("objectos");
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-bold text-white">${result.nombre}</h2>
                            <a onclick="abrirEditModal('${result.type}', '${result._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                            </a>
                        </div>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-yellow-600 text-white px-2 py-1 rounded">Objeto</span>                                                        
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion ? result.descripcion : "Sin descripción disponible"}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Propietarios:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.propietarios
                                ? result.propietarios
                                    .slice(0, 3)
                                    .map((propietario) => `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${propietario.nombre}</span>`)
                                    .join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Simbolismo:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${
                              result.simbolismo
                                ? result.simbolismo
                                    .slice(0, 3)
                                    .map((simbolismo) => `${simbolismo}`)
                                    .join(", ")
                                : "No disponible"
                            }
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.capitulos_aparicion ? `Aparece en ${result.capitulos_aparicion.length} capítulo(s)` : ""}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button class="see_more text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value='${JSON.stringify(
                                  [result._id, result.type]
                                )}'>
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "chapters":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-bold text-white">${result.titulo}</h2>
                            <a onclick="abrirEditModal('${result.type}', '${result._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                            </a>
                        </div>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-purple-500 text-white px-2 py-1 rounded">Capítulo</span>
                            <span class="text-sm text-gray-300 px-2 py-1 rounded">Número: ${result.numero}</span>                                                       
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.resumen ? result.resumen : "Sin descripción disponible"}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Temas principales:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.temas_principales
                                ? result.temas_principales
                                    .slice(0, 3)
                                    .map((tema) => `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${tema}</span>`)
                                    .join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Eventos relacionados:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${
                              result.eventos_relacionados
                                ? result.eventos_relacionados
                                    .slice(0, 3)
                                    .map((evento) => `${evento.nombre}`)
                                    .join(", ")
                                : "No disponible"
                            }
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.numero ? `Aparece en el capitulo ${result.numero}.` : ""}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button class="see_more text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value='${JSON.stringify(
                                  [result._id, result.type]
                                )}'>
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "relationships":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-bold text-white">${result.tipo_relacion}</h2>
                            <a onclick="abrirEditModal('${result.type}', '${result._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                            </a>
                        </div>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-pink-600 text-white px-2 py-1 rounded">Relación</span>
                            <span class="text-sm text-gray-300 px-2 py-1 rounded">Capítulo ${result.capitulo_inicio}</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion || "Sin descripción disponible"}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Obstáculos:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.obstaculos
                                ? result.obstaculos.map((o) => `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${o}</span>`).join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Simbolismo:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${result.simbolismo ? result.simbolismo.join(", ") : "No disponible"}
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.consecuencias ? result.consecuencias[0] : ""}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button class="see_more text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value='${JSON.stringify(
                                  [result._id, result.type]
                                )}'>
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "dreams_visions":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-bold text-white">${result.tipo}</h2>
                            <a onclick="abrirEditModal('${result.type}', '${result._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                            </a>
                        </div>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-purple-600 text-white px-2 py-1 rounded">Sueño/Visión</span>
                            <span class="text-sm text-gray-300 px-2 py-1 rounded">Capítulo ${result.capitulo}</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion || "Sin descripción disponible"}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Elementos simbólicos:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.elementos_simbolicos
                                ? result.elementos_simbolicos.map((e) => `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${e}</span>`).join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Interpretación:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${result.interpretacion || "No disponible"}
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                Cumplimiento: ${result.cumplimiento || "N/A"}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button class="see_more text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value='${JSON.stringify(
                                  [result._id, result.type]
                                )}'>
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "symbols":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-bold text-white">${result.nombre}</h2>
                            <a onclick="abrirEditModal('${result.type}', '${result._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                            </a>
                        </div>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-indigo-600 text-white px-2 py-1 rounded">Símbolo</span>                            
                            <span class="text-sm text-gray-300 px-2 py-1 rounded">${result.tipo}</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Interpretaciones:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.interpretaciones
                                ? result.interpretaciones.map((i) => `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${i}</span>`).join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Elementos asociados:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.elementos_asociados
                                ? result.elementos_asociados.map((e) => `<span class="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">${e}</span>`).join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.capitulos_aparicion ? `Aparece en ${result.capitulos_aparicion.join(", ")}` : ""}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button class="see_more text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value='${JSON.stringify(
                                  [result._id, result.type]
                                )}'>
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      default:
        console.log("Not drawable: ", result.type);
        return;
    }
    results_container.appendChild(card);
    document.getElementById("results_container").classList.remove("hidden");
  });
}

document.getElementById("results_container").addEventListener("click", async function (e) {
  if (e.target && e.target.classList.contains("see_more")) {
    const [id, type] = JSON.parse(e.target.value);

    window.location.href = `/view/${id}/${type}`;
  }
});
