import { render } from 'react-dom'
import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Deck from './components/swipe'
import Sell from './components/sell'
import Heading from './components/heading.js'
function Index(){
  return(
    <Router>
          <Heading />
          <Switch> 
          <Route path="/" exact component={Deck} />
          <Route path="/Sell/:id" exact component={Sell} />
          </Switch>
    </Router>
  );
}

render(<Index />, document.getElementById('root'))
