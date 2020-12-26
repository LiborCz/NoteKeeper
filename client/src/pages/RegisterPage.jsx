import React from "react";

const RegisterPage = () => {

  const initialState = {
    email: "",
    password: "",
    password2: "",
    errMessage: "",
    isSubmitting: false
  };

  const [formData, setFormData] = React.useState(initialState);

  const hOnChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value, errMessage: "" });
  };

  const hOnSubmit = e => {
    e.preventDefault();

    if(formData.password!==formData.password2) {
      setFormData({ ...formData, errMessage: "Hesla se neshodují !" });
      return;
    }

    setFormData({ ...formData, isSubmitting: true, errMessage: null });

    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email, password: formData.password })
    })

    .then(res => {
      if (res.ok) { setFormData({ ...formData, isSubmitting:false }); return res.json(); }
      else throw res;
    })

    .then(res => {

      console.log(res);

      if(res.success)
        //Tady se udela napr modal popup...
        setFormData({ ...formData, errMessage: res.message });
      else
        setFormData({ ...formData, errMessage: res.message });
    })

    .catch(err => {
      setFormData({ ...formData, isSubmitting: false, errMessage: err.statusText });
    });

  };

  return (
    <div className="section">
      <div className="container is-fluid">
        <div className="box" style={{ width: "30rem", height:"24rem" }}>
          <form onSubmit={hOnSubmit}>

            {/* Email */}
            <div className="field">
              <label className="label">Emailová adresa</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  name="email"
                  onChange={hOnChange}
                  value={formData.email}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="field">
              <label className="label">Heslo</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={hOnChange}
                  value={formData.password}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>

            {/* PasswordConfirmation */}
            <div className="field">
              <label className="label">Potvrzení hesla</label>
              <div className="control has-icons-left">
                <input
                  id="passwordConf"
                  className="input"
                  type="password"
                  name="password2"
                  onChange={hOnChange}
                  value={formData.password2}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>

            <div className="notification has-text-danger has-text-weight-bold is-paddingless center">
              {formData.errMessage}
            </div>

            <button
              type="submit"
              className="button is-info is-pulled-right"
              disabled={formData.isSubmitting}
            >
              Registrovat
            </button>
          </form>

          <div className="block">
            <a href="/login" className="button is-white">{"<"} Zpět na Login stránku</a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
