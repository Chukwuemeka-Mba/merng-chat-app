import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/auth-route";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

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
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/Register" component={Register} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
