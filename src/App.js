import React, { Component } from 'react';
import Intro from './components/Intro.js';
import SelectGame from './components/SelectGame.js';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPage: "intro"
    }
  }

  changePage(page) {
    this.setState({currentPage: page})
  }

  render() {

    let currentPage = null;
    switch (this.state.currentPage) {
      case "intro":
        currentPage = <Intro onButtonClick={() => this.changePage("select-game")}/>
        break;
      case "select-game":
        currentPage = <SelectGame />
        break;
      default:
        break;
    }
    
    return (
      <div className="app">
        { currentPage }
      </div>
    );
  }


}

export default App;
