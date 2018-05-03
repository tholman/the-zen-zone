import React from 'react';

import GameSwirl from './GameSwirl.js';
import GameSwitch from './GameSwitch.js';
import GameBreak from './GameBreak.js';
import Intro from './Intro.js';

const Game = ({ name, time, completedGame }) => {
  switch (name) {
    case 'swirl':
      return <GameSwirl time={time} completedGame={completedGame} />;
    case 'switch':
      return <GameSwitch time={time} completedGame={completedGame} />;
    case 'break':
      return <GameBreak time={time} completedGame={completedGame} />;
    default:
      return <Intro />;
  }
};

export default Game;
