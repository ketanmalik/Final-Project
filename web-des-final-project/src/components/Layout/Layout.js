import React, { Component } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import { Switch, Route } from "react-router-dom";
import { home, clients, aboutus, contactus } from "../Pages/Pages";
import Footer from "../Navigation/Footer/Footer";
import "./Layout.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Toolbar />
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/clients" component={clients} />
          <Route exact path="/aboutus" component={aboutus} />
          <Route exact path="/contactus" component={contactus} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
