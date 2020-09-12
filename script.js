import faker from 'faker';
const tbody = document.querySelector('tbody');
function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let persons = Array.from({ length: 4 }, () => {
	return {
		id: faker.random.uuid(),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		jobTitle: faker.name.jobTitle(),
		jobArea: faker.name.jobArea(),
		phone: faker.phone.phoneNumber(),
		picture: faker.image.avatar(100, 100),
	};
});
const displayList = data => {
	tbody.innerHTML = data
	.map(
		(person, index) => 
	`<tr data-id="${person.id}" class="${index % 2 ? 'even' : ''} container">
        <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td class="last_name">${person.lastName}</td>
        <td class="first_name">${person.firstName}</td>
        <td class="job_title">${person.jobTitle}</td>
        <td class="job_area">${person.jobArea}</td>
        <td class="phone">${person.phone}</td>
        <td>
            <button class="edit" data-id="${person.id}">
                <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            <button class="delete" data-id="${person.id}">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
        </td>
    </tr>`).join('');
};
const editPartner = (e) => {
	const editButton = e.target.closest(".edit");
	if (editButton) {
		const tableRow = e.target.closest('.container');
		const idToEdit = tableRow.dataset.id;
		console.log(idToEdit);
		 editPartnerPopup(idToEdit)
	}	
};

async function destroyPopup(popup) {
	popup.classList.remove('open');
	popup.remove();
}

const editPartnerPopup = idToEdit => {
	const editpersons = persons.find(person => person.id === idToEdit);
	console.log(editpersons);
	return new Promise(async resolve => {
	const popup = document.createElement('form');
	popup.classList.add('popup');
	popup.insertAdjacentHTML('afterbegin', 
		`<fieldset>
			<label>Last Name</label>
			<input type="text" name="lastName" value="${editpersons.lastName}">
			<label>First Name</label>
			<input type="text" name="firstName" value="${editpersons.firstName}">
			<label>Job Title</label>
			<input type="text" name="jobTitle" value="${editpersons.jobTitle}">
			<label>Job Area</label>
			<input type="text" name="jobArea" value="${editpersons.jobArea}">
			<label>Phone Number</label>
			<input type="text" name="phone" value="${editpersons.phone}">
			<button class="submit" data-id="${editpersons.id}">Submit</button>
		</fieldset>`);

		const CancelButton = document.createElement('button');
		CancelButton.type = 'button';
		CancelButton.classList.add('cancel');
		CancelButton.textContent = 'cancel';
		popup.appendChild(CancelButton);
		CancelButton.addEventListener('click', () => { resolve();
				destroyPopup(popup);
			},	{ once: true });

		popup.addEventListener('submit', e => { 
			e.preventDefault();
			editpersons.firstName = popup.firstName.value;
			editpersons.lastName = popup.lastName.value;
			editpersons.jobTitle = popup.jobTitle.value;
			editpersons.jobArea = popup.jobArea.value;
			editpersons.phone = popup.phone.value;
			displayList(persons);
			destroyPopup(popup);
		}, { once: true });
		document.body.appendChild(popup);
		popup.classList.add('open');
	});
};







// code delete function here
const deletePartner = e => {
	// Grabbing the delete button with event delegation
	const remove = e.target.closest(".delete");
	console.log(remove);
	if (remove) {
		const list = remove.closest('tr');
		const id = list.dataset.id;
		deleteDeletePopup(id);
	}
}

const deleteDeletePopup = (id) => {
	return new Promise(async function(resolve) {
	// create confirmation popup here
	const popup = document.createElement('form');
	popup.classList.add('popup');
	// Insert the html inside of the popup form
	popup.insertAdjacentHTML('afterbegin', 
			`<h2>Are you sure you want to delete this?</h2>`);	

		const button = document.createElement("button");
		button.textContent = "delete"
		popup.appendChild(button);
		popup.classList.add('open');
		button.addEventListener("click", (e) => {
			e.preventDefault();
			persons = persons.filter(person => person.id !== id);
			displayList(persons);
			popup.classList.remove("open");
		});

		// const button = document.createElement("button");
		// button.textContent = "cancel"
		// popup.appendChild(button);
		// button.addEventListener("click", (e) => {
		// 	e.preventDefault();
		// 	destroyPopup();
		// 	popup.classList.remove("open")
		// 	console.log(e);
		// });
	// Append the popup inside of the html 
	document.body.appendChild(popup);
	});
};

 displayList(persons);
window.addEventListener('click', editPartner);
window.addEventListener('click', deletePartner);