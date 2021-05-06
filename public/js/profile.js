// Show a notification if a location hasn't been selected on the map
const required = ['name', 'description', 'lat', 'lon', 'file'];

document.addEventListener('DOMContentLoaded', ()=> {
	const submitForm = document.querySelector('#add-person-form');

	submitForm.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
	const inputs = event.currentTarget.querySelectorAll('input[name], textarea[name]');
	const errors = [];

	for(const input of inputs) {
		const isRequired = required.includes(input.name);
		const isEmpty = input.value === '';

		if(isRequired && isEmpty) {
			errors.push(input.name);
		}
	};

	if(errors.length > 0) {
		event.preventDefault(); // Prevent form from submitting
		if(errors.includes('lat') || errors.includes('lon')) {
			notify(`Error, please select a location on the map`);
		}
		else {
			// Image is called 'file' so we need to replace it
			const fileIndex = errors.indexOf('file');
			if(fileIndex !== -1) {
				errors[fileIndex] = 'image';
			}

			notify(`Error, the following fields cannot be empty: ${errors.join(' ')}`);
		}
	}
};

function notify(text) {
	const notification = document.querySelector('.notification');

	notification.textContent = text;
	notification.classList.add('show');
	setTimeout(() => {
		notification.classList.remove('show');
	}, 5000, notification);
}