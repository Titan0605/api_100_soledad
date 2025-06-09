const to_search = document.getElementById('to_search');
const search_btn = document.getElementById('search_btn');
const checkboxes = document.querySelectorAll('.tag');

search_btn.addEventListener('click', async function (event) {
    event.preventDefault();
    try {
        const valueInput = to_search.value;
        const checkboxArray = Array.from(checkboxes);
        const checked = checkboxArray
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        console.log('To search: ', valueInput);
        console.log('Checked: ', checked);

        let data = {
            'query': valueInput,
            'filters': checked
        };

        if (checked.length > 0 && valueInput) {
            const response = await fetch("/general-search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const results = await response.json();

            if (results.message != 'Search successful') {
                document.getElementById('results_container').classList.add('hidden');
                document.getElementById('not_found').classList.remove('hidden');
            } else {
                drawResults(results);
            }
        }
    } catch (error) {
        console.log('Error found: ', error);
    }
});


function drawResults(results) {
    document.getElementById('not_found').classList.add('hidden');
    const results_container = document.getElementById('results_container');
    results_container.innerHTML = ``

    console.log('Results: ', results);

    // for each result find the type of the result and chose the respective card
    results.results.forEach(result => {
        const card = document.createElement('div');
        switch (result.type) {
            case 'events':
                card.className = 'bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200'
                card.innerHTML = `<div class="mb-3">
                        <h2 class="text-xl font-bold text-white">${result.nombre}</h2>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-red-600 text-white px-2 py-1 rounded">Evento</span>                            
                            <span class="text-sm bg-purple-600 text-white px-2 py-1 rounded">Capitulo ${result.capitulo}</span>                            
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion ? result.descripcion : 'Sin descripción disponible'}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Personajes involucrados:</p>
                        <div class="flex flex-wrap gap-1">
                            ${result.personajes_involucrados ? result.personajes_involucrados.slice(0, 3).map(personaje =>
                                    `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${personaje.nombre}</span>`
                                ).join('') : '<span class="text-gray-400 text-xs">No disponible</span>'}
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Simbolismo:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${result.simbolismo && result.simbolismo[0] ? result.simbolismo[0] : 'No disponible'}
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.importancia ? `Importancia ${result.importancia}` : ''}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button id="see_more" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value="${result._id}">
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`
                break;
            case 'characters':
                card.className = 'bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200'
                card.innerHTML = `<div class="mb-3">
                        <h2 class="text-xl font-bold text-white">${result.nombre} ${result.apellido || ''}</h2>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-blue-600 text-white px-2 py-1 rounded">Personaje</span>                            
                            <span class="text-sm bg-purple-600 text-white px-2 py-1 rounded">Generación ${result.generacion}</span>                            
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion_fisica ? result.descripcion_fisica.split('.')[0] + '.' : 'Sin descripción disponible'}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Personalidad:</p>
                        <div class="flex flex-wrap gap-1">
                            ${result.personalidad ? result.personalidad.slice(0, 3).map(personalidad =>                            
                                    `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${personalidad}</span>`
                                ).join('') : '<span class="text-gray-400 text-xs">No disponible</span>'}
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Simbolismo:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${result.simbolismo ? result.simbolismo.slice(0, 3).map(simbolismo =>                                
                                `${simbolismo}` 
                            ).join(', ') : 'No disponible'}
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.capitulos_aparicion ? `Aparece en ${result.capitulos_aparicion.length} capítulo(s)` : ''}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button id="see_more" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value="${result._id}">
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`
                break;
            case 'locations':
                card.className = 'bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200'
                card.innerHTML = `<div class="mb-3">
                        <h2 class="text-xl font-bold text-white">${result.nombre} ${result.apellido || ''}</h2>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-green-500 text-white px-2 py-1 rounded">Localización</span>                                                        
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion ? result.descripcion.slice(0, result.descripcion.length) : 'Sin descripción disponible'}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Personajes Involucrados:</p>
                        <div class="flex flex-wrap gap-1">
                            ${result.personajes_asociados ? result.personajes_asociados.slice(0, 3).map(personaje =>
                                    `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${personaje.nombre}</span>`
                                ).join('') : '<span class="text-gray-400 text-xs">No disponible</span>'}
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Simbolismo:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${result.simbolismo ? result.simbolismo.slice(0, 3).map(simbolismo =>                                
                                `${simbolismo}` 
                            ).join(', ') : 'No disponible'}
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.capitulos_aparicion ? `Aparece en ${result.capitulos_aparicion.length} capítulo(s)` : ''}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button id="see_more" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value="${result._id}">
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`
                break
            case 'objects':
                card.className = 'bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200'
                card.innerHTML = `<div class="mb-3">
                        <h2 class="text-xl font-bold text-white">${result.nombre} ${result.apellido || ''}</h2>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm bg-yellow-500 text-white px-2 py-1 rounded">Objeto</span>                                                        
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-gray-300 text-sm leading-relaxed">
                            ${result.descripcion ? result.descripcion.slice(0, result.descripcion.length) : 'Sin descripción disponible'}
                        </p>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Propietarios:</p>
                        <div class="flex flex-wrap gap-1">
                            ${result.propietarios ? result.propietarios.slice(0, 3).map(propietario =>
                                    `<span class="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">${propietario.nombre}</span>`
                                ).join('') : '<span class="text-gray-400 text-xs">No disponible</span>'}
                        </div>
                    </div>
                    <div class="mb-3">
                        <p class="text-white font-semibold text-sm mb-1">Simbolismo:</p>
                        <p class="text-gray-300 text-sm italic">
                            ${result.simbolismo ? result.simbolismo.slice(0, 3).map(simbolismo =>                                
                                `${simbolismo}` 
                            ).join(', ') : 'No disponible'}
                        </p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-400">
                                ${result.capitulos_aparicion ? `Aparece en ${result.capitulos_aparicion} capítulo(s)` : ''}
                            </span>
                            <span class="text-xs text-blue-400 font-medium">
                                <button id="see_more" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" value="${result._id}">
                                    Ver más
                                </button>
                            </span>
                        </div>
                    </div>`
            default:
                break;
        }
        results_container.appendChild(card);
    });
}