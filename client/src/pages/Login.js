import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";

function Login(props) {
  const [errors, setErrors] = useState({});

  const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }
  return (
    <LoginContainer>
      <h1>Login</h1>
      <LoginForm
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
          <label htmlFor="name">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </LoginForm>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            <li>{errors.username}</li>
            <li>{errors.password}</li>
          </ul>
        </div>
      )}
    </LoginContainer>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(registerInput: { username: $username, password: $password }) {
      id
      username
      token
    }
  }
`;

export default Login;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LoginForm = styled.form`
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
    background-color: black;
    color: white;
    border-radius: 5px;
  }
`;
