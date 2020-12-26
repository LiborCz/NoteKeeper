import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from "../components/Header";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
