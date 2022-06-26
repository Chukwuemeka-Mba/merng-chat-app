import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Card, Grid, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import { useParams } from "react-router-dom";

// components
import LikeButton from "../components/LikeButton";

function SinglePost(props) {
  const { user } = useContext(AuthContext);

  const {
    data: { getPost },
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading Post ..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      //   comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("comment on post")}
                />
                <Button basic color="blue">
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return <div>{postMarkup}</div>;
}

export default SinglePost;
const FETCH_POST_QUERY = gql`
  query ($postiD: id!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
      }
    }
  }
`;
