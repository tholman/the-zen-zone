import React, { Component } from 'react';

class SelectTime extends Component {
  render() {
    return (
      <section className="center vertical">
        <h1 className="section-select">Select your Time (minutes)</h1>
        <div className="section-options">
          <button onClick={()=>this.props.onButtonClick(1)}>1</button>
          <button onClick={()=>this.props.onButtonClick(3)}>3</button>
          <button onClick={()=>this.props.onButtonClick(5)}>5</button>
        </div>
      </section>
    );
  }
}

export default SelectTime;
