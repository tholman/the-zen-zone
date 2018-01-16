import React, { Component } from 'react';
import '../styles/SelectGame.css';
// import logo from '../assets/Logo.svg';

class SelectGame extends Component {
  render() {
    return (
      <section className="center">
        Select your Game
        <button onClick={()=>this.props.onButtonClick(1)}>1</button>
        <button onClick={()=>this.props.onButtonClick(2)}>2</button>
        <button onClick={()=>this.props.onButtonClick(3)}>3</button>
      </section>
    );
  }
}

export default SelectGame;
