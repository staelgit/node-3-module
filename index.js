const yargs = require('yargs');
const pkg = require('./package.json')
const { addNote, removeNote, printNotes, editNote } = require('./notes.controller')

yargs.version(pkg.version)

yargs.command({
   command: 'add',
   describe: 'Add new note to list',
   builder: {
      title: {
         type: 'string',
         describe: 'Note title',
         demandOption: true
      }
   },
   async handler({ title }) {
      await addNote(title);
   }
})

yargs.command({
   command: 'list',
   describe: 'Print all notes',
   async handler() {
      await printNotes();
   }
})

yargs.command({
   command: 'remove',
   describe: 'Remove note by id',
   builder: {
      id: {
         type: 'string',
         describe: 'id of the note to delete',
         demandOption: true
      }
   },
   async handler({ id }) {
      await removeNote(id);
   }
})

yargs.command({
   command: 'edit',
   describe: 'Edit note by id',
   builder: {
      title: {
         type: 'string',
         describe: 'Note title',
         demandOption: true
      },
      id: {
         type: 'string',
         describe: 'Note id',
         demandOption: true
      }
   },
   async handler({ id, title }) {
      await editNote(id, title);
   }
})



yargs.parse();
