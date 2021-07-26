import React from 'react';
// import axios from 'axios';

import {AuthContext} from "../system/context/AuthContext";

const FormLogin = () => {

    const [user, setUser] = React.useContext(AuthContext);

    const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
        };

    const [loginData, setLoginData] = React.useState(initialState);

    const hOnChange = e => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    };
    
    function hOnSubmit(e) {

        e.preventDefault();

        fetch("http://localhost:5000/login", { method: "POST" })

            .then(res => { 
              if(res.ok) return res.json(); else throw res; 
            })

            .then(resJson => {
                let userBE = resJson;            
                
                if(userBE) {
                    let userSession = {
                        ...userBE,
                        tokenExpires: Date.now() + 10000,
                        isAuthenticated:true
                    }

                    setUser(userSession);
                    
                    console.log("Saved - user:");
                    console.log(userSession);

                    localStorage.setItem("user", JSON.stringify(userSession));
                    }
                })

            .catch(error => {
                console.log("errrrrrrrr: " + error);
                });

    }

  // const [formData, setFormData] = useState({ email:"", password:"" });

  // setTimeout(() => {
  //   history.push("/");
  
  //   }, 3000);

  // function hOnChange(e) {
  //   const { name, value } = e.target;

  //   setFormData(prevData => {
  //     return {
  //       ...prevData,
  //       [name]:value
  //     };
  //   });
  // }


  // function hOnSumbit(e) {
    
  //   console.log(formData);

  //   e.preventDefault();

  //   axios.post("/auth/login", formData)
  //     .then(res => res.json())
  //     // .then(res => setUser(res))
  //     .catch(err => {
  //         console.log(err);
  //     });
  // }

//////////////////////////////  *********************************


//   const { setUser } = React.useContext(AuthProvider);

//   const initialState = {
//     email: "",
//     password: "",
//     isSubmitting: false,
//     errorMessage: null
//   };

//   const [loginData, setLoginData] = React.useState(initialState);

//   const hOnChange = e => {
//     setLoginData({...loginData, [e.target.name]: e.target.value});
//   };

//   const hOnSumbit = e => {
//     e.preventDefault();

//     setLoginData({...loginData, isSubmitting: true, errorMessage: null });

//     fetch("/api/login", {
//       method: "post",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username: loginData.email, password: loginData.password })
//     })
//     .then(res => {
//       if (res.ok) { 
//         setLoginData({ ...loginData, isSubmitting: false });        
//         return res.json();
//       }
//       throw res;
//     })
//     .then(resJson => { setUser(resJson) })
//     .catch(error => {
//       setLoginData({
//         ...loginData,
//         isSubmitting: false,
//         errorMessage: error.message || error.statusText
//       });

//     });
//   };

  return (
    <div className="box">
      <div className="block">
        <form onSubmit={hOnSubmit}>
          <div className="field">
            <label className="label">Email Address</label>
            <div className="control">
              <input className="input" type="email" name="email" 
                onChange={hOnChange} 
                value={loginData.email}
                required />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" name="password" 
                onChange={hOnChange} 
                value={loginData.password}
                required />
            </div>
          </div>
          
          <div className="notification has-text-danger has-text-weight-bold is-paddingless center">
            {loginData.errorMessage} 
          </div>

          <button type="submit" className="button is-info is-pulled-right"
            disabled={loginData.isSubmitting} >
            Login
          </button>

        </form>
      </div>

      <div className="block">
        <a href="/forgotten" className="button is-white">Forgotten your Password?</a>

        <a href="/register" className="button is-white">New Sign-up?</a>
      </div>

    </div>
  );
};

export default FormLogin;