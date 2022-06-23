import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

// Components
import TheNavbar from "./components/TheNavbar";
// App
function App() {
  return (
    <Router>
      <div>
        <TheNavbar />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/Register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
