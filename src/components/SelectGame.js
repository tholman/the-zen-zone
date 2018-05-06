import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SelectGame extends Component {
  render() {
    return (
      <section className="center vertical">
        <h1 className="section-select">Select your Game</h1>
        <div className="section-options">
          <Link to="swirl"><button>swirl</button></Link>
          <Link to="switch"><button>switch</button></Link>
          <Link to="break"><button>break</button></Link>
        </div>
      </section>
    );
  }
}

export default SelectGame;
