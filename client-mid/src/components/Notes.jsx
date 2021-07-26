import React from "react";
import Note from "./Note";
import NoteAdd from "./NoteAdd";
import notesInit from "../notes";

function Notes() {

    const [notes, setNotes] = React.useState(notesInit);

    function addNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        });
    }

    // function deleteNote(id) {
    //     setNotes(prevNotes => {
    //         return prevNotes.filter((noteItem, index) => {
    //         return index !== id;
    //         });
    //     });
    // }

return <div>
        <NoteAdd addNote={addNote} />
        {notes.map(note => (<Note key={note.key} title={note.title} content={note.content} />))}
    </div>
}

export default Notes;