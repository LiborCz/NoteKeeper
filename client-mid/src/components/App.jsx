import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

import {AuthProvider} from "../system/context/AuthContext";

function App() {

    return <div>
        <AuthProvider>
            <Header />
            <Main />
        </AuthProvider>
        <Footer />
    </div>
}

export default App;
