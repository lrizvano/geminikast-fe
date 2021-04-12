import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation/Navigation.js';
import Home from './components/Home/Home.js';
import Podcast from './components/Podcast/Podcast.js';
import About from './components/About/About.js';
import Footer from './components/Footer/Footer.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/podcast" component={Podcast}/>
          <Route path="/about" component={About}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
