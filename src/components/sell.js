import React from 'react'
import cars from './data.js'

export default function Sell(props) {
    
    var x = props.match.params.id;
    var arr=cars.cars
  return (
    <div id='mainDiv'>
      
      <div id='title'>
        <img className='responsive-img' src={arr[x].url}></img>        
        <div>
          <h2>{arr[x].Model}</h2>
          <h2>{arr[x].Company}</h2>
          <h2>cost:{arr[x].price}</h2>
        </div>
      </div>
      
      <div className='elementContainer'>
        <div className='element'>
          <div className='sphere'>
          </div>
          <p>Engine: {arr[x].Engine}</p>
        </div>
        <div className='element'>
          <div className='sphere'>
          </div>
        <p>Mileage: {arr[x].Mileage}</p>
        </div>
        <div className='element'>
          <div className='sphere'>
          </div>
          <p>Transmission: {arr[x].Transmission}</p>
        </div>
        <div className='element'>
          <div className='sphere'>
          </div>
          <p>Seats: {arr[x].Seats}</p>
        </div>
      </div>
      <div id='btnc' style={{display:'flex',justifyContent:'space-evenly'}}>
      <a className='btn blue waves-effect waves-light'>
      <i class="material-icons left">call</i>
        Contact Dealer
        </a>
      <a href={window.location.origin} className='btn red waves-effect waves-light'>
      <i class="material-icons left">reply</i>
        Go back
      </a>
      </div>
    </div>
  );
}
