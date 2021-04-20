import "./App.scss";
import React from "react";
import Navigation from "./components/Navigation.js";
import Home from "./components/Home/Home.js";
import Articles from "./components/Article/Articles.js";
import Article from "./components/Article/Article.js";
import Reviews from "./components/Review/Reviews.js";
import Review from "./components/Review/Review.js";
import About from "./components/About/About.js";
import Author from "./components/About/Author.js";
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
            <Route path="/news" exact component={Articles} />
            <Route path="/news/:uid" component={Article} />
            <Route path="/reviews" exact component={Reviews} />
            <Route path="/reviews/:uid" component={Review} />
            <Route path="/about" component={About} />
            <Route path="/author/:uid" component={Author} />
          </Switch>
        </Layout>
        <Footer />
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
