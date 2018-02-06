import React, { Component } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
    this.setState({currentPage: ""});
    setTimeout(() => {this.setState({currentPage: page})}, 450);
    
  }

  selectGame(game) {
    this.setState({
      game: game
    })

    this.changePage("select-time")
  }

  selectTime(time) {
    this.setState({
      time: time
    });

    this.changePage("game");
  }

  completedGame(totalTime) {

    this.setState({
      game: null,
      time: null,
      totalTime: this.state.totalTime + totalTime
    })

    this.changePage("reflection")
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
        currentPage = <SelectTime onButtonClick={this.selectTime}/>
        break;
      case "game":
        switch (this.state.game) {
          case "swirl":
            currentPage = <GameSwirl time={this.state.time} completedGame={this.completedGame} />
            break;
          case "switch":
            currentPage = <GameSwitch time={this.state.time} completedGame={this.completedGame} />
            break;
          case "break":
            currentPage = <GameBreak time={this.state.time}  completedGame={this.completedGame} />
            break;
          default:
            currentPage = <span></span>;
            break;
        }
        break;
      case "reflection":
        currentPage = <Reflection totalTime={this.state.totalTime} onButtonClick={() => this.changePage("select-game")} />
        break;
      default:
        currentPage = <span></span>;
        break;
    }

    let page = <CSSTransition
      key={this.state.currentPage}
      classNames="fade"
      timeout={{ enter: 400, exit: 400 }}>
        {currentPage}
      </CSSTransition>
    
    return (

      <div className="app">
        <TransitionGroup>
          { page }
        </TransitionGroup>
      </div>
    );
  }
}

export default App;
