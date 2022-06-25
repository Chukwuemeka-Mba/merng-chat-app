import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import styled from "styled-components";
import { AuthContext } from "../context/auth";

// Components
import PostCard from "../components/PostCard";
import AddPost from "../components/AddPost";

function Home() {
  const {
    data: { getPosts: posts },
    loading,
  } = useQuery(FETCH_POSTS_QUERY);

  const { user } = useContext(AuthContext);
  return (
    <div>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
        {user && <AddPost />}
      </Grid.Row>
      <GridContainer>
        {/* {user && <Grid.Column><PostForm /></Grid.Column>} */}
        {loading ? (
          <h1>Loading posts</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </GridContainer>
    </div>
  );
}

export default Home;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(1fr, auto);
`;
