import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/ClientsLogin", {
        email,
        password,
      });
      // Handle successful login
      console.log("Yeeeeeeeeah");
      const token = response.data.token; // Access token from response.data
      localStorage.setItem("token", token);

      // Reset form fields and error message
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      // Handle login error
      console.error(error.response ? error.response.data : error); // Update error handling to check for response property
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
