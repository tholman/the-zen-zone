import React, { Component } from 'react';

import Intro from './components/Intro.js';
import SelectGame from './components/SelectGame.js';
import SelectTime from './components/SelectTime.js';
import Reflection from './components/Reflection.js';

import GameSwirl from './components/GameSwirl.js';
import GameSwitch from './components/GameSwitch.js';
import GameBreak from './components/GameBreak.js';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPage: "intro",
      game: null,
      time: null,
      totalTime: 0 //milliseconds
    }

    this.selectGame = this.selectGame.bind(this);
    this.selectTime = this.selectTime.bind(this);
    this.completedGame = this.completedGame.bind(this);
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

  selectTime(time) {
    this.setState({
      time: time,
      currentPage: "game"
    })
  }

  completedGame(totalTime) {
    this.setState({
      currentPage: "reflection",
      game: null,
      time: null,
      totalTime: this.state.totalTime + totalTime
    })
  }

  render() {

    let currentPage = null;
    currentPage = <GameBreak time={1}  completedGame={this.completedGame} />
    // switch (this.state.currentPage) {
    //   case "intro":
    //     currentPage = <Intro onButtonClick={() => this.changePage("select-game")}/>
    //     break;
    //   case "select-game":
    //     currentPage = <SelectGame onButtonClick={this.selectGame} />
    //     break;
    //   case "select-time":
    //     currentPage = <SelectTime onButtonClick={this.selectTime}/>
    //     break;
    //   case "game":
    //     switch (this.state.game) {
    //       case "swirl":
    //         currentPage = <GameSwirl time={this.state.time} completedGame={this.completedGame} />
    //         break;
    //       case "switch":
    //         currentPage = <GameSwitch time={this.state.time} completedGame={this.completedGame} />
    //         break;
    //       case "break":
    //         currentPage = <GameBreak time={this.state.time}  completedGame={this.completedGame} />
    //         break;
    //       default:
    //         break;
    //     }
    //     break;
    //   case "reflection":
    //     currentPage = <Reflection onButtonClick={() => this.changePage("select-game")} />
    //     break;
    //   default:
    //     break;
    // }
    
    return (
      <div className="app">
        { currentPage }
      </div>
    );
  }


}

export default App;
