import React, { Component } from 'react';

class SelectGame extends Component {
  render() {
    return (
      <section className="center vertical">
        <h1 className="section-select">Select your Game</h1>
        <div className="section-options">
          <button onClick={()=>this.props.onButtonClick("swirl")}>swirl</button>
          <button onClick={()=>this.props.onButtonClick("switch")}>switch</button>
          <button onClick={()=>this.props.onButtonClick("break")}>break</button>
        </div>
      </section>
    );
  }
}

export default SelectGame;
