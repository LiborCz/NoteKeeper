import React from "react";
import {AuthContext} from "../system/context/AuthContext";

import LoginPage from "./LoginPage";
import Notes from "./Notes";

function Main() {
    const [user] = React.useContext(AuthContext); 

    return (
        <div>
            {user.isAuthenticated ? <Notes /> : <LoginPage />}        
        </div>
    );
}

export default Main;