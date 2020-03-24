const notes = require("./notes.js");
const chalk = require("chalk");
const yargs = require("yargs");
const fs = require("fs");
const clear = require("clear");

yargs.version("1.1.0");

// add command
yargs.command({
  command: "add",
  describe: "add a new note (--title and --body are required.)",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "short description of the item",
      demandOption: true,
      type: "string"
    }
  },
  handler: addNewNote
});

//remove command
yargs.command({
  command: "remove",
  describe: "remove a note (--title is required.)",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: removeNote
});

//read command
yargs.command({
  command: "read",
  describe: "read a note (--title is required.)",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: readNote
});

//list command
yargs.command({
  command: "list",
  describe: "List all the notes titles",
  handler: listNotes
});

//reset all notes command
yargs.command({
  command: "reset",
  describe: "Reset the entire notes, this will ERASE ALL NOTES.",
  handler: eraseAll
});

// handler functions

function addNewNote(argv) {
  clear();
  console.log("Adding new note...");
  notes.addNote(argv["title"], argv["body"]);
}

function removeNote(argv) {
  clear();
  console.log("Removing note...");
  notes.removeNote(argv["title"]);
}

function readNote(argv) {
  clear();
  notes.readNote(argv["title"]);
}

function listNotes() {
  clear();
  console.log("listing all notes!\n");
  notes.listNotes();
}

function eraseAll() {
  clear();
  console.log("Deleting all content...");
  notes.deleteAllNotes();
}

yargs.parse();
