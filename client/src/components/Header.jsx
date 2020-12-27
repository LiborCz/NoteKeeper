import React from "react";
import {Link, useHistory} from 'react-router-dom';
import $ from 'jquery';

function Header() {

  $(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
  
    });
  });  
  
  const history = useHistory();

  const home = () => history.push("/");

  const logout = () => {
    alert("Logout");
  }

  return (
    <nav className="navbar is-fixed-top is-info" role="navigation" aria-label="dropdown navigation">

      <div className="navbar-brand">

        <div className="navbar-item">
          <b className="logo is-size-4 has-text-light" onClick={home}>Keeper</b>
        </div>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>        
      </div>
      
      <div className="navbar-menu">

        <div className="navbar-item navbar-end has-dropdown is-hoverable">
          
          {/* <span className="navbar-link"> {session.email} </span> */}
        
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-info" href="/register"><strong>Register</strong></a>
              <a className="button is-light" href="/login">Log in</a>
            </div>
          </div>

          <div className="navbar-dropdown is-right">
            <a className="navbar-item" href="/login">Login</a>
            <a className="navbar-item" href="/register">Register</a>
            <a className="navbar-item" href="/pwdchange">Změna hesla</a>

            <hr className="navbar-divider" />

            <a className="navbar-item" href="/" onClick={logout}>Logout</a>
          </div>

        </div>
      </div>

      {/* { session.isAuth && <MenuUser sessionLogout={sessionLogout} /> } */}

    </nav>
  );
}

export default Header;
