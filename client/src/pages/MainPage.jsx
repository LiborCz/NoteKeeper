import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";

import SessionContext from "../context/SessionContext";

import Note from "../components/Note";
import NoteNew from "../components/NoteNew";

function App() {
  const [notes, setNotes] = useState([]);
  const history = useHistory();
  const { session } = useContext(SessionContext);

  useEffect(() => {
    try {
      if(session.user) {
        console.log("user:", session.user.displayName);
  
        async function fetchData() {
          const res = await axios.get("/api/items/list/" + session.user.id, 
            { headers: {"x-auth-token":session.token }});

          console.log("res", res.data)  
          setNotes(res.data);
        }
        fetchData();
      }
      else {
      // history.push("/login");
      }
    }
    catch(e) {}
    
  }, [session.user, session.token]);

  function onDelete(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (<>
    <NoteNew setNotes={setNotes} />
    {notes.map((note, index) => {
      return (
        <Note key={index} id={index} title={note.title} text={note.text}
          onDelete={onDelete}
        />
      );
    })}
  </>);
}

export default App;
