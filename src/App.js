import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Game from './components/Game.js';
import Intro from './components/Intro.js';
import SelectGame from './components/SelectGame.js';
import SelectTime from './components/SelectTime.js';
import Reflection from './components/Reflection.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'intro',
      totalTime: 0, //milliseconds
    };

    this.completedGame = this.completedGame.bind(this);
  }

  completedGame(totalTime) {
    this.setState({
      totalTime: this.state.totalTime + totalTime,
      currentPage: 'reflection',
    });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route
            render={({ location }) => {
              return (
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={{ enter: 800, exit: 400 }}
                  >
                    <Switch location={location}>
                      <Route
                        exact
                        path="/"
                        render={() =>
                          this.state.currentPage === 'intro' ? (
                            <Intro />
                          ) : (
                            <Reflection totalTime={this.state.totalTime} />
                          )
                        }
                      />
                      <Route
                        exact
                        path="/games"
                        render={() => <SelectGame />}
                      />
                      <Route
                        exact
                        path="/:game"
                        render={({ match }) =>
                          ['swirl', 'break', 'switch'].includes(
                            match.params.game
                          ) ? (
                            <SelectTime game={match.params.game} />
                          ) : (
                            <Intro />
                          )
                        }
                      />
                      <Route
                        exact
                        path="/:game/:time"
                        render={({ match }) =>
                          ['swirl', 'break', 'switch'].includes(
                            match.params.game
                          ) ? (
                            typeof Number(match.params.time) === 'number' &&
                            Number(match.params.time) > 0 ? (
                              <Game
                                name={match.params.game}
                                time={match.params.time}
                                completedGame={this.completedGame}
                              />
                            ) : (
                              <SelectTime game={match.params.game} />
                            )
                          ) : (
                            <Intro />
                          )
                        }
                      />
                      <Route path="*" render={() => <Intro />} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

export default App;
