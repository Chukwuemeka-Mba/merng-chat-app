import { useMutation } from "@apollo/react-hooks";
import React from "react";
import styled from "styled-components";
import { useForm } from "../util/hooks";
import gql from "graphql-tag";

function AddPost() {
  const { values, handleChange, handleSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(_, result) {
      console.log(result);
      values.body = " ";
    },
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <div>
      <h3>Add New Post</h3>
      <AddPostForm onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Body</label>
          <input
            name="body"
            type="text"
            placeholder="What is on your mind?"
            value={values.body}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Post</button>
      </AddPostForm>
    </div>
  );
}

export default AddPost;

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

const AddPostForm = styled.form`
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
    background-color: #000;
    color: white;
    border-radius: 5px;
  }
`;
