import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { home, lease, about, contactus } from "../../components/Pages/Pages";

class MainContent extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/lease" component={lease} />
        <Route exact path="/about" component={about} />
        <Route exact path="/contactus" component={contactus} />
      </Switch>
    );
  }
}

export default MainContent;
