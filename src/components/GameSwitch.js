import React, { Component } from 'react';
import '../styles/GameSwitch.css';
import '../styles/Carousel.css';
import switchSets from '../data/SwitchSets.js';
// import logo from '../assets/Logo.svg';

class GameSwitch extends Component {

  constructor(props) {
    super(props)
    
    // this.totalSwitches = this.props.time * 10; // 1 switch for each second
    this.totalSets = this.props.time;
    this.currentSetOnSwitches = 0;

    this.state = {
      currentSet: 0
    }
  }

  onCheckboxChange(event) {
    if( event.target.checked ) {
      this.currentSetOnSwitches++;
    } else {
      this.currentSetOnSwitches--;
    }

    if (this.currentSetOnSwitches === switchSets[this.state.currentSet].switchCount) {

      // Last set!
      if ( this.state.currentSet === this.totalSets - 1) {
        this.props.completedGame(100); // passing time in milliseconds
      }

      this.setState({currentSet: this.state.currentSet + 1});
      this.currentSetOnSwitches = 0;
    }
  }

  renderSets() {

    var sets = [];

    // TODO: Swap for foreach
    for( let i = 0; i < this.totalSets; i++ ) {

      let set = switchSets[i];
      let active = (this.state.currentSet === i);

      let switches = this.renderSwitches(i, set.switchCount);
      let id = "set-" + i;
      
      // TODO: Replace with react class thingo
      let className = "item";
      if( active ) {
        className += " active";
      }

      sets.push(
        <div key={id} id={id} className={className}>
          <div className="center">
            <div className="item-contents switch-box">
              { switches }
            </div>
          </div>
        </div>
      )
    }

    return sets;
  }

  renderSwitches(set, amount, active) {
    let switches = [];
    for (var i = 0; i < amount; i++) {
      
      let id = "switch-" + set + "-" + i;

      switches.push(
        <div className="switch" key={id}>
          <input id={id}  className="input" type="checkbox" onChange={(event) => {this.onCheckboxChange(event)}}/>
          <label htmlFor={id} className="slider"></label>
        </div>
      );
    }

    return switches;
  }

  render() {
    let sets = this.renderSets();
    let carouselStyles = {
      width: this.totalSets * 100 + 'vw',
      transform: "translateX(-" + this.state.currentSet * 60 + "vw)"
    }

    return (
      <section className="carousel-container">
        <div className="carousel" style={carouselStyles}>
          {sets}
        </div>
      </section>
    );
  }
}

export default GameSwitch;
