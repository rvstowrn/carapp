import { render } from 'react-dom'
import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Deck from './components/swipe'
import Sell from './components/sell'
import Heading from './components/heading.js'
import CardDeck from './components/cardDeck.js'
import CardDetail from './components/cardDetail.js'
import TopTrumps from './components/topTrumps.js'
function Index(){
  return(
    <Router>
          <Heading />
          <Switch>
          <Route path="/" exact component={Deck} />
          <Route path="/Sell/:id" exact component={Sell} />
          <Route path="/CardGames" exact component={CardDeck} />
          <Route path="/CardGames/Play/:id/:tab" exact component={CardDetail} />
          <Route path="/TopTrumps" exact component={TopTrumps} />
          </Switch>
    </Router>
  );
}

render(<Index />, document.getElementById('root'))
