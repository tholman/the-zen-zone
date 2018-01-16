import React, { Component } from 'react';
import '../styles/SelectTime.css';
// import logo from '../assets/Logo.svg';

class SelectTime extends Component {
  render() {
    return (
      <section className="center">
        Select your Time (minutes)
        <button onClick={()=>this.props.onButtonClick(1)}>1</button>
        <button onClick={()=>this.props.onButtonClick(3)}>3</button>
        <button onClick={()=>this.props.onButtonClick(5)}>5</button>
      </section>
    );
  }
}

export default SelectTime;
