document.addEventListener('DOMContentLoaded', () => {
	const submitForm = document.querySelector('#add-person-form')
	const updateForm = document.querySelectorAll('form.update-person-form')
	const deleteBtn = document.querySelectorAll('.del')

	if (submitForm) {
		submitForm.addEventListener('submit', handleFormSubmit)
	}

	if (updateForm) {
		Array.from(updateForm).forEach((el) => {
			el.addEventListener('submit', updatePerson)
		})
	}

	if (deleteBtn) {
		Array.from(deleteBtn).forEach((el) => {
			el.addEventListener('click', deletePerson)
		})
	}
})

// Show a notification if required fields haven't been filled
function handleFormSubmit(event) {
	const required = ['name', 'description', 'lat', 'lon', 'file']
	const inputs = event.target.querySelectorAll('input[name], textarea[name]')
	const errors = []

	for (const input of inputs) {
		const isRequired = required.includes(input.name)
		const isEmpty = input.value === ''

		if (isRequired && isEmpty) {
			errors.push(input.name)
		}
	}

	if (errors.length > 0) {
		event.preventDefault() // Prevent form from submitting
		if (errors.includes('lat') || errors.includes('lon')) {
			notify(`Please select a location on the map`)
		} else {
			// Image is called 'file' so we need to replace it
			const fileIndex = errors.indexOf('file')
			if (fileIndex !== -1) {
				errors[fileIndex] = 'image'
			}

			notify(`The following fields cannot be empty: ${errors.join(', ')}`)
		}
	}
}

function notify(text) {
	const notification = document.querySelector('.notification')

	notification.textContent = text
	notification.classList.add(
		'show',
		'p-2',
		'font-semibold',
		'text-red-700',
		'bg-red-100'
	)
	setTimeout(
		() => {
			notification.classList.remove(
				'show',
				'p-2',
				'font-semibold',
				'text-red-700',
				'bg-red-100'
			)
			notification.textContent = ''
		},
		5000,
		notification
	)
}

// Update submitted persons
async function updatePerson(event) {
	event.preventDefault() // Prevent post request

	const fields = Array.from(
		event.target.querySelectorAll('input[name], textarea[name], select[name]')
	)
	const personIndex = fields.findIndex((field) => field.name === 'id')
	const personId = fields.splice(personIndex, 1)[0].value
	const requestBody = Object.fromEntries(
		fields.map((field) => {
			return [field.name, field.value]
		})
	)

	try {
		const response = await fetch(`/persons/updatePerson/${personId}`, {
			method: 'put',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(requestBody),
		})
		location.replace(`/persons/${personId}`)
	} catch (err) {
		console.error(err)
	}
}

// Delete submitted persons
/*/deletePerson/:id */
async function deletePerson(event) {
	const person = event.currentTarget.closest('[data-id]')
	const personId = person.dataset.id
	const page = new URL(window.location)

	try {
		const response = await fetch(`/persons/deletePerson/${personId}`, {
			method: 'DELETE',
		})
		const data = await response

		// If deleted on person page there is no page to redirect to
		if (page.pathname.startsWith('/persons/')) {
			location.replace('/profile')
		} else {
			location.reload()
		}
	} catch (err) {
		console.error(err)
	}
}
