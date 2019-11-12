import React, { useState } from 'react'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'
import cars from './data.js'
import Bottom from './bottom.js'


var carsdeck = cars.cars;

const from = i => ({ x: 0, y: -1000 , scale: 1.5})
const to = i => ({ x: 0, y: 0, scale: 1, delay: i * 100 })


function Deck() { 
    
    var dir,trigger,flag;
    const [gone] = useState(() => new Set()) 
    const [props, set] = useSprings(carsdeck.length, i => ({ ...to(i), from: from(i) })) 
    
    const bind = useDrag(({ args: [index], down, movement: [mx], distance, direction: [xDir] }) => {
      
      trigger = mx > 150 || mx< -150 
      dir = mx < 0 ? -1 : 1 
     
      
      if (!down && trigger) 
      gone.add(index) 
      flag=0;
      set(i => {
        if (index === i) {
        const isGone = gone.has(index)
        // if(isGone)
        const x = isGone ? (900 + window.innerWidth) * dir : down ? mx : 0 
        flag=x
        return { x, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
      }})
      
      if(flag>window.innerWidth)
      {
        setTimeout(function() { 
           window.location.replace(window.location.href+'Sell/'+index);
        }, 500)  
      }
    if (!down && gone.size === carsdeck.length) 
    setTimeout(() => gone.clear() || set(i => to(i)), 600)
    })

      return props.map(({ x, y }, i) => (  
      <React.Fragment>
        <animated.div id='swipedivouter' key={i} style={{ x, y }}>
            <animated.div className='container' id='swipedivinner' {...bind(i)} style={{  backgroundImage: `url(${carsdeck[i].url})` }}>
              <p>{carsdeck[i].Model}<br/>{carsdeck[i].Company}</p>
            </animated.div>
        </animated.div>
        <Bottom />
      </React.Fragment>  
      ))
}

  export default Deck;