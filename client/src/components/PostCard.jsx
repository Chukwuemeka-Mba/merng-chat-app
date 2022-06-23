import React from "react";
import moment from "moment";
import styled from "styled-components";
// import { AuthContext } from "../context/auth";
// import LikeButton from "./LikeButton";
// import DeleteButton from "./DeleteButton";
// import MyPopup from "../util/MyPopup";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  // const { user } = useContext(AuthContext);
  // likePost = () => {};
  // addComment = () => {};
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
        <button>Likes: {likeCount}</button>
        <button>Comments: {commentCount}</button>
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
    gap: 10px;
    button {
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: 1px solid black;
    }
  }
`;
