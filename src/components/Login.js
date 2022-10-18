import React, { useState } from "react";
import Auth from "../utils/Auth";
import { withRouter } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Login(props) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    Auth.signIn(userData)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          props.onLogin(userData.email);
          props.history.push("/");
        }
      })
      .catch((err) => {
        setIsOpen(true);
        console.log("%c" + err, "color: #dd3333");
      });
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  return (
    <>
      <main className="content content_type_auth">
        <h2 className={"popup__title popup__title_type_auth"}>Вход</h2>
        <form className="popup_form" name="login" onSubmit={handleSubmit}>
          <label className="popup__field">
            <input
              type="text"
              name="email"
              id="email-input"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              value={userData.email}
              className="popup__input  popup__input_type_auth"
            />
          </label>
          <label className="popup__field">
            <input
              type="password"
              name="password"
              id="password-input"
              placeholder="Пароль"
              required
              minLength="2"
              maxLength="200"
              onChange={handleChange}
              value={userData.password}
              className="popup__input popup__input_type_auth"
            />
          </label>
          <button type="submit" className="popup__save popup__save_type_auth">
            Войти
          </button>
        </form>
      </main>
      <InfoTooltip isOk={false} isOpen={isOpen} onClose={handleClose} />
    </>
  );
}

export default withRouter(Login);
