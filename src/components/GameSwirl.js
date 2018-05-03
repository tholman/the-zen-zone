import React, { Component } from 'react';
import { withRouter } from 'react-router';
import BackButton from './BackButton.js'
import '../styles/GameSwirl.css';
import '../styles/Carousel.css';
import swirlSets from '../data/SwirlSets.js';

class GameSwirl extends Component {

  constructor(props) {
    super(props)

    this.startTime = new Date();
    this.baseWidth = 1000; // Base canvas width

    this.currentSet = 0;
    this.totalSets = this.props.time;
    this.sets = [];

    this.currentSetData = null;

    this.animationFrame = true;
    this.canvasCenter = null;
    
    this.mousePosition = {x: 0, y: 0}
    
    this.drawLoop = this.drawLoop.bind(this);
    this.onInputMove = this.onInputMove.bind(this);

    this.state = {
      currentSet: 0
    }
  }

  componentDidMount() {
    this.setupSets(this.totalSets);
    this.drawInitialSets();
    this.drawLoop();
  }

  setupSets(setCount) {

    for( let i = 0; i < setCount; i++) {

      let set = {
        canvas: this.refs['canvas-' + i],
        context: this.refs['canvas-' + i].getContext('2d'),
        points: []
      };

      set.canvas.width = this.baseWidth;
      set.canvas.height = this.baseWidth;

      for (let j = 0; j < 550; j++) {
        let point = swirlSets[i].system(j, set.canvas.width, set.canvas.height);
        point.active = true;
        point.life = 1;

        set.points.push(point);
      }

      this.sets.push(set)
    }

    this.currentSetData = this.sets[this.currentSet];
  }

  drawInitialSets() {

    for( let i = 0; i < this.totalSets - 1; i++) {
      this.currentSetData = this.sets[i];
      this.draw();
    }

    this.currentSetData = this.sets[this.currentSet];
  }

  drawLoop() {
    this.update();
    if( this.animationFrame ) {

      this.draw();
      this.animationFrame = requestAnimationFrame(this.drawLoop);
    }
  }

  draw() {
    
    this.currentSetData.canvas.width = this.currentSetData.canvas.width;
    
    let context = this.currentSetData.context;
    let points = this.currentSetData.points;

    context.lineCap = "round";
    context.moveTo(points[0].x, points[0].y)
    
    for( let i = 1; i < points.length - 1; i++ ) {
      context.strokeStyle = "rgba(0, 0, 0, " + (0.1 + points[i].life) + ")";
      context.lineWidth = (8 * points[i].life + 2) + "";
      
      context.beginPath();
      context.moveTo(points[i - 1].x, points[i - 1].y);
      context.lineTo(points[i].x, points[i].y);
      context.stroke();
    }
  }

  update() {

    let points = this.currentSetData.points;
    let foundActive = false;
    
    for( let i = 0; i < points.length; i++ ) {
      let dot = points[i];
      let a = this.mousePosition.x - dot.x;
      let b = this.mousePosition.y - dot.y;
      let distance = Math.sqrt( a * a + b * b ); // distance between mouse and set item.

      if( points[i].active === true ) {
        foundActive = true;
      }

      if( distance < 50 && points[i].active === true) {

        // Fade out
        points[i].life = points[i].life - 0.04;
        if( points[i].life <= 0 ) {
          points[i].active = false;
        }

      } else if (points[i].active === true && points[i].life < 1) {

        // Fade back in
        points[i].life = points[i].life + 0.05;
      }
    }

    if( foundActive === false ) {
      this.currentSet++;

      if (this.state.currentSet === this.totalSets - 1) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
        this.endGame();
      } else {
        this.setState({'currentSet': this.currentSet})
        this.currentSetData = this.sets[this.currentSet];
      }
    }
  }

  endGame() {
    let totalTime = new Date().valueOf() - this.startTime.valueOf();
    this.props.completedGame(totalTime);
    this.props.history.push('/');
  }

  onInputMove(event) { 

    var rect = this.currentSetData.canvas.getBoundingClientRect();

    let x, y = 0;
    if(event.nativeEvent.changedTouches) {
      x = event.nativeEvent.changedTouches[0].clientX - rect.left;
      y = event.nativeEvent.changedTouches[0].clientY - rect.top;
    } else {
      x = event.nativeEvent.clientX - rect.left;
      y = event.nativeEvent.clientY - rect.top;
    }

    let multiplier = this.baseWidth / this.currentSetData.canvas.clientWidth;
    this.mousePosition = {
      x: x * multiplier,
      y: y * multiplier
    };
  }

  renderSets() {

    var sets = [];

    // TODO: Swap for foreach
    for( let i = 0; i < this.totalSets; i++ ) {

      // let set = swirlSets[i];
      let active = (this.state.currentSet === i);
      let id = "set-" + i;
      let canvasRef = "canvas-" + i;
      
      // TODO: Replace with react class thingo
      let className = "item";
      if( active ) {
        className += " active";
      }

      sets.push(
        <div key={id} id={id} className={className}>
          <div className="center">
            <div className="item-contents">
              <canvas
                ref={canvasRef}
                width="1000"
                height="1000"
                onMouseMove={this.onInputMove}
                onTouchMove={this.onInputMove}>
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
    
    // TODO: This should not rely on magic numbers
    let moveUnit = 60; // width of carousel + margin
    if( window.innerWidth < 700) {
      moveUnit = 85; // Smaller screens have larger central item
    }

    let carouselStyles = {
      width: this.totalSets * 100 + 'vw',
      transform: "translateX(-" + this.state.currentSet * moveUnit + "vw)"
    }

    return (
      <div>
        <BackButton endGame={(event) => {this.endGame(event)}} />
        <section className="carousel-container">
          <section className="carousel" style={carouselStyles}>
            {sets}
          </section>
        </section>
      </div>
    );
  }
}

export default withRouter(GameSwirl);
