import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation/>
      <button onClick={props.onLogout}>Logout</button>
    </header>
  );
};

export default MainHeader;
