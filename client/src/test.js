import React, { useState } from "react";
import Axios from "axios";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: validate form data and submit to backend
  };

  const isEmailValid = (email) => {
    // Regex for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Regex for validating password format: at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number
    const passwordRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return passwordRegex.test(password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
        />
        {email && !isEmailValid(email) && (
          <span style={{ color: "red" }}>Invalid email format</span>
        )}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
          minLength="8"
        />
        {password && !isPasswordValid(password) && (
          <span style={{ color: "red" }}>
            Password must be at least 8 characters long and contain at least 1
            uppercase letter, 1 lowercase letter, and 1 number
          </span>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

// const Form = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const emailCheck = () => {
//     Axios.post("http://localhost:3001/CheckEmail", {
//       email: email,
//     }).then((response) => {
//       console.log(response);
//     });
//   };

//   return (
//     <div>
//       <input
//         type="email"
//         onChange={(e) => {
//           setEmail(e.target.value);
//         }}
//       />
//       <button type="submit" onClick={emailCheck}>
//         Check Email
//       </button>

//       <p>{message}</p>
//     </div>
//   );
// };




 export default Form;
