import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation.js';
import Home from './components/home/Home.js';
import Podcast from './components/podcast/Podcast.js';
import Footer from './components/Footer.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/podcast" component={Podcast}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
