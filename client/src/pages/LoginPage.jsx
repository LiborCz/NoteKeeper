import React from "react";
// import history from "../system/history";

function LoginPage() {

  // const [session, setSession] = React.useContext(AuthContext);

  const initLoginData = {
    email: "", 
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  const [loginData, setLoginData] = React.useState(initLoginData);

  const hOnChange = e => {
      setLoginData({...loginData, [e.target.name]: e.target.value, errorMessage: ""});
  };
  
  const hOnSubmit = e => {
    e.preventDefault();

    setLoginData({ ...loginData, isSubmitting: true, errorMessage: null });

    fetch("/api/user/login", {
      method: "POST",
      headers: { 'Accept': 'application/json', "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password
      })
    })

    .then(res => res.json())

    .then(res => {

      alert(res.msg);

      setLoginData({ ...loginData, isSubmitting: false });

      if (res.success) {
        
        // let session = {...res.session, act: Date.now()};

        // console.log(session);

        // localStorage.setItem('session', JSON.stringify(session));

        // session = appendSession(session);
  
        // setSession(session);
  
        // history.push('/home');
        }
      else
        setLoginData({ ...loginData, errorMessage: res.message });
    })

    .catch(err => {
      alert(err);
      setLoginData({
        ...loginData,
        isSubmitting: false, 
        errorMessage: err.statusText === "Unauthorized" ? "Nesprávný email nebo heslo...": err.statusText
      });
    });
  };  

  return (
    <div className="section login">
      <div className="container is-fluid">
        <div className="box">
          <div className="block">

            <form onSubmit={hOnSubmit}>

              <div className="field">
                <label className="label">Emailová Adresa</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    onChange={hOnChange}
                    value={loginData.email}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Heslo</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    onChange={hOnChange}
                    value={loginData.password}
                  />
                </div>
              </div>

              <div className="notification has-text-danger has-text-weight-bold is-paddingless has-text-centered">
                {loginData.errorMessage}
              </div>

              <button
                type="submit"
                className="button is-info is-pulled-right"
                disabled={loginData.isSubmitting}
              >
                Login
              </button>

            </form>

          </div>

          <div className="block">
            <a href="/register" className="button is-white">
              Registrace
            </a>
            <a href="/pwdlost" className="button is-white">
              Zapomenuté heslo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
