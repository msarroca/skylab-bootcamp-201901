import React, { useState, useContext } from "react";
import { UserContext } from "../../userContext";
import Feedback from "../Feedback";
import "./index.sass";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userError, login } = useContext(UserContext);

  const handleEmailInput = event => setEmail(event.target.value);
  const handlePasswordInput = event => setPassword(event.target.value);
  const handleFormSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <section className="login">
      <h2 className="page-title">Login</h2>
      <div>
        <form className="form-login-register" onSubmit={handleFormSubmit}>
          <input type="text" name="email" onChange={handleEmailInput} />
          <input
            type="password"
            name="password"
            onChange={handlePasswordInput}
          />
          <button>Login</button>
        </form>
      </div>
      {userError && <Feedback message={userError} level="warn" />}
    </section>
  );
}
export default Login;
