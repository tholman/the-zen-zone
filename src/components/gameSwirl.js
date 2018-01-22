import React, { Component } from 'react';

import '../styles/GameSwirl.css';
import '../styles/Carousel.css';

import swirlSets from '../data/SwirlSets.js';

class GameSwirl extends Component {

  constructor(props) {
    super(props)

    this.currentSet = 0;
    this.totalSets = this.props.time;

    this.animationFrame = null;
    this.canvasCenter = null;
    this.sets = [];
    this.position = {x: 0, y: 0}
    this.draw = this.draw.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.state = {
      currentSet: 0
    }
  }

  // componentDidMount() {
  //   this.context = this.refs.canvas.getContext('2d');
  //   this.refs.canvas.width = 1000;
  //   this.refs.canvas.height = 1000;
  //   this.setupSet(this.state.currentSet);
  //   this.draw();
  // }

  setupSet() {
    this.canvasCenter = {x: window.innerWidth, y: window.innerHeight}

    for (let i = 0; i < 550; i++) {

        let point = swirlSets[this.currentSet].system(i, this.refs.canvas.width, this.refs.canvas.height);
        point.active = true;
        point.life = 1;

        this.sets.push(point);
    }
  }

  draw() {

    this.update();

    // Clear
    this.refs.canvas.width = this.refs.canvas.width;

    // Draw based on current set knowledge
    // this.context.strokeStyle = "#000";
    this.context.lineWidth = "6";
    this.context.lineCap = "round";
    this.context.moveTo(this.sets[0].x, this.sets[0].y)
    
    for( let i = 1; i < this.sets.length - 1; i++ ) {

      this.context.beginPath();
      this.context.moveTo(this.sets[i - 1].x, this.sets[i - 1].y);

      // if( this.sets[i].active ) {
        this.context.strokeStyle = "rgba(0, 0, 0, " + (0.1 + this.sets[i].life) + ")";
        this.context.lineWidth = (8 * this.sets[i].life + 2) + "";
        // console.log(6 * this.sets[i].life + 1)

        this.context.lineTo(this.sets[i].x, this.sets[i].y);
        this.context.stroke();
      // } else {
        // this.context.moveTo(this.sets[i].x, this.sets[i].y);
      // }
    }


    this.animationFrame = requestAnimationFrame(this.draw);
  }

  update() {
    for( let i = 0; i < this.sets.length; i++ ) {
      let dot = this.sets[i];
      let a = this.position.x - dot.x;
      let b = this.position.y - dot.y;
      let distance = Math.sqrt( a * a + b * b ); // distance between mouse and set item.

      if( distance < 50 && this.sets[i].active === true) {
        
        // Fade out
        this.sets[i].life = this.sets[i].life - 0.04;
        if( this.sets[i].life <= 0 ) {
          this.sets[i].active = false;
        }

      } else if (this.sets[i].active === true && this.sets[i].life < 1) {

        // Fade back in
        this.sets[i].life = this.sets[i].life + 0.05;
      }
    }    
  }

  onMouseMove(event) { // & touch event?
    
    // X = event.x, y = event.x
    var rect = this.refs.canvas.getBoundingClientRect();
    this.position = {
      x: (event.nativeEvent.clientX - rect.left) * 2,
      y: (event.nativeEvent.clientY - rect.top) * 2
    };
  }

  renderSets() {

    var sets = [];

    // TODO: Swap for foreach
    for( let i = 0; i < this.totalSets; i++ ) {

      // let set = swirlSets[i];
      let active = (this.state.currentSet === i);
      let id = "set-" + i;
      
      // TODO: Replace with react class thingo
      let className = "item-set";
      if( active ) {
        className += " active";
      }

      sets.push(
        <div key={id} id={id} className={className}>
          <div className="center">
            <div className="switches-container">
              <canvas
                ref="canvas"
                width="1000"
                height="1000"
                onMouseMove={this.onMouseMove}>
              </canvas>
            </div>
          </div>
        </div>
      )
    }

    return sets;
  }

  render() {

    let sets = this.renderSets();
    let carouselStyles = {
      width: this.totalSets * 100 + 'vw',
      transform: "translateX(-" + this.state.currentSet * 60 + "vw)"
    }

    return (
      <section className="center" style={carouselStyles}>
        {sets}
      </section>
    );
  }
}

export default GameSwirl;
