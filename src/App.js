import "./App.scss";
import React from "react";
import Navigation from "./components/Navigation.js";
import Home from "./components/Home/Home.js";
import News from "./components/News/News.js";
import ArticleView from "./components/News/ArticleView/ArticleView.js";
import Reviews from "./components/Reviews/Reviews.js";
import ReviewView from "./components/Reviews/ReviewView/ReviewView.js";
import About from "./components/About/About.js";
import AuthorView from "./components/About/AuthorView/AuthorView.js";
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
`;

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Navigation />
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
