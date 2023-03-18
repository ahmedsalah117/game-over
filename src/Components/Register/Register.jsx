import React, { useState } from "react";
import classes from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import RegisterImg from "../../Assets/Images/gaming.ebaf2ffc84f4451d.jpg";
import Joi from "joi";
function Register() {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [backEndErr, setBackEndErr] = useState(null);
  const navigate = useNavigate();
  function userDataHandler(event) {
    if (event.target.name === "first_name") {
      setUserData((prevState) => {
        return { ...prevState, first_name: event.target.value };
      });
    } else if (event.target.name === "last_name") {
      setUserData((prevState) => {
        return { ...prevState, last_name: event.target.value };
      });
    } else if (event.target.name === "email") {
      setUserData((prevState) => {
        return { ...prevState, email: event.target.value };
      });
    } else if (event.target.name === "password") {
      setUserData((prevState) => {
        return { ...prevState, password: event.target.value };
      });
    } else if (event.target.name === "age") {
      setUserData((prevState) => {
        return { ...prevState, age: event.target.value };
      });
    }
  }

  async function RegisterHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    setBackEndErr(null);
    const validationInfo = userInputValidation(userData);
    if (validationInfo === true) {
      const response = await fetch(
        "https://route-movies-api.vercel.app/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const responseData = await response.json();

      if (responseData.message === "success") {
        setIsLoading(false);
        navigate("/login");
      } else {
        setBackEndErr("Email already exists");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }

  function userInputValidation(userData) {
    const schema = Joi.object({
      first_name: Joi.string().required().min(3).max(10),
      last_name: Joi.string().required().min(3).max(10),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp(`^[A-Z][a-z]{3,6}`)), //To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
      age: Joi.number().required().min(10),
    });

    const validationResult = schema.validate(userData, { abortEarly: false });

    if (validationResult.error) {
      const ErrorsArray = validationResult.error.details.map((err) => {
        return { label: err.context.label, message: err.message };
      });
      setValidationErrors(ErrorsArray);
    }

    if (!validationResult.error) {
      setValidationErrors([]);
      return true;
    } else {
      return false;
    }
  }

  return (
    <section
      className={classes.RegisterSection}
      onClick={(e) => {
        if (
          e.target.localName !== "input" &&
          e.target.localName !== "p" &&
          e.target.localName !== "button"
        ) {
          setValidationErrors([]);
          setBackEndErr(null);
        }
      }}
    >
      <div className={classes.RegisterImageContainer}>
        <img className={classes.RegisterImage} src={RegisterImg} alt="" />
      </div>
      <div className={classes.RegisterFormHolder}>
        <h2>Create My Account!</h2>
        <form
          className={classes.RegisterForm}
          onSubmit={(event) => {
            RegisterHandler(event);
          }}
        >
          <input
            type="text"
            placeholder="First Name"
            className={classes.name}
            name="first_name"
            onChange={userDataHandler}
          />

          <input
            type="text"
            placeholder="Last Name"
            className={classes.name}
            name="last_name"
            onChange={userDataHandler}
          />
          <div className={classes.ErrorContainer}>
            {validationErrors.map((error) => {
              return error.label === "first_name" ? (
                <p key={error.label} className={classes.NameRegisterError}>
                  Please enter a valid last name (3 chars long)
                </p>
              ) : (
                ""
              );
            })}
            {validationErrors.map((error) => {
              return error.label === "last_name" ? (
                <p key={error.label} className={classes.NameRegisterError}>
                  Please enter a valid last name (3 chars long)
                </p>
              ) : (
                ""
              );
            })}
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={userDataHandler}
          />
          <div className={classes.ErrorContainer}>
            {validationErrors.map((error) => {
              return error.label === "email" ? (
                <p key={error.label} className={classes.OtherRegisterError}>
                  Please enter a valid email
                </p>
              ) : (
                ""
              );
            })}
            {backEndErr ? (
              <p className={classes.OtherRegisterError}>
                Email already registered
              </p>
            ) : (
              ""
            )}
          </div>
          <input
            type="number"
            placeholder="Age"
            name="age"
            onChange={userDataHandler}
          />
          <div className={classes.ErrorContainer}>
            {validationErrors.map((error) => {
              return error.label === "age" ? (
                <p key={error.label} className={classes.OtherRegisterError}>
                  Please enter a valid age
                </p>
              ) : (
                ""
              );
            })}
          </div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={userDataHandler}
          />
          <div className={classes.ErrorContainer}>
            {validationErrors.map((error) => {
              return error.label === "password" ? (
                <p key={error.label} className={classes.OtherRegisterError}>
                  Please enter a valid password ( "6-20 characters" at least 1
                  uppercase letter , 1 lowercase letter and one digit.)
                </p>
              ) : (
                ""
              );
            })}
          </div>
          <button className={classes.RegisterFormBtn}>
            {isLoading ? (
              <i className="fa-spinner fa-spin fa-solid fa-lg"></i>
            ) : (
              "Create an account"
            )}
          </button>
          <p className={classes.privacy}>
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy" target="_blank">
              Privacy Policy
            </a>
            &nbsp; and{" "}
            <a href="https://policies.google.com/terms" target="_blank">
              Terms of Service
            </a>{" "}
            apply.
          </p>
          <hr />
        </form>
        <div className={classes.forgotPassword}>
          <p className={classes.member}>
            Already a member?<Link to="/login"> &nbsp; Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
