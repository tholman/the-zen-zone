import React, { Component } from 'react';
import '../styles/Reflection.css';
// import logo from '../assets/Logo.svg';

class Reflection extends Component {
  render() {
    return (
      <section className="center">
        Nice, you have been meditating for X minutes and Y seconds
        <button onClick={this.props.onButtonClick}>Lets do some more</button>
      </section>
    );
  }
}

export default Reflection;
