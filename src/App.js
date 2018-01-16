import React, { Component } from 'react';
import Intro from './components/Intro.js';
import SelectGame from './components/SelectGame.js';
import SelectTime from './components/SelectTime.js';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPage: "intro",
      game: null
    }

    this.selectGame = this.selectGame.bind(this);
  }

  changePage(page) {
    this.setState({currentPage: page})
  }

  selectGame(game) {
    this.setState({
      game: game,
      currentPage: "select-time"
    })
  }

  render() {

    let currentPage = null;
    switch (this.state.currentPage) {
      case "intro":
        currentPage = <Intro onButtonClick={() => this.changePage("select-game")}/>
        break;
      case "select-game":
        currentPage = <SelectGame onButtonClick={this.selectGame} />
        break;
      case "select-time":
        currentPage = <SelectTime />
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
