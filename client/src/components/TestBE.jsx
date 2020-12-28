import React, {useState} from "react";
import axios from 'axios';

function TestBE() {

  const[name, setName] = useState("");
  const[message, setMessage] = useState("");  
  
  var createPerson = (event) => {
    event.preventDefault();
    axios.post( '/api/user/test', { note: { name: "Hey", msg: "You" }})
    .then( response => { console.log(response) })
    .catch((err) => { 
      console.log("Oops, request failed!");
      console.log(err);
    })
  }

  return (
    <form onSubmit={createPerson}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message"/>
      <input type="submit" value="Submit"/>
    </form>
  );
}

export default TestBE;
