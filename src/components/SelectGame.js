import React, { Component } from 'react';
import '../styles/SelectGame.css';
// import logo from '../assets/Logo.svg';

class SelectGame extends Component {
  render() {
    return (
      <section className="center">
        Select your Game
        <button onClick={()=>this.props.onButtonClick("swirl")}>swirl</button>
        <button onClick={()=>this.props.onButtonClick("switch")}>switch</button>
        <button onClick={()=>this.props.onButtonClick("break")}>break</button>
      </section>
    );
  }
}

export default SelectGame;
