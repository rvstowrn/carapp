import React, { useState } from 'react'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'
import cardgames from './carddata.js'
import Bottom from './bottom.js'

var deck = cardgames.games;

const from = i => ({ x: 0, y: -1000, scale: 1.5 })
const to = i => ({ x: 0, y: 0, scale: 1, delay: i * 100 })

const options = [
  { tab: 'rules', icon: 'gavel', color: 'orange-text' },
  { tab: 'players', icon: 'people', color: 'black-text' },
  { tab: 'difficulty', icon: 'bar_chart', color: 'green-text' },
  { tab: 'objective', icon: 'flag', color: 'blue-text' },
]

function CardDeck() {

  const [gone] = useState(() => new Set())
  const [props, set] = useSprings(deck.length, i => ({ ...to(i), from: from(i) }))

  const bind = useDrag(({ args: [index], down, movement: [mx], distance, direction: [xDir] }) => {

    const trigger = mx > 150 || mx < -150
    const dir = mx < 0 ? -1 : 1

    if (!down && trigger)
      gone.add(index)

    set(i => {
      if (index === i) {
        const isGone = gone.has(index)
        const x = isGone ? (900 + window.innerWidth) * dir : down ? mx : 0
        return { x, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
      }
    })

    if (!down && gone.size === deck.length)
      setTimeout(() => gone.clear() || set(i => to(i)), 600)
  })

  const openTab = (index, tab) => {
    window.location.href = window.location.origin + '/CardGames/Play/' + index + '/' + tab
  }

  return props.map(({ x, y }, i) => (
    <React.Fragment key={i}>
      <animated.div id='swipedivouter' style={{ x, y }}>
        <animated.div className='container' id='swipedivinner' {...bind(i)} style={{ backgroundImage: `url("${deck[i].url}")` }}>
          <p>{deck[i].Name}<br />{deck[i].Category}</p>
          <div className='cardOptions'>
            {options.map(opt => (
              <i key={opt.tab}
                className={`medium material-icons circle ${opt.color}`}
                onPointerDown={e => e.stopPropagation()}
                onClick={e => { e.stopPropagation(); openTab(i, opt.tab) }}>
                {opt.icon}
              </i>
            ))}
          </div>
        </animated.div>
      </animated.div>
      <Bottom />
    </React.Fragment>
  ))
}

export default CardDeck;
