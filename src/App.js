import "./App.scss";
import React from "react";
import Header from "./components/Header.js";
import Home from "./components/Home";
import News from "./components/News";
import ArticleView from "./components/News/ArticleView";
import Reviews from "./components/Reviews";
import ReviewView from "./components/Reviews/ReviewView";
import About from "./components/About";
import AuthorView from "./components/About/AuthorView";
import Footer from "./components/Footer.js";
import Layout from "./components/Layout.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.section`
  background-color: var(--dark);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: var(--light);
  font-size: 20px;

  .quote {
    color: var(--secondary);
    font-size: 16px;
  }
`;

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Header />
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/news" exact component={News} />
            <Route path="/news/:uid" component={ArticleView} />
            <Route path="/reviews" exact component={Reviews} />
            <Route path="/reviews/:uid" component={ReviewView} />
            <Route path="/about" component={About} />
            <Route path="/author/:uid" component={AuthorView} />
          </Switch>
        </Layout>
        <Footer />
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
