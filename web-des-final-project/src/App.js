import React from "react";
import Layout from "./components/Layout/Layout";
import MainContent from "./containers/MainContent/MainContent";

function App() {
  return (
    <div>
      <Layout>
        <MainContent />
      </Layout>
    </div>
  );
}

export default App;
