import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";

function Register(props) {
  const [errors, setErrors] = useState({});

  const { handleChange, handleSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      props.history.push("/login");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }
  return (
    <RegisterContainer>
      <h1>Register User</h1>
      <RegisterForm
        onSubmit={handleSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <div>
          <label htmlFor="name">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter username"
            value={values.username}
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
            <li>{errors.username}</li>
            <li>{errors.email}</li>
            <li>{errors.password}</li>
            <li>{errors.confirmPassword}</li>
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
