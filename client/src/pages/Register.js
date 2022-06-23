import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

function Register() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addUser();
    console.log("This form has been submitted", values);
  };
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  return (
    <RegisterContainer>
      <h1>Register Page</h1>
      <RegisterForm
        onSubmit={handleSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <div>
          <label htmlFor="name">Username</label>
          <input
            name="userName"
            type="text"
            placeholder="Enter username"
            value={values.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email address"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </RegisterForm>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </RegisterContainer>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      createdAt
      token
    }
  }
`;

export default Register;
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    input {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      outline: none;
      border: 1px solid gray;
      padding: 0 1rem;
      margin-top: 20px;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #bdd8e6;
    border-radius: 5px;
  }
`;
