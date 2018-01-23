import React, { Component } from 'react';

import '../styles/GameBreak.css';
import '../styles/Carousel.css';

import breakSets from '../data/BreakSets.js';

class GameBreak extends Component {

  constructor(props) {

    super(props)

    this.currentSet = 0;
    this.totalSets = this.props.time;
    this.currentSetData = null;
    this.sets = [];

    this.oldMousePosition = {x: 0, y: 0};
    this.newMousePosition = {x: 0, y: 0};

    this.onMouseMove = this.onMouseMove.bind(this);

    this.state = {
      currentSet: 0
    }
  }

  componentDidMount() {
    this.setupSets(this.totalSets);
    this.drawInitialSets();
    // this.drawLoop();
  }

  setupSets(setCount) {

    for( let i = 0; i < setCount; i++) {

      let set = {
        canvas: this.refs['canvas-' + i],
        context: this.refs['canvas-' + i].getContext('2d'),
        points: []
      };

      set.canvas.width = 1000;
      set.canvas.height = 1000;

      let point = {x: set.canvas.width / 2, y: set.canvas.width / 2, radius: 420, active: true};

      set.points.push(point);
      this.sets.push(set)
    }

    this.currentSetData = this.sets[this.currentSet];
  }

  drawInitialSets() {

    // Draw the initial point
    this.drawPoint(this.currentSetData.points[0]);
    // for( let i = 0; i < this.totalSets - 1; i++) {
    //   this.currentSetData = this.sets[i];
    //   this.draw();
    // }

    // this.currentSetData = this.sets[this.currentSet];
  }


  drawPoint(point) {
    
    // Erase current point
    let context = this.currentSetData.context;
    
    context.beginPath();
    context.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
    context.fill();

  }

  clearPoint(point) {
    let context = this.currentSetData.context;
    context.clearRect(point.x - point.radius, point.y - point.radius, point.radius * 2, point.radius * 2);
  }

  update() {

    // Find what needs splitting
    for( let i = 0; i < this.currentSetData.points.length; i++) {
      let point = this.currentSetData.points[i];
      if( point.active === true ) {
        var oldDistance = Math.hypot(this.oldMousePosition.x - point.x, this.oldMousePosition.y - point.y);
        var newDistance = Math.hypot(this.newMousePosition.x - point.x, this.newMousePosition.y - point.y);
        if( oldDistance > point.radius && newDistance < point.radius ) {
          this.currentSetData.points[i].splitMe = true;
        }
      }
    }

    // Split items that need splitting
    for( let i = this.currentSetData.points.length - 1; i >= 0; i--) {
      
      let point = this.currentSetData.points[i];
      
      if( point.splitMe === true ) {
        
        this.clearPoint(point)
        
        // Split to four
        let pointA = {
          x: point.x + point.radius / 2,
          y: point.y - point.radius / 2,
          radius: point.radius / 2,
          active: true
        }


        let pointB = {
          x: point.x - point.radius / 2,
          y: point.y - point.radius / 2,
          radius: point.radius / 2,
          active: true
        }

        let pointC = {
          x: point.x - point.radius / 2,
          y: point.y + point.radius / 2,
          radius: point.radius / 2,
          active: true
        }

        let pointD = {
          x: point.x + point.radius / 2,
          y: point.y + point.radius / 2,
          radius: point.radius / 2,
          active: true
        }

        this.currentSetData.points.push(pointA);
        this.currentSetData.points.push(pointB);
        this.currentSetData.points.push(pointC);
        this.currentSetData.points.push(pointD);

        this.drawPoint(pointA);
        this.drawPoint(pointB);
        this.drawPoint(pointC);
        this.drawPoint(pointD);

        this.currentSetData.points.splice(i, 1);
      }
    }
  }

  onMouseMove(event) { // & touch event?
    this.oldMousePosition = this.newMousePosition;

    var rect = this.currentSetData.canvas.getBoundingClientRect();
    this.newMousePosition = {
      x: (event.nativeEvent.clientX - rect.left) * 2,
      y: (event.nativeEvent.clientY - rect.top) * 2
    };

    this.update();
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
      <section className="carousel-container">
        <section className="carousel" style={carouselStyles}>
          {sets}
        </section>
      </section>
    );
  }
}

export default GameBreak;
