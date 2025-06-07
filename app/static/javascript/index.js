const to_search = document.getElementById('to_search');
const search_btn = document.getElementById('search_btn');
const checkboxes = document.querySelectorAll('.tag');

search_btn.addEventListener('click', async function () {
    try {
        // gets the text writed in the input
        const valueInput = to_search.value;
        // converts the list of checkboxes in an Array
        const checkboxArray = Array.from(checkboxes)
        // gets by filtrating only the checkboxes checked and for each one get the id
        const checked = checkboxArray.filter(checkboxes => checkboxes.checked).map(checkboxes => checkboxes.id)

        console.log('To search: ', valueInput)
        console.log('Checked: ', checked)

        let data = {
            'query': valueInput,
            'filters': checked
        }

        if (checked.length > 0 && valueInput) {
            const response = await fetch("/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        }
    } catch (error) {
        console.log('Error found: ', error)
    }
});