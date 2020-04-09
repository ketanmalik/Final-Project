import React from "react";
import { Route } from "react-router-dom";
import { layout as Layout } from "./components/Pages/Pages";
import Aux from "./hoc/Aux/Aux";
// import MainContent from "./containers/MainContent/MainContent";

function App() {
  return (
    <Aux>
      <Route path="/" render={(routeProps) => <Layout {...routeProps} />} />
      {/* <MainContent /> */}
    </Aux>
  );
}

export default App;
