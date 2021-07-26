import React from 'react';

export const AuthContext = React.createContext();


export function AuthProvider(props) {

  let initUser = {
    name: "",
    fName: "",
    lName: "",
    email: "",
    token: "",
    tokenExpires: null,
    isAuthenticated: false
  };

  let sessionUser = JSON.parse(localStorage.getItem('user'))
  let sessionToken = JSON.parse(localStorage.getItem('token'))

  if(sessionUser) { initUser = sessionUser; }

  const [user, setUser] = React.useState(initUser);

  let i = 0;
  var modal = null;
  var html = null;
  var cdTimeOut = null;
  var ctTimeOut = null;
  var intTO = null;

  function refreshTokenExp() {
    setUser({...user, tokenExpires:Date.now()+10000});
  }

  // refreshTokenExp();

  function showModal() {

    modal = document.querySelector('.modal');
    html = document.querySelector('html');

    modal.classList.add('is-active');
    html.classList.add('is-clipped');

    modal.querySelector('.modal-background').addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.remove('is-active');
      html.classList.remove('is-clipped');
    });
    modal.querySelector('.refreshToken').addEventListener('click', function(e) {
      clearTimeout(cdTimeOut); clearTimeout(ctTimeOut);
      refreshTokenExp();
      hideModal();
    });
  }

  function hideModal() {
    modal.classList.remove('is-active');
    html.classList.remove('is-clipped');
  }


  function countDown() {
    if(i>10) {
      setUser({name:"", tokenExpires: null, isAuthenticated: false});
      hideModal();
    }
    else {
      let time = (30-i);
      document.querySelector('.time').innerHTML = time + " seconds...";
      cdTimeOut = setTimeout(countDown, 1000);
      i++;
    }

  }

  function checkTokenExp(e) {
    console.log("Checking...");
    console.log((Date.now() - user.tokenExpires)/1000);

    if(Date.now()>user.tokenExpires) {

      i = 0;
      clearTimeout(intTO); clearTimeout(ctTimeOut);
      showModal(e);
      countDown();

    }

    else intTO = setTimeout(checkTokenExp, 3000);
  }

  // if(user.isAuthenticated) ctTimeOut = setTimeout(checkTokenExp, 1000);

  return (
    <AuthContext.Provider value={[user, setUser]}>

      <div className="container">
        <div className="modal">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box has-text-centered">
              <div style={{color:"red"}}><b>The session will end in <span className="time"></span></b></div>
              <br />Click button to continue...<br/><br/>
              <button className="button refreshToken is-info" aria-label="close">Continue</button>
            </div>
          </div>
          
        </div>
      </div>

      {props.children}
    </AuthContext.Provider>
  );

};
