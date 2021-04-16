import './App.scss'
import React from 'react'
import './custom.scss'
import Navigation from './components/Navigation.js'
import Podcast from './components/Podcast/Podcast.js'
import Articles from './components/Article/Articles.js'
import Article from './components/Article/Article.js'
import Reviews from './components/Review/Reviews.js'
import Review from './components/Review/Review.js'
import About from './components/About/About.js'
import Author from './components/About/Author.js'
import Footer from './components/Footer.js'
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
            <Route path="/author/:uid" component={Author}/>
          </Switch>
        </Layout>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
