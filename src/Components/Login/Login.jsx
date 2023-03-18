import React, { useState } from "react";
import classes from "./Login.module.css";
import loginImg from "../../Assets/Images/gaming.ebaf2ffc84f4451d.jpg";
import LogoPic from "../../Assets/Images/logo.png";
import { useNavigate, Link, useNavigation } from "react-router-dom";
function Login() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPass, setEnteredPass] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function enteredEmailHandler(e) {
    setEnteredEmail(e.target.value);
  }

  function enteredPassHandler(e) {
    setEnteredPass(e.target.value);
  }

  async function loginHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    const userLoginInfo = {
      email: enteredEmail,
      password: enteredPass,
    };

    try {
      const response = await fetch(
        "https://route-movies-api.vercel.app/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userLoginInfo),
        }
      );

      const responseData = await response.json();

      const token = responseData.token;
      const message = responseData.message;

      if (message === "success") {
        setIsLoading(false);
        localStorage.setItem("userToken", token);
        navigate("/");
      }
      if (message !== "success") {
        setIsLoading(false);
        setLoginError(message);
      }
    } catch (err) {
      // console.log(err.message);
    }
  }

  return (
    <section className={classes.loginSection}>
      <div className={classes.loginImageContainer}>
        <img className={classes.loginImage} src={loginImg} alt="" />
      </div>
      <div className={classes.loginFormHolder}>
        <div className={classes.formImageContainer}>
          <img src={LogoPic} alt="" />
        </div>
        <h2>Log in to GameOver</h2>
        <form className={classes.loginForm} onSubmit={loginHandler}>
          <input
            type="email"
            placeholder="Email"
            onChange={enteredEmailHandler}
          />
          {loginError === "email doesn't exist" ? (
            <div className={classes.loginError}>email doesn't exist</div>
          ) : (
            ""
          )}
          <input
            type="password"
            placeholder="Password"
            onChange={enteredPassHandler}
          />
          {loginError === "incorrect password" ? (
            <div className={classes.loginError}>Incorrect password</div>
          ) : (
            ""
          )}

          <button className={classes.loginFormBtn}>
            {isLoading ? (
              <i className="fa-spinner fa-spin fa-solid fa-lg"></i>
            ) : (
              "Login"
            )}
          </button>
          <hr />
        </form>
        <div className={classes.forgotPassword}>
          <p>
            <Link
              onClick={() => {
                window.alert("Create a new account hahaha ^^");
              }}
            >
              Forgot password ?
            </Link>
          </p>
          <p>
            Not a member yet ?
            <Link to="/register"> &nbsp; Create an account</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
