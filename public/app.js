document.addEventListener('click', (event) => {
   const type = event.target.dataset.type
   if (type === 'remove') {
      const id = event.target.dataset.id
      remove(id).then(() => {
         event.target.closest('li').remove()
      })
   } else if (type === 'edit') {
      const id = event.target.dataset.id
      const titleNode = event.target.closest('li').firstElementChild
      const newTitle = prompt('Введите новое название', titleNode.textContent)?.trim()
      newTitle && edit(id, newTitle).then(() => {
         titleNode.textContent = newTitle
      })
   }
})

async function remove(id) {
   await fetch(`/${id}`, {method: 'DELETE'})
}

async function edit(id, newTitle) {
   await fetch(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify({title: newTitle}),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      }
   })
}
