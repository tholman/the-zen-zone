import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/Logo.svg';

const BackButton = ({ endGame }) => (
  <Link to="/">
    <div className="back" onClick={(event) => {endGame(event)}}>
      <img src={logo} className="App-logo" alt="The Zen Zone" />
    </div>
  </Link>
);

export default BackButton