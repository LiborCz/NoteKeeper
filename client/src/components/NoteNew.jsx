import React, { useState, useContext } from "react";
import axios from 'axios';

import SessionContext from '../context/SessionContext'

function NoteNew({setNotes}) {

  const { session } = useContext(SessionContext);

  const [form, setForm] = useState({ title: "", note: "" });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = async(e) => {

    // setForm({ ...form, isSubmitting: true, errorMessage: null });
    e.preventDefault();

    try {

      const res = await axios.post("/api/items/add", {
        title: form.title,
        text: form.note
      }, { headers: {"x-auth-token": session.token }});

      if (res.data.ok) {
        const newItem = res.data.item;
        setNotes(curNotes => ([...curNotes, {title: newItem.title, text: newItem.text}]));
      }
      // else setFormData({ ...formData, errorMessage: res.data.msg });      

      // setFormData({ ...formData, isSubmitting: false });

    }

    catch (err) { 
      console.log("error:", err);
      // setFormData({ ...formData, isSubmitting:false, errorMessage: err.msg });
    }

    setForm({ title: "", note: "" });
  }

  return (
    <div>
      <form className="create-note">
        
        <input name="title" onChange={onChange} value={form.title} placeholder="Title" />

        <textarea name="note" onChange={onChange} value={form.note} placeholder="Take a note..." rows="3" />

        <button onClick={onSubmit}>Add</button>

      </form>
    </div>
  );
}

export default NoteNew;
