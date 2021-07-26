import React from "react";
import {AuthContext} from "../system/context/AuthContext";

function Header() {

    const [user, setUser] = React.useContext(AuthContext);

    function hOnClick() {
        setUser({name: "", tokenExpires:null, isAuthenticated:false});
        localStorage.clear();        
    }

    return (
        <header>
            <h1 style={{display:"inline"}}>Keeper App</h1>
            <p>
            { user.isAuthenticated && user.name }
            { user.isAuthenticated && 
                <button className="button" onClick={hOnClick} >
                    Logout
                </button>
            }
            </p>
        </header>
    );
}

export default Header;