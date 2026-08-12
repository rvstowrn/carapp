import { render } from 'react-dom'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Heading(){
  const location = useLocation();
  const onCards = location.pathname.startsWith('/CardGames');
  const onTrumps = location.pathname.startsWith('/TopTrumps');
  const title = onTrumps ? 'Top Trumps Online' : onCards ? 'Tinder Card Games Edition' : 'Tinder Cars Edition';
  return (
    <div id='head' className='container'>
     	<nav className="nav-wraper">
         {title}
         <div id='switchLinks'>
           <Link to='/' className={!onCards && !onTrumps ? 'activeLink' : ''}>Cars</Link>
           <Link to='/CardGames' className={onCards ? 'activeLink' : ''}>Card Games</Link>
           <Link to='/TopTrumps' className={onTrumps ? 'activeLink' : ''}>Top Trumps</Link>
         </div>
       </nav>
    </div>
  );
}
export default Heading;
