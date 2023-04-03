import React from "react";
import { useState } from "react";
import Axios from "axios";
import "./ManagerLoginForm.css";
// import Mainpage from "../Mainpage/Mainpage"
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
const Manager = () => {
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const managerLoginSection = () => {
    Axios.post("http://localhost:3001/ManagerLoginSection", {
      managerEmail: managerEmail,
      managerPassword: managerPassword,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        // <Link to="/Home">test</Link>

        setLoginStatus(response.data[0].email);
      }
    });
  };

  // return (
  //   <div>
  //     <div className="mainSignUpBodySection">
  //       <h2>Hello Maanager</h2>
  //       <div className="mainSignUpBody">
  //         <label for="email">Email:</label>
  //         <input
  //           placeholder="Enter your registration email"
  //           required
  //           minLength="5"
  //           maxLength="8"
  //           type="email"
  //           id="email"
  //           onChange={(e) => {
  //             setManagerEmail(e.target.value);
  //           }}
  //         />

  //         <label for="password">Password:</label>
  //         <input
  //           placeholder="Enter password"
  //           type="password"
  //           id="password"
  //           onChange={(e) => {
  //             setManagerPassword(e.target.value);
  //           }}
  //         />

  //         <button onClick={managerLoginSection}>Login into account</button>
  //       </div>
  //     </div>

  //     <div className="managerLoginForm">{loginStatus}</div>
  //   </div>
  // );

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const SignupForm = () => {
    const initialValues = { name: "", email: "", password: "" };

    const handleSubmit = (values) => {
      console.log(values);
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label htmlFor="name">Name:</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" />

          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" />

          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    );
  };
};

export default Manager;
