import React, { Component } from 'react';
import '../styles/Intro.css';
import logo from '../assets/Logo.svg';

class Reflection extends Component {
  render() {

    let totalSeconds = this.props.totalTime / 1000;
    let totalMinutes = Math.floor(totalSeconds / 60);
    let remainingSeconds = Math.floor(totalSeconds % 60);

    return (
      <header className="center intro-component">
        <img src={logo} className="App-logo" alt="The Zen Zone" />
        <div className="zen-zone-intro">
          <h1>Nice :)</h1>
          <p>
            You have been meditating with us for <b>{totalMinutes}</b> minutes and <b>{remainingSeconds}</b> seconds.
          </p>
          <button onClick={this.props.onButtonClick}>Lets do some more?</button>
        </div>
      </header>
    );
  }
}

export default Reflection;
