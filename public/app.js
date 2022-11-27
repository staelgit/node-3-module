const notesListNode = document.querySelector('.notes-list');

notesListNode.addEventListener('click', (event) => {
   const type = event.target.dataset.type;

   if (type === 'remove') {
      const id = event.target.dataset.id;
      remove(id).then(() => {
         event.target.closest('li').remove();
      });
   } else if (type === 'update') {
      toggleEditFormVisibility(event.target.closest('li'));
   }
});

notesListNode.addEventListener('submit', (event) => {
   event.preventDefault();
   const parentNode = event.target.closest('li');
   toggleEditFormVisibility(parentNode);

   const id = event.target.dataset.id;
   const formElem = notesListNode.querySelector(`form[data-id="${id}"]`);
   const titleNode = parentNode.querySelector('.note__title');
   const inputNode = formElem.querySelector(`input`);
   const newTitle = new FormData(formElem).get('title')?.trim();
   const title = inputNode.dataset.initialValue;

   if (!newTitle) formElem.reset();

   if (newTitle && newTitle !== title) {
      titleNode.textContent = newTitle;
      inputNode.dataset.initialValue = newTitle;
      inputNode.setAttribute('value', newTitle);
      edit(id, newTitle).catch((err) => {
         console.log(err);
         formElem.reset();
         titleNode.textContent = title;
         inputNode.dataset.initialValue = title;
         inputNode.setAttribute('value', title);
         toggleEditFormVisibility(parentNode);
      });
   }
});

notesListNode.addEventListener('reset', (event) => {
   toggleEditFormVisibility(event.target.closest('li'));
});

function toggleEditFormVisibility(parentNode) {
   ['.note', '.edit-form'].forEach((c) =>
      parentNode.querySelector(c).classList.toggle('d-none')
   );
}

async function remove(id) {
   await fetch(`/${id}`, { method: 'DELETE' });
}

async function edit(id, newTitle) {
   await fetch(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title: newTitle }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8'
      }
   });
}
