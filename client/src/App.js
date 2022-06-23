import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/auth";
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/Register" component={Register} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
