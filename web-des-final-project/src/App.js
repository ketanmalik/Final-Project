import React from "react";
import Container from "react-bootstrap/Container";
import Layout from "./components/Layout/Layout";
import MainContent from "./containers/MainContent/MainContent";

function App() {
  return (
    <Container fluid>
      <Layout>
        <MainContent />
      </Layout>
    </Container>
  );
}

export default App;
