import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import styled from "styled-components";
function Home() {
  const {
    data: { getPosts: posts },
    loading,
  } = useQuery(FETCH_POSTS_QUERY);

  if (posts) {
    console.log("Posts have loaded");
  }
  return (
    <div>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <GridContainer>
        {/* {user && <Grid.Column><PostForm /></Grid.Column>} */}
        {loading ? (
          <h1>Loading posts</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))
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
