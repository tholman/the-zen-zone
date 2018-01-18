import React, { Component } from 'react';
// import '../styles/SelectGame.css';
// import logo from '../assets/Logo.svg';

class GameSwirl extends Component {

  constructor(props) {
    super(props)

    // this.totalSwitches = this.props.time * 10; // 1 switch for each second
    this.totalSets = this.props.time;

    this.state = {
      currentSet: 0
    }
  }

  componentDidMount() {
    this.context = this.refs.canvas.getContext('2d');
    this.setupSet(this.state.currentSet);
  }

  setupSet() {

    // Prepare shape with current set data
    // Apply splash and random velocities
    // Set up randomized points to be erased
  }

  drawCanvas() {
    // TODO: Draw based on current set knowledge
  }

  onMouseMove(event) { // & touch event?
    // X = event.x, y = event.x
    // for each dot, is dot within RANGE of the cursor
    // update dots in each set
  }

  render() {
    return (
      <section className="center">
        <canvas
          ref="canvas"
          width={window.innerWidth}
          height={window.innerHeight}></canvas>
      </section>
    );
  }
}

export default GameSwirl;
