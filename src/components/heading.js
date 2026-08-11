import { render } from 'react-dom'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Heading(){
  const location = useLocation();
  const onCards = location.pathname.startsWith('/CardGames');
  return (
    <div id='head' className='container'>
     	<nav className="nav-wraper">
         {onCards ? 'Tinder Card Games Edition' : 'Tinder Cars Edition'}
         <div id='switchLinks'>
           <Link to='/' className={onCards ? '' : 'activeLink'}>Cars</Link>
           <Link to='/CardGames' className={onCards ? 'activeLink' : ''}>Card Games</Link>
         </div>
       </nav>
    </div>
  );
}
export default Heading;
