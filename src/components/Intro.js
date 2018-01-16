import React, { Component } from 'react';
import '../styles/Intro.css';
import logo from '../assets/Logo.svg';

class Intro extends Component {
  render() {
    return (
      <header className="center intro-component">
        <img src={logo} className="App-logo" alt="The Zen Zone" />
        <div className="zen-zone-intro">
          <h1>Welcome to The Zen Zone.</h1>
          <p>A minimalistic meditation area built by <a href="http://tholman.com" target="_blank" rel="noopener noreferrer">Tim Holman</a>, designed to calm you down via the power of small, captivating, mildly amusing and oddly satisfying activities. You can read more here.</p>
          <button onClick={this.props.onButtonClick}>Lets get started</button>
        </div>
      </header>
    );
  }
}

export default Intro;
