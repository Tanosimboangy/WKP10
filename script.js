import faker from 'faker';

const tbody = document.querySelector('tbody');

let persons = Array.from({ length: 10 }, () => {
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
			(person, index) => `
    <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''}">
        <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td>${person.lastName}</td>
        <td>${person.firstName}</td>
        <td>${person.jobTitle}</td>
        <td>${person.jobArea}</td>
        <td>${person.phone}</td>
        <td>
            <button class="edit">
                <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            <button class="delete">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
        </td>
    </tr>`).join('');
};

const editPartner = (e) => {
	// code edit function here	
	editPartnerPopup(edit);
};

const button = e => {
	const edit = e.target.closest('.edit');
	console.log(edit);
	if (edit) {
		editPartnerPopup();
	}
}

const editPartnerPopup = (e) => {
	// create edit popup here
	const popup = document.createElement('form');
	popup.classList.add('popup');
	popup.insertAdjacentHTML('afterbegin', 
		`<fieldset>
			<label>Last Name</label>
			<input type="text" value="${faker.name.lastName()}">
			<label>First Name</label>
			<input type="text" value="${faker.name.firstName()}">
			<label>Job Title</label>
			<input type="text" value="${faker.name.jobTitle()}">
			<label>Job Area</label>
			<input type="text" value="${faker.name.jobArea()}">
			<label>Phone Number</label>
			<input type="text" value="${faker.phone.phoneNumber()}">
			<button type="submit" class="save">Save</button>
			<button type="submit" class="cancel">Cancel</button>
		</fieldset>`);	
    popup.classList.add('open');
	document.body.appendChild(popup);
};
window.addEventListener('click', button);























const deletePartner = () => {};

const deleteDeletePopup = () => {
	// create confirmation popup here
	// const popup = document.createElement('form');
	// popup.classList.add('popup');
	// popup.insertAdjacentHTML('afterbegin', 
	// 	`<fieldset>
	// 		<h2>Are you sure you want to delete this?</h2>
	// 		<button type="submit" class="delete">Delete</button>
	// 		<button type="submit" class="cancel">Cancel</button>
	// 	</fieldset>`);	
    // popup.classList.add('open');
	// document.body.appendChild(popup);
};

displayList(persons);
