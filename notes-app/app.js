const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./note.js');

// const result = getNotes();

// console.log(result);
// console.log(validator.isURL('https://exampleexample.com'));
// console.log(chalk.inverse.green('Hello world!'));

// const command = process.argv[2];
// if (command === 'add') {
//   console.log('Adding notes');
// }


// YARGS
  yargs.version('1.2.1');
  yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
      },
      body: {
        describe: 'Note body',
        demandOption: true,
        type: 'string'
      }
    },
    handler(argv) {
      notes.addNote(argv.title, argv.body);
    }
  });

  yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
      }
    },
    handler(argv) {
      notes.removeNote(argv.title);
    }
  });

  yargs.command({
    command: 'list',
    describe: 'Displaing list of notes',
    handler() {
      notes.listNotes();
    }
  });

  yargs.command({
    command: 'read',
    describe: 'Read notes',
    builder: {
      title: {
        describe: 'Reading a note',
        demandOption: true,
        type: 'string'
      }
    },
    handler(argv) {
      notes.readNotes(argv.title);
    }
  });



  yargs.parse();

// YARGS END
