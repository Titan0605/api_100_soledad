export function drawResults(results) {
  document.getElementById("not_found").classList.add("hidden");
  document.getElementById("loading_symbol").classList.add("hidden");

  const results_container = document.getElementById("results_container");
  results_container.innerHTML = ``;

  console.log("Results: ", results);

    // for each result find the type of the result and chose the respective card
    results.results.forEach(result => {
        const card = document.createElement('div');
        switch (result.type) {
            case 'events':
                card.className = 'bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200'
                card.innerHTML = `<div class="mb-3">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-bold text-white">${result.nombre}</h2>
                            <a href="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
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
                                <button id="see_more" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value="${
                                  result._id
                                }">
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "characters":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <h2 class="text-xl font-bold text-white">${result.nombre} ${result.apellido || ""}</h2>
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
                                <button id="see_more" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value="${
                                  result._id
                                }">
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "locations":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <h2 class="text-xl font-bold text-white">${result.nombre} ${result.apellido || ""}</h2>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-green-500 text-white px-2 py-1 rounded">Localización</span>                                                        
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion ? result.descripcion : "Sin descripción disponible"}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Personajes Involucrados:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.personajes_asociados
                                ? result.personajes_asociados
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
                                <button id="see_more" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value="${
                                  result._id
                                }">
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
                        <h2 class="text-xl font-bold text-white">${result.nombre}</h2>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-yellow-500 text-white px-2 py-1 rounded">Objeto</span>                                                        
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
                                <button id="see_more" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value="${
                                  result._id
                                }">
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "chapters":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <h2 class="text-xl font-bold text-white">${result.titulo}</h2>
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
                                <button id="see_more" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value="${
                                  result._id
                                }">
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "relationships":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <h2 class="text-xl font-bold text-white">${result.nombre} ${result.apellido || ""} </h2>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-pink-500 text-white px-2 py-1 rounded">Relaciones</span>                                                                              
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion_fisica ? result.descripcion_fisica : "Sin descripción disponible"}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Relaciones:</p>
                        <div class="flex flex-wrap gap-2">
                            <ol class='list-disc pl-5'>
                            ${
                              result.relaciones
                                ? result.relaciones
                                    .slice(0, 3)
                                    .map((relacion) => `<li class="text-xs text-white px-2 py-1 rounded-full">${relacion.descripcion}. (${relacion.tipo})</li>`)
                                    .join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                            </ol>
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Transformación:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${result.transformacion ? result.transformacion : "No disponible"}
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.capitulos_aparicion ? `Aparece en ${result.capitulos_aparicion.length} capítulo(s)` : ""}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button id="see_more" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value="${
                                  result._id
                                }">
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "dreams_visions":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-cyan-500 text-white px-2 py-1 rounded">Sueño y/o vición</span>                            
                            <span class="text-sm text-gray-300 px-2 py-1 rounded">Soñador: ${result.soñador.nombre}</span>                            
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion ? result.descripcion : "Sin descripción disponible"}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Simbolismos:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.elementos_simbolicos
                                ? result.elementos_simbolicos
                                    .slice(0, 3)
                                    .map((simbolo) => `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${simbolo}</span>`)
                                    .join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Tipo:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${result.tipo ? result.tipo : "No disponible"}
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.capitulos_aparicion ? `Aparece en ${result.capitulos_aparicion.length} capítulo(s)` : ""}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button id="see_more" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value="${
                                  result._id
                                }">
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`;
        break;
      case "symbols":
        card.className = "bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200";
        card.innerHTML = `<div class="mb-3">
                        <h2 class="text-xl font-bold text-white">${result.nombre}</h2>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-orange-500 text-white px-2 py-1 rounded">Símbolo</span>                            
                            <span class="text-sm text-gray-300 px-2 py-1 rounded">Soñador: ${result.soñador}</span>                            
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Elementos asociados:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.elementos_asociados
                                ? result.elementos_asociados
                                    .slice(0, 3)
                                    .map((elemento) => `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${elemento}</span>`)
                                    .join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Interpretaciones:</p>
                        <div class="flex flex-wrap gap-2">
                            ${
                              result.interpretaciones
                                ? result.interpretaciones
                                    .slice(0, 3)
                                    .map((interpretacion) => `<li class="text-xs text-white px-2 py-1 rounded-full">${interpretacion}. (${interpretacion})</li>`)
                                    .join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Ubicación:</p>
                        <p class="text-gray-300 text-sm italic">
                            <div class="flex flex-wrap gap-2">
                            ${
                              result.personajes_afectados
                                ? result.personajes_afectados
                                    .slice(0, 3)
                                    .map((afectado) => `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${afectado}</span>`)
                                    .join("")
                                : '<span class="text-gray-400 text-xs">No disponible</span>'
                            }
                        </div>
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.capitulos_aparicion ? `Aparece en ${result.capitulos_aparicion.length} capítulo(s)` : ""}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button id="see_more" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value="${
                                  result._id
                                }">
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
