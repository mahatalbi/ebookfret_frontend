import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';

import RoutesWithNavigation from './components/RoutesWithNavigation';



const App = () => {
    return (
          <Switch>
            <RoutesWithNavigation/>
          </Switch>
    );
}

export default App;
