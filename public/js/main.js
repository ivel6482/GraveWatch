const deleteBtn = document.querySelectorAll('.del')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deletePerson)
})
/*/deletePerson/:id */
async function deletePerson(event){
    const person = event.currentTarget.closest('[data-id]');
    const personId = person.dataset.id;
		const page = new URL(window.location);

    try{
        const response = await fetch(`/persons/deletePerson/${personId}`, {
            method: 'DELETE',
        });
        const data = await response;

				// If deleted on person page there is no page to redirect to
				if(page.pathname.startsWith('/persons/')) {
        	location.replace('/profile');
				}
				else {
					location.reload();
				}
    }catch(err){
        console.log(err)
    }
}


const updateForm = document.querySelectorAll('form.submissionform');

Array.from(updateForm).forEach((el) => {
  el.addEventListener('submit', updatePerson)
})

async function updatePerson(event) {
	event.preventDefault(); // Prevent post request

	const fields = Array.from(event.target.querySelectorAll('input, textarea, select'));
	const personIndex = fields.findIndex(field => {field.name === 'id'});
  const personId = fields.splice(personIndex, 1)[0].value;
	const requestBody = Object.fromEntries(fields.map(field => {
		return [field.name, field.value]
	}))

	try {
    const response = await fetch(`/persons/updatePerson/${personId}`, {
      method: 'put',
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify(requestBody),
    })
		// console.log(response)
    location.replace(`/persons/${personId}`);
  }
  catch (err) {
    console.log(err)
  }
}


// const updateBtn = document.querySelectorAll('.update')

// Array.from(updateBtn).forEach((el) => {
//     el.addEventListener('click', updatePerson)
// })

// async function updatePerson(event) {
// 	console.log(event)
//   // loop through them
//   const personId = document.querySelector('[name="id"]').value
//   const name = document.querySelector('[name="name"]').value
//   const description = document.querySelector('[name="description"]').value
//   const status = document.querySelector('[name="status"]').value
//   const hairColor = document.querySelector('[name="hairColor"]').value
//   const lastSeenDate = document.querySelector('[name="lastSeenDate"]').value
//   const sex = document.querySelector('[name="sex"]').value
//   const height = document.querySelector('[name="height"]').value
//   const dateOfBirth = document.querySelector('[name="dateOfBirth"]').value
//   const eyeColor = document.querySelector('[name="eyeColor"]').value
//   const placeOfBirth = document.querySelector('[name="placeOfBirth"]').value
//   const race = document.querySelector('[name="race"]').value
//   const picture = document.querySelector('[name="file"]').value
//   const lat = document.querySelector('[name="lat"]').value
//   const lon = document.querySelector('[name="lon"]').value
//   const id = document.querySelector('[name="id"]').value

// 	const fields = {
// 		name,
// 		description,
// 		status,
// 		hairColor,
// 		lastSeenDate,
// 		sex,
// 		height,
// 		dateOfBirth,
// 		eyeColor,
// 		placeOfBirth,
// 		race,
// 		lat,
// 		lon,
//     id,
// 		picture,
//   }

//   try {
//     const response = await fetch(`/persons/updatePerson/${personId}/`, {
//       method: 'put',
//       header: { 'Content-type': 'application/json'},
//       body: JSON.stringify(fields)
//     })
//     const data = await response.json()
//     console.log(data)
//     location.replace(`/persons/${personId}`);
//   }
//   catch (err) {
//     console.log(err)
//   }
// }
