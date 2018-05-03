import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SelectTime extends Component {
  render() {
    return (
      <section className="center vertical">
        <h1 className="section-select">Select your Time (minutes)</h1>
        <div className="section-options">
          <Link to={`/${this.props.game}/1`}><button>1</button></Link>
          <Link to={`/${this.props.game}/3`}><button>3</button></Link>
          <Link to={`/${this.props.game}/5`}><button>5</button></Link>
        </div>
      </section>
    );
  }
}

export default SelectTime;
