let checkboxes;
let items;

document.addEventListener('DOMContentLoaded', function () {
	items = document.querySelectorAll('li');

	items.forEach((li, i) => {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';

		const id = `item-${i}`

		const summary = li.querySelector('summary');
		if (summary) {
			summary.id = id;
		} else {
			li.id = id;
		}

		checkbox.setAttribute('aria-labelledby', id);
		li.prepend(checkbox);

		checkbox.addEventListener('change', (event) => {
			const action = event.target.checked ? 'add' : 'remove';
			event.target.parentElement.classList[action]('done');

			const values = Array.from(checkboxes).map(checkbox => checkbox.checked);
			localStorage.setItem(storageKey, JSON.stringify(values));
		});
	});

	checkboxes = document.querySelectorAll('li > input[type=checkbox]');
	const values = JSON.parse(localStorage.getItem(storageKey));
	if (values) {
		checkboxes.forEach((checkbox, i) => checkbox.checked = values[i]);
		items.forEach((item, i) => values[i] && item.classList.add('done'));
	}
});

function resetAll() {
	checkboxes.forEach(checkbox => checkbox.checked = false);
	items.forEach(item => item.classList.remove('done'));
	localStorage.clear(storageKey);
}

