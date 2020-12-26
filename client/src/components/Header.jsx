import React from "react";
import {Link, useHistory} from 'react-router-dom'

function Header() {
  
  const history = useHistory();

  const home = () => history.push("/");

  const logout = () => {
    alert("Logout");
  }

  return (
    <nav className="navbar is-fixed-top is-info" role="navigation" aria-label="dropdown navigation">

      <div className="navbar-item">
        <b className="logo is-size-4 has-text-light" onClick={home}>Keeper</b>
      </div>

      <div className="navbar-item navbar-end has-dropdown is-hoverable">
        
        <a className="navbar-link">More</a>

          {/* <span className="navbar-link"> {session.email} </span> */}
        <div className="navbar-dropdown  is-right">
          <a className="navbar-item" href="/login">Login</a>
          <a className="navbar-item" href="/register">Register</a>
          <a className="navbar-item" href="/pwdchange">Změna hesla</a>

          <hr className="navbar-divider" />

          <a className="navbar-item" href="/" onClick={logout}>Logout</a>
        </div>

      </div>

      {/* { session.isAuth && <MenuUser sessionLogout={sessionLogout} /> } */}

    </nav>
  );
}

export default Header;
