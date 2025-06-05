const to_search = document.getElementById('to_search');
const search_btn = document.getElementById('search_btn');
const checkboxes = document.querySelectorAll('.tag');

search_btn.addEventListener('click', function () {
    try {
        // gets the text writed in the input
        const valueInput = to_search.value;
        console.log(valueInput);
        // converts the list of checkboxes in an Array
        const checkboxArray = Array.from(checkboxes)
        // gets by filtrating only the checkboxes checked and for each one get the id
        const checked = checkboxArray.filter(checkboxes => checkboxes.checked).map(checkboxes => checkboxes.id)

        console.log(checked)
    } catch (error) {
        console.log('Error found: ', error)
    }

})