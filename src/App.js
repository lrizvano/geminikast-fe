import "./App.scss";
import React from "react";
import Header from "./components/common/Header.js";
import Home from "./components/Home";
import Documents from "./components/Documents";
import DocumentView from "./components/Documents/DocumentView";
import About from "./components/About";
import AuthorView from "./components/About/AuthorView";
import Error404 from "./components/Error404";
import Footer from "./components/common/Footer.js";
import Layout from "./components/common/Layout.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { documentTypes } from "./utils/queries";

const Wrapper = styled.section`
  background-color: var(--light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: var(--info);
  font-size: 20px;

  .quote {
    color: var(--secondary);
    font-size: 16px;
  }
`;

const renderDocumentRoutes = () => {
  let documentRoutes = [];
  for (let type in documentTypes) {
    documentRoutes.push(
      <Route
        path={documentTypes[type].link}
        exact
        render={() => <Documents type={type} />}
      />
    );
    documentRoutes.push(
      <Route
        path={`${documentTypes[type].link}/:uid`}
        render={(props) => <DocumentView type={type} {...props} />}
      />
    );
  }
  return documentRoutes;
};

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Header />
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            {renderDocumentRoutes()}
            <Route path="/about" component={About} />
            <Route path="/author/:uid" component={AuthorView} />
            <Route component={Error404} />
          </Switch>
        </Layout>
        <Footer />
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
