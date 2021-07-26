import React from "react";

import LoginBox from "./LoginBox";

const LoginPage = () => {

    return (
    <div className="section">
        <div className="container">
            <div className="columns is-6">
                <div className="column is-4 is-offset-1">
                    <LoginBox />
                </div>
            </div>
        </div>
    </div>
    );
};

export default LoginPage;