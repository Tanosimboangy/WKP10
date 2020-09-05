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
        <td class="last_name">${person.lastName}</td>
        <td class="first_name">${person.firstName}</td>
        <td class="job_title">${person.jobTitle}</td>
        <td class="job_area">${person.jobArea}</td>
        <td class="phone">${person.phone}</td>
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


const editPartner = e => {
	// Grabbing the edit button with event delegation
	const edit = e.target.closest(".edit");
	console.log(edit);
	if (edit) {
		editPartnerPopup();
	}
}

// Grabbing the tr elements in order to get the value inside
	// const lastname = e.target.matches(".last_name");
	// const firstname = e.target.matches(".first_name");
	// const jobtitle = e.target.matches(".job_title");
	// const jobarea = e.target.matches(".job_area");
	// const phonenumber = e.target.matches(".phone");

	// console.log(lastname, firstname, jobtitle, jobarea, phonenumber);

// const cancel = e => {
// 	// Activating the cancel button
// 	const cancel = e.target.closest(".cancel");
// 	if (cancel) {
// 		destroyPopup();
// 	}
// 	console.log(cancel);
// }
// async function destroyPopup(popup) {
//     popup.classList.remove("open");
// }

const editPartnerPopup = (e) => {
	// create edit popup here
	const popup = document.createElement('form');
	popup.classList.add('popup');
	// Insert the html inside of the popup form
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
	// Append the popup inside of the html 
	document.body.appendChild(popup);
};

// code delete function here
const deletePartner = e => {
	// Grabbing the delete button with event delegation
	const remove = e.target.closest(".delete");
	console.log(remove);
	if (remove) {
		deleteDeletePopup(remove);
	}
}

const deleteDeletePopup = (e) => {
	return new Promise(async function(resolve) {
		// create confirmation popup here
	const popup = document.createElement('form');
	popup.classList.add('popup');
	// Insert the html inside of the popup form
	popup.insertAdjacentHTML('afterbegin', 
		`<fieldset>
			<h2>Are you sure you want to delete this?</h2>
	</fieldset>`);	
	popup.classList.add('open');
	// Append the popup inside of the html 
	document.body.appendChild(popup);
	});	
};


// const deleteBtn = document.createElement('button');
// 	deleteBtn.classList.add("remove");
// 	deleteBtn.textContent = "Delete";
// 	deleteBtn.type = "button";
// 	popup.appendChild(deleteBtn);
// 	deleteBtn.addEventListener('click', remove);
// 	console.log(deleteBtn);

// 	const cancelBtn = document.createElement('button');
// 	cancelBtn.classList.add("cancel");
// 	cancelBtn.textContent = "cancel";
// 	cancelBtn.type = "button";
// 	popup.appendChild(cancelBtn);
// 	cancelBtn.addEventListener('click', reset);
// 	console.log(cancelBtn);

{/* <button type="submit" class="remove">Delete</button>
<button type="submit" class="cancel">Cancel</button> */}

displayList(persons);
window.addEventListener('click', editPartner);
window.addEventListener('click', deletePartner);



// const cancelButton  = document.createElement("button");
//     cancelButton.type = "button";
//     cancelButton.textContent = "cancel";
//     const yesButton  = document.createElement("button");
//     yesButton.type = "button";
//     yesButton.textContent = "yes";
//     //append the buttons to the div popup
//     deletePopup.appendChild(yesButton);
//     deletePopup.appendChild(cancelButton);
//     deletePopup.classList.add("open");
//     //append the div popup to the document
//     document.body.appendChild(deletePopup);
//     yesButton.addEventListener("click", (e) => {
//       //take who gets clicked
//       const deletedPerson = tbody.querySelector(`[value="${person.id}"]`);
//       // and remove him
//       deletedPerson.remove();
//       deletePopup.classList.remove("open");
//     });