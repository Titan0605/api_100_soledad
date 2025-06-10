import { drawResults } from "./drawData.js";

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

        if (checked.length >= 0 && valueInput.length > 0) {
            document.getElementById('results_container').innerHTML = ``;
            document.getElementById('loading_symbol').classList.remove('hidden');
            document.getElementById('not_found').classList.add('hidden');            

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
                document.getElementById('loading_symbol').classList.add('hidden');
            } else {
                drawResults(results);
            }
        } else {
                document.getElementById('not_found').classList.remove('hidden');            
        }
    } catch (error) {
        console.log('Error found: ', error);
    }
});