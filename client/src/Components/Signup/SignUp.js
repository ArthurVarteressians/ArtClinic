import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import styles from "./SignUp.module.css";
import validate from "./validate";
import axios from "axios";
function SignUp({ onSignInClick }) {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    age: "",
    phonenumber: "",
    password: "",
    isAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "signup"));
  }, [data, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "isAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };
  const focusHanlder = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      // Retrieve entered information here
      const enteredData = {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        age: data.age,
        phonenumber: data.phonenumber,
        password: data.password,
        isAccepted: data.isAccepted,
      };
      try {
        const response = await axios.post(
          "http://localhost:3001/Profile",
          enteredData
        );
        if (response.status === 200) {
          // Request was successful
          notify("You signed up successfully", "success");

          setTimeout(() => {
            window.location.href = "/Calendar";
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Email already exists
          notify("Use Unique Information!", "error");
        } else {
          // Handle other error responses
          console.error("Error:", error.message);
          notify("Invalid data!", "error");
        }
      }
    } else {
      notify("Invalid data!", "error");
      setTouched({
        name: true,
        lastname: true,
        email: true,
        age: true,
        phonenumber: true,
        password: true,
        confirmPassword: true,
        isAccepted: true,
      });
    }
  };

  return (
    <div className={styles.mainSignUpSec}>
      <div className={styles.SignUpSecText}>
        <p>
          At <span style={{ fontWeight: "bold" }}> Art Clinic</span>, we believe
          that every patient deserves the highest quality of care. That's why
          our team of skilled physicians and healthcare professionals are
          dedicated to providing personalized, compassionate care to each and
          every patient.
        </p>
      </div>
      <div className={styles.container}>
        <form onSubmit={submitHandler} className={styles.formContainer}>
          <h2 className={styles.header}>SignUp</h2>
          <div className={styles.formField}>
            <label htmlFor="name">Full name</label>
            <input
              className={
                errors.name && touched.name
                  ? styles.uncompleted
                  : styles.formInput
              }
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={changeHandler}
              onFocus={focusHanlder}
            />
            {errors.name && touched.name && <span>{errors.name}</span>}
          </div>
          <div className={styles.formField}>
            <label htmlFor="email">Email</label>
            <input
              className={
                errors.email && touched.email
                  ? styles.uncompleted
                  : styles.formInput
              }
              id="email"
              type="text"
              name="email"
              value={data.email}
              onChange={changeHandler}
              onFocus={focusHanlder}
            />
            {errors.email && touched.email && <span>{errors.email}</span>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="age">Age</label>
            <input
              className={
                errors.age && touched.age
                  ? styles.uncompleted
                  : styles.formInput
              }
              id="age"
              type="number"
              name="age"
              value={data.age}
              onChange={changeHandler}
              onFocus={focusHanlder}
            />
            {errors.age && touched.age && <span>{errors.age}</span>}
          </div>

          <div className={styles.formField}>
            <label htmlFor="phonenumber">Phone Number</label>
            <input
              className={
                errors.phonenumber && touched.phonenumber
                  ? styles.uncompleted
                  : styles.formInput
              }
              id="phonenumber"
              type="tel"
              name="phonenumber"
              value={data.phonenumber}
              onChange={changeHandler}
              onFocus={focusHanlder}
            />
            {errors.phonenumber && touched.phonenumber && (
              <span>{errors.phonenumber}</span>
            )}
          </div>

          <div className={styles.formField}>
            <label htmlFor="password">Password</label>
            <input
              className={
                errors.password && touched.password
                  ? styles.uncompleted
                  : styles.formInput
              }
              id="password"
              type="password"
              name="password"
              value={data.password}
              onChange={changeHandler}
              onFocus={focusHanlder}
            />
            {errors.password && touched.password && (
              <p className={styles.testttt}>{errors.password}</p>
            )}
          </div>
          <div className={styles.formField}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? styles.uncompleted
                  : styles.formInput
              }
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={changeHandler}
              onFocus={focusHanlder}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span>{errors.confirmPassword}</span>
            )}
          </div>
          <div className={styles.formField}>
            <div className={styles.checkBoxContainer}>
              <label>I Accept Terms Of Privacy & Policy</label>
              <input
                type="checkbox"
                name="isAccepted"
                value={data.isAccepted}
                onChange={changeHandler}
                onFocus={focusHanlder}
              />
            </div>
            {errors.isAccepted && touched.isAccepted && (
              <span>{errors.isAccepted}</span>
            )}
            <button type="submit">Sign Up</button>
          </div>

          <div
            style={{
              fontSize: "1.2vw",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "1.2vw", fontWeight: "bold" }}>
              Already have an account?
            </span>
            <button style={{ margin: "0" }} onClick={onSignInClick}>
              Sign In
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

