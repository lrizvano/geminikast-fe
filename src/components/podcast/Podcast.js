import React from 'react';
import logo from '../../geminikast.jpg';

export default function Podcast() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <iframe src="https://open.spotify.com/embed-podcast/show/77QfKMGg067YXiJnb1Ic3q" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </header>
  )
}
