import React, { Component } from 'react';
import '../styles/SelectGame.css';
// import logo from '../assets/Logo.svg';

class SelectGame extends Component {
  render() {
    return (
      <section className="center">
        Select your Game
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </section>
    );
  }
}

export default SelectGame;