//===================================================Sign IN=======================================

function SignIn({ onSignUpClick }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "login"));
  }, [data, touched]);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const focusHanlder = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandlerForLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/ClientsLogins",
        data // Use data object to send form data
      );
      // Handle successful login

      const token = response.data.token; // Access token from response.data
      localStorage.setItem("Token", token);

      // Redirect to main page
      window.location.href = "/Calendar"; // Update this with the actual URL of your main page
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        const { status, data } = error.response;
        if (status === 401 && data === "Token expired") {
          window.location.href = "/"; // MainPage
          console.log("Token has expired. Please log in again.");
          setError("Token has expired. Please log in again.");
        } else {
          // Other server error, handle it as appropriate
          console.error("Server error:", data);
          setError("Invalid email or password");
        }
      } else {
        // Network error or other client-side error, handle it as appropriate
        console.error("Error:", error.message);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.mainSignUpSec}>
      <div className={styles.SignUpSecText}>
        <p>
          At <span style={{ fontWeight: "bold" }}> Art Clinic</span>, we believe
          that every patient deserves the highest quality of care. That's why
          our team of skilled physicians and healthcare professionals are
          dedicated to providing personalized, compassionate care to each and
          every patient.
        </p>
      </div>
      <div className={styles.container}>
        <form onSubmit={submitHandlerForLogin} className={styles.formContainer}>
          <h2 className={styles.header}>Login</h2>
          <div className={styles.formField}>
            <label>Email</label>
            <input
              className={
                errors.email && touched.email
                  ? styles.uncompleted
                  : styles.formInput
              }
              type="email"
              name="email"
              value={data.email}
              onChange={changeHandler}
              onFocus={focusHanlder}
            />
            {errors.email && touched.email && <span>{errors.email}</span>}
          </div>

          <div className={styles.formField}>
            <label>Password</label>
            <input
              className={
                errors.password && touched.password
                  ? styles.uncompleted
                  : styles.formInput
              }
              type="password"
              name="password"
              value={data.password}
              onChange={changeHandler}
              onFocus={focusHanlder}
            />
            {errors.password && touched.password && (
              <span>{errors.loginpassword}</span>
            )}
          </div>
          <div className={styles.formButtons}>
            <button type="submit">Login</button>
          </div>
          <div
            style={{
              fontSize: "1.2vw",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span>Don't have an account?</span>
            <button style={{ margin: "0" }} onClick={onSignUpClick}>
              Sign Up
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}
function SignUpOrSignIn() {
  const [isSignIn, setIsSignIn] = useState(false);

  const handleSignInClick = () => setIsSignIn(true);
  const handleSignUpClick = () => setIsSignIn(false);

  return (
    <div>
      {isSignIn ? (
        <SignIn onSignUpClick={handleSignUpClick} />
      ) : (
        <SignUp onSignInClick={handleSignInClick} />
      )}
    </div>
  );
}

export default SignUpOrSignIn;

// !/\S+@\S+\.\S+/.test(data.email)
