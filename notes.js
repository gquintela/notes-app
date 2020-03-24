const fs = require("fs");
const chalk = require("chalk");

const addNote = function(title, body) {
  const notes = loadNotes();
  if (notes[title] === undefined) {
    notes[title] = body;
    console.log(chalk.green.bold.inverse("Note added!"));
    saveNotes(notes);
  } else {
    console.log(
      chalk.red.bold.inverse(
        "Error: the note '",
        title,
        "' exists, please delete it before adding a new body. \nAdding note aborted."
      )
    );
  }
};

const removeNote = function(title) {
  const notes = loadNotes();
  if (notes[title] === undefined) {
    console.log(
      chalk.red.bold.inverse("There is not a note with the title:", title)
    );
    console.log(chalk.red.bold.inverse("removing aborted."));
  } else {
    let newNotes = {};
    if (Object.keys(notes).length > 1) {
      newNotes = notes;
      delete newNotes[title];
    }
    saveNotes(newNotes);
    console.log(chalk.green.bold.inverse(title, "deleted."));
  }
};

const listNotes = function() {
  const notes = loadNotes();
  const notesArray = Object.keys(notes);
  notesArray.forEach(element => {
    console.log("_", element);
  });
};

const readNote = function(title) {
  notes = loadNotes();
  if (notes[title] === undefined) {
    console.log(chalk.red.bold("note", title, "didn't found."));
  } else {
    console.log(chalk.green.bold.inverse(title, ":"));
    console.log(chalk.green.bold.inverse(notes[title]));
  }
};

const deleteAllNotes = function() {
  notes = {};
  saveNotes(notes);
  console.log(chalk.green.bold.inverse("All notes deleted."));
};

// aux functions  //////////////////////////////////////////
const saveNotes = function(notes) {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

const loadNotes = function() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    console.log("there is no 'notes.json' file.\nCreating \"notes.json\"... ");
    fs.writeFileSync("notes.json", "{}");
    console.log(chalk.green.bold.inverse('"notes.json" created.'));
    return {};
  }
};

//exports /////

module.exports = {
  // getNotes: getNotes,
  addNote: addNote,
  deleteAllNotes: deleteAllNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
