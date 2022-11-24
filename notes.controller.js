const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
   const notes = await getNotes();

   const note = {
      title,
      id: Date.now().toString()
   };
   notes.push(note);
   await fs.writeFile(notesPath, JSON.stringify(notes));
   console.log(chalk.yellow('Note was added'));
}

async function getNotes() {
   const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
   return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNote(id) {
   const notes = await getNotes();
   const newNotes = notes.filter(n => n.id !== id)
   await fs.writeFile(notesPath, JSON.stringify(newNotes));
   console.log(chalk.red(`Note with id = ${id} was removed`));

}

async function editNote(id, title) {
   const notes = await getNotes();
   const newNotes = notes.map(n => {
      if (n.id === id) n.title = title
      return n
   })
   await fs.writeFile(notesPath, JSON.stringify(newNotes));
   console.log(chalk.blue(`Note with id = ${id} was edited, new title is - ${title}`));
}

// async function printNotes() {
//    const notes = await getNotes();
//    console.log(chalk.bgBlue('Here is the list of notes: '));
//    notes.forEach(note => console.log(chalk.red(note.id), chalk.blue(note.title)));
// }

module.exports = {
   addNote, getNotes, removeNote, editNote
};
