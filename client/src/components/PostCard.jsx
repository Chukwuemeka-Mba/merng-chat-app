import React, { useContext } from "react";
import moment from "moment";
import styled from "styled-components";
import { AuthContext } from "../context/auth";

//* Assets
import { ThumbsUp, MessageCircle } from "react-feather";
import DeleteButton from "./DeleteButton";
function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);
  return (
    <CardContainer>
      <div className="top">
        <p>
          {username}
          <a href={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</a>
        </p>
        <img
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          alt=""
        />
      </div>
      <div>
        <p>{body}</p>
      </div>
      <div className="buttons">
        <button>
          <ThumbsUp /> {likeCount}
        </button>
        <a href={`/posts/${id}`}>
          <MessageCircle />: {commentCount}
        </a>
        {user && user.username === username && <DeleteButton postId={id} />}
      </div>
    </CardContainer>
  );
}

export default PostCard;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  max-width: 400px;
  margin-bottom: 2rem;
  padding: 1rem;
  margin: 1rem;
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    p {
      display: flex;
      flex-direction: column;
    }
    img {
      width: 50px;
    }
  }
  .buttons {
    display: flex;
    align-items: center;
    gap: 10px;
    a {
      text-decoration: none;
      color: #000;
    }
    a {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: 1px solid black;
      svg {
        width: 15px;
      }
    }
    button {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: 1px solid black;
      svg {
        width: 15px;
      }
    }
  }
`;
