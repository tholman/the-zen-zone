import React, { Component } from 'react';
import '../styles/GameSwitch.css';
// import logo from '../assets/Logo.svg';

class GameSwitch extends Component {

  constructor(props) {
    super(props)
    this.totalSwitches = this.props.time * 10; // 1 switch for each second
    this.onSwitches = 0;
  }

  onCheckboxChange(event) {
    if( event.target.checked ) {
      this.onSwitches++;
    } else {
      this.onSwitches--;
    }

    if (this.onSwitches === this.totalSwitches) {
      console.log("done!");
    }
  }

  render() {
    let switches = [];
    for (var i = 0; i < this.totalSwitches; i++) {
      let id = "switch-" + i;
      switches.push(
        <div key={i} className="switch">
          <input id={id}  className="input" type="checkbox" onChange={(event) => {this.onCheckboxChange(event)}}/>
          <label htmlFor={id} className="slider"></label>
        </div>
      );
    }

    return (
      <section className="center">
        <div className="switches-container">
          {switches}
        </div>
      </section>
    );
  }
}

export default GameSwitch;
