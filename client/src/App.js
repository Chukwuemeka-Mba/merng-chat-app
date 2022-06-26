import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./index.css";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/auth-route";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
// Components
import TheNavbar from "./components/TheNavbar";
// App

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <TheNavbar />
        </div>
        <Container>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/Register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
