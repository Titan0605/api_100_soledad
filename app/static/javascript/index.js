const to_search = document.getElementById('to_search');
const search_btn = document.getElementById('search_btn');
const checkboxes = document.querySelectorAll('.tag');

search_btn.addEventListener('click', async function () {
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
            console.log(await response.json())
        }
    } catch (error) {
        console.log('Error found: ', error);
    }
});
