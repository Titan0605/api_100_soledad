async function abrirEditModal(type, id) {
    const modal = document.getElementById('customEditModal');
    modal.classList.remove('hidden');

    const formId = `formEdit${type}`;
    const form = document.getElementById(formId);
    form.classList.remove("hidden")

    const response = await fetch(`/search-specific-${type}/${id}`, {
        method: 'GET',
    });
    const { results } = await response.json();
    const data = Array.isArray(results) ? results[0] : results;

    Object.entries(data).forEach(([key, value]) => {
    const element = form.querySelector(`[name="${key}"]`);
    if (!element) return;

    let formattedValue = value;

    if (typeof formattedValue === "object" && formattedValue !== null && formattedValue.type === "characters") {
        formattedValue = formattedValue.nombre;
    }

    if (Array.isArray(value)) {
        formattedValue = value.map(item =>
            typeof item === 'object' ? (item.nombre || item.titulo || item._id || '') : item
        ).join(', ');
    }

    if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT' || element.tagName === 'SELECT') {
        element.value = formattedValue;
    }
});

}