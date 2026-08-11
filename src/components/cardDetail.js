import React from 'react'
import cardgames from './carddata.js'

export default function CardDetail(props) {

  var x = props.match.params.id;
  var tab = props.match.params.tab;
  var arr = cardgames.games;
  var game = arr[x];

  const active = name => name === tab ? 'element activeSphere' : 'element';

  return (
    <div id='mainDiv'>

      <div id='title'>
        <img className='responsive-img' src={game.url}></img>
        <div>
          <h2>{game.Name}</h2>
          <h2>{game.Category}</h2>
        </div>
      </div>

      <div className='elementContainer'>
        <div className={active('rules')}>
          <i className="material-icons gameIcon orange-text">gavel</i>
          <p>Rules</p>
        </div>
        <div className={active('players')}>
          <i className="material-icons gameIcon black-text">people</i>
          <p>Players: {game.Players}</p>
        </div>
        <div className={active('difficulty')}>
          <i className="material-icons gameIcon green-text">bar_chart</i>
          <p>Difficulty: {game.Difficulty}</p>
        </div>
        <div className={active('objective')}>
          <i className="material-icons gameIcon blue-text">flag</i>
          <p>{game.Objective}</p>
        </div>
      </div>
      <div id='btnc' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <a className='btn green waves-effect waves-light'>
          <i class="material-icons left">play_arrow</i>
          Play Now
        </a>
        <a href={window.location.origin + '/CardGames'} className='btn red waves-effect waves-light'>
          <i class="material-icons left">reply</i>
          Go back
        </a>
      </div>
    </div>
  );
}
