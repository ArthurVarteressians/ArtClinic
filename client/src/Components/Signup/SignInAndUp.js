import React, { useState } from "react";
import "./Signup.css";
import Axios from "axios";
function SignIn({ onSignUpClick }) {
  return (
    <>
      <div className="mainSignUpSec">
        <div className="SignUpSecText">
          <p>
            At <span style={{ fontWeight: "Bold" }}> Art Clinic</span>, we
            believe that every patient deserves the highest quality of care.
            That's why our team of skilled physicians and healthcare
            professionals are dedicated to providing personalized, compassionate
            care to each and every patient.
          </p>
        </div>

        <div className="mainSignUpBodySection">
          <h2>Sign In</h2>
          <div className="mainSignUpBody">
            <label for="email">Email:</label>
            <input
              placeholder="Enter your registration email"
              type="email"
              id="email"
            />

            <label for="password">Password:</label>
            <input placeholder="Enter password" type="password" id="password" />
            <button>Sign In</button>
          </div>
          <p>
            <span style={{ fontSize: "1.2vw", fontWeight: "bold" }}>
              Don't have an account?{" "}
            </span>
            <button onClick={onSignUpClick}>Sign Up</button>
          </p>
        </div>
      </div>
    </>
  );
}

function SignUp({ onSignInClick }) {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const addPatient = () => {
    try {
      if (password === confirmPassword) {
        alert("Good");
        Axios.post("http://localhost:3001/Profile", {
          name: name,
          lastname: lastname,
          email: email,
          age: age,
          phonenumber: phonenumber,
          password: password,
          confirmPassword: confirmPassword,
        })
          .then(() => {
            alert("Done");
            console.log("Added, success");
          })
          .catch(() => {
            alert("Shit!");
            console.log("Shit");
          });
      }
      else {
        throw Error("Password not equal");
      }
    } catch (error) {
      alert("Shit2!");
      console.log("Shit2" + error);
    }
  };

  return (
    <div className="mainSignUpSec">
      <div className="SignUpSecText">
        <p>
          At <span style={{ fontWeight: "bold" }}> Art Clinic</span>, we believe
          that every patient deserves the highest quality of care. That's why
          our team of skilled physicians and healthcare professionals are
          dedicated to providing personalized, compassionate care to each and
          every patient.
        </p>
      </div>

      <div className="mainSignUpBodySection">
        <h2>Sign Up</h2>

        <div className="mainSignUpBody">
          <label for="name">Name:</label>
          <input
            placeholder="Enter your name"
            type="text"
            id="name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <label for="lastName">Last Name:</label>
          <input
            placeholder="Enter your last name"
            type="text"
            id="lastName"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />

          <label for="email">Email:</label>
          <input
            placeholder="Enter a valid email"
            type="email"
            id="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <label for="age">Age:</label>
          <input
            placeholder="Enter your age"
            type="number"
            id="age"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />

          <label for="phone">Phone Number:</label>
          <input
            placeholder="Enter your phone number"
            type="tel"
            id="phone"
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
          />

          <label for="password">Password:</label>
          <input
            placeholder="Enter password"
            type="password"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <label for="confirmPassword">Confirm Password:</label>
          <input
            placeholder="Confirm your password"
            type="password"
            id="confirmPassword"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
          <button onClick={addPatient}>Sign Up</button>
        </div>
        <p>
          <span style={{ fontSize: "1.2vw", fontWeight: "bold" }}>
            Already have an account?{" "}
          </span>
          <button onClick={onSignInClick}>Sign In</button>
        </p>
      </div>
    </div>
  );
}

function SignInAndUp() {
  const [isSignIn, setIsSignIn] = useState(true);

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

export default SignInAndUp;
