import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import SessionContext from "../context/SessionContext";

import Header from "../components/Header";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

function App() {

  const [session, setSession] = useState({ token: undefined, user: undefined });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      
      try {
        const res = await axios.post("/api/user/validateToken", null, { headers:{"x-auth-token":token} });

        if (res.data.token && res.data.user) { 
          setSession({ token:res.data.token, user:res.data.user });
          console.log("User is checked as Logged-in !! ");
        }
      }

      catch (err) { console.log("error:", err); }
    };

    checkLoggedIn();
  }, []);


  return (
    <BrowserRouter>
      <SessionContext.Provider value={{ session, setSession }}>

        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>

      </SessionContext.Provider>
    </BrowserRouter>
  );
}

export default App;
