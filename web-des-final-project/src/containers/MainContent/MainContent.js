import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {
  home as Home,
  lease as Lease,
  about as About,
  contactus as ContactUs,
  inventory as Inventory,
  userSignIn as UserSignIn,
} from "../../components/Pages/Pages";

class MainContent extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => <Home {...routeProps} />}
        />
        <Route
          exact
          path="/lease"
          render={(routeProps) => <Lease {...routeProps} />}
        />
        <Route
          exact
          path="/about"
          render={(routeProps) => <About {...routeProps} />}
        />
        <Route
          exact
          path="/contactus"
          render={(routeProps) => <ContactUs {...routeProps} />}
        />
        <Route
          path="/parts/inventory"
          render={(routeProps) => <Inventory {...routeProps} />}
        />
        {/* <Route
          path="/user"
          render={(routeProps) => <UserSignIn {...routeProps} />}
        /> */}
      </Switch>
    );
  }
}

export default MainContent;
