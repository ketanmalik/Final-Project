import React from "react";
import { Route } from "react-router-dom";
import { layout as Layout } from "./components/Pages/Pages";
import { aux1 as Aux } from "./hoc/Aux1/Aux1";
import './App.css';
// import MainContent from "./containers/MainContent/MainContent";

function App() {
  return (
    <Aux>
      <Route path="/" render={(routeProps) => <Layout {...routeProps} />} />
    </Aux>
  );
}

export default App;
