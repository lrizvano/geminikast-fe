import './App.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './components/Navigation/Navigation.js'
import Podcast from './components/Podcast/Podcast.js'
import Articles from './components/Article/Articles.js'
import Article from './components/Article/Article.js'
import Reviews from './components/Review/Reviews.js'
import Review from './components/Review/Review.js'
import About from './components/About/About.js'
import Footer from './components/Footer/Footer.js'
import Layout from './components/Layout.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation/>
        <Layout>
          <Switch>
            <Route path="/" exact component={Podcast}/>
            <Route path="/news" exact component={Articles}/>
            <Route path="/news/:uid" component={Article}/>
            <Route path="/reviews" exact component={Reviews}/>
            <Route path="/reviews/:uid" component={Review}/>
            <Route path="/about" component={About}/>
          </Switch>
        </Layout>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
