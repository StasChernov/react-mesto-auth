import "../index.css";
import { useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import Places from "./Places";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/Auth";

function App(props) {
  const [currentUser, setCurrentUser] = useState({
    loggedIn: false,
    email: false,
    id: false,
  });

  function handleLogin(email) {
    setCurrentUser({
      ...currentUser,
      email,
      loggedIn: true,
    });
  }

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsChecked(false);

    auth
      .checkToken(token)
      .then(({ data }) => {
        setCurrentUser({
          loggedIn: true,
          email: data.email,
          id: data._id,
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Соединение было прервано");
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setIsChecked(true);
      });
  }, []);

  function handleSignOut() {
    localStorage.removeItem("token");
    props.history.push("sign-in");
  }

  return (
    <div className="page">
      <Header
        className="header__auth"
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />
      <Switch>
        {isChecked && (
          <ProtectedRoute
            path="/"
            exact
            loggedIn={currentUser.loggedIn}
            component={Places}
          />
        )}
        <Route path="/sign-up">
          <Register />
        </Route>
        <Route path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
