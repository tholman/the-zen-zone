import React, { Component } from 'react';
import { withRouter } from 'react-router';
import BackButton from './BackButton.js';
import '../styles/GameBreak.css';
import '../styles/Carousel.css';
import breakSets from '../data/BreakSets.js';

class GameBreak extends Component {

  constructor(props) {

    super(props)

    this.startTime = new Date();
    this.baseWidth = 1000;

    this.currentSet = 0;
    this.totalSets = this.props.time;
    this.currentSetData = null;
    this.sets = [];

    this.oldMousePosition = {x: 0, y: 0};
    this.newMousePosition = {x: 0, y: 0};

    this.onInputMove = this.onInputMove.bind(this);

    this.state = {
      currentSet: 0
    }
  }

  componentDidMount() {
    this.setupSets(this.totalSets);
    this.drawInitialSets();
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

      let point = {x: set.canvas.width / 2, y: set.canvas.width / 2, radius: 420, active: true, level: 0};

      set.points.push(point);
      this.sets.push(set)
    }

    this.currentSetData = this.sets[this.currentSet];
  }

  drawInitialSets() {

    // Draw the initial point
    for( let i = 0; i < this.totalSets; i++) {
      this.currentSetData = this.sets[i];
      this.drawPoint(this.currentSetData.points[0]);
    }

    this.currentSetData = this.sets[this.currentSet];
  }


  drawPoint(point) {
    
    // Erase current point
    let context = this.currentSetData.context;

    let color = breakSets[this.currentSet].colors[point.level];
    context.fillStyle = color;

    context.beginPath();
    context.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
    context.fill();

  }

  clearPoint(point) {
    let context = this.currentSetData.context;
    context.clearRect(point.x - point.radius, point.y - point.radius, point.radius * 2, point.radius * 2);
  }

  update() {

    let foundActive = false;

    // Find what needs splitting
    for( let i = 0; i < this.currentSetData.points.length; i++) {
      let point = this.currentSetData.points[i];
      if( point.active === true && point.level < 6) {
        foundActive = true;
        var oldDistance = Math.hypot(this.oldMousePosition.x - point.x, this.oldMousePosition.y - point.y);
        var newDistance = Math.hypot(this.newMousePosition.x - point.x, this.newMousePosition.y - point.y);
        if( oldDistance > point.radius && newDistance < point.radius ) {
          this.currentSetData.points[i].splitMe = true;
        }
      }
    }

    if( foundActive === false ) {
      
      this.currentSet++;

      if ( this.state.currentSet === this.totalSets - 1) {
        this.endGame();
      } else {
        this.setState({'currentSet': this.currentSet})
        this.currentSetData = this.sets[this.currentSet];
      }
      return;
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
          active: true,
          level: point.level + 1
        }


        let pointB = {
          x: point.x - point.radius / 2,
          y: point.y - point.radius / 2,
          radius: point.radius / 2,
          active: true,
          level: point.level + 1
        }

        let pointC = {
          x: point.x - point.radius / 2,
          y: point.y + point.radius / 2,
          radius: point.radius / 2,
          active: true,
          level: point.level + 1
        }

        let pointD = {
          x: point.x + point.radius / 2,
          y: point.y + point.radius / 2,
          radius: point.radius / 2,
          active: true,
          level: point.level + 1
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

  endGame() {
    let totalTime = new Date().valueOf() - this.startTime.valueOf();
    this.props.completedGame(totalTime);
    this.props.history.push('/');
  }

  onInputMove(event) { // & touch event?
    this.oldMousePosition = this.newMousePosition;

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
    this.newMousePosition = {
      x: x * multiplier,
      y: y * multiplier
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

export default withRouter(GameBreak);
