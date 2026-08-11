// Generates a self-contained fanned-cards illustration per game (no external image hosting needed).
function cardArt(suit, suitColor, bgFrom, bgTo) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${bgFrom}'/>
        <stop offset='1' stop-color='${bgTo}'/>
      </linearGradient>
    </defs>
    <rect width='800' height='600' fill='url(#bg)'/>
    <text x='400' y='420' font-size='260' fill='${suitColor}' opacity='0.14' font-family='Arial' text-anchor='middle'>${suit}</text>
    <g transform='translate(400,300)'>
      <g transform='rotate(-18) translate(-155,-120)'>
        <rect x='0' y='0' width='170' height='240' rx='16' fill='white' stroke='#ccc' stroke-width='2'/>
        <text x='16' y='42' font-size='36' fill='${suitColor}' font-family='Arial'>${suit}</text>
      </g>
      <g transform='rotate(0) translate(-85,-140)'>
        <rect x='0' y='0' width='170' height='240' rx='16' fill='white' stroke='#ccc' stroke-width='2'/>
        <text x='16' y='42' font-size='36' fill='${suitColor}' font-family='Arial'>${suit}</text>
      </g>
      <g transform='rotate(18) translate(-15,-120)'>
        <rect x='0' y='0' width='170' height='240' rx='16' fill='white' stroke='#ccc' stroke-width='2'/>
        <text x='16' y='42' font-size='36' fill='${suitColor}' font-family='Arial'>${suit}</text>
      </g>
    </g>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

var games = [
  { Name: 'Poker', Category: 'Card Game', Players: '2-8', Difficulty: 'Medium', Objective: 'Make the best five-card hand and win the pot',
    url: cardArt('&#9824;', '#222', '#1e3c72', '#2a5298') },
  { Name: 'Blackjack', Category: 'Card Game', Players: '1-7', Difficulty: 'Easy', Objective: 'Get as close to 21 as possible without going over',
    url: cardArt('&#9830;', '#d32f2f', '#ff512f', '#dd2476') },
  { Name: 'Rummy', Category: 'Card Game', Players: '2-6', Difficulty: 'Medium', Objective: 'Form sets and runs before your opponents do',
    url: cardArt('&#9827;', '#222', '#11998e', '#38ef7d') },
  { Name: 'Solitaire', Category: 'Card Game', Players: '1', Difficulty: 'Easy', Objective: 'Sort the entire deck into ordered suit piles',
    url: cardArt('&#9829;', '#d32f2f', '#603813', '#b29f94') },
  { Name: 'UNO', Category: 'Card Game', Players: '2-10', Difficulty: 'Easy', Objective: 'Be the first to empty your hand and shout UNO',
    url: cardArt('&#9824;', '#222', '#f2994a', '#f2c94c') },
  { Name: 'Bridge', Category: 'Card Game', Players: '4', Difficulty: 'Hard', Objective: 'Bid and win tricks together with your partner',
    url: cardArt('&#9830;', '#d32f2f', '#34495e', '#2c3e50') },
  { Name: 'Hearts', Category: 'Card Game', Players: '4', Difficulty: 'Medium', Objective: 'Avoid taking hearts and the Queen of Spades',
    url: cardArt('&#9829;', '#d32f2f', '#ed213a', '#93291e') },
  { Name: 'Go Fish', Category: 'Card Game', Players: '2-6', Difficulty: 'Easy', Objective: 'Collect four-of-a-kind sets by asking opponents',
    url: cardArt('&#9827;', '#222', '#2193b0', '#6dd5ed') },
  { Name: 'Spades', Category: 'Card Game', Players: '4', Difficulty: 'Medium', Objective: 'Bid tricks and partner up to hit your bid',
    url: cardArt('&#9824;', '#222', '#232526', '#414345') },
  { Name: 'Crazy Eights', Category: 'Card Game', Players: '2-7', Difficulty: 'Easy', Objective: 'Match rank or suit and be first to dump your hand',
    url: cardArt('&#9830;', '#d32f2f', '#8e2de2', '#4a00e0') },
]

export default { games }
