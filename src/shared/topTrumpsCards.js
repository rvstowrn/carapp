// Shared trump-card dataset, used by both the React client (via `import`)
// and the Node socket server (via `require`) so the two never drift apart.
// Higher value wins for every category here.
module.exports = [
  { Company: 'Audi', Model: 'Sports-M50', Mileage: 32.11, Engine: 999, BHP: 75.0, Seats: 5 },
  { Company: 'BMW', Model: 'SFA-Classic', Mileage: 33.17, Engine: 996, BHP: 72.0, Seats: 5 },
  { Company: 'Ferrari', Model: 'm999', Mileage: 29.99, Engine: 930, BHP: 67.0, Seats: 5 },
  { Company: 'Ferrari', Model: 'DarkHorse', Mileage: 33.72, Engine: 920, BHP: 80.0, Seats: 5 },
  { Company: 'Chevrolet', Model: 'Bumble250', Mileage: 33.33, Engine: 930, BHP: 70.0, Seats: 5 },
  { Company: 'Honda', Model: 'm50x77', Mileage: 25.17, Engine: 999, BHP: 67.0, Seats: 5 },
  { Company: 'Maruti', Model: 'Vitara', Mileage: 23.33, Engine: 890, BHP: 66.0, Seats: 5 },
  { Company: 'Maruti', Model: 'Swift', Mileage: 29.03, Engine: 970, BHP: 68.0, Seats: 5 },
  { Company: 'Nissan', Model: 'Kicks', Mileage: 22.22, Engine: 800, BHP: 72.0, Seats: 5 },
  { Company: 'Tata', Model: 'Altroz', Mileage: 21.32, Engine: 890, BHP: 57.0, Seats: 5 },
  { Company: 'Maruti', Model: 'S-Presso', Mileage: 27.11, Engine: 960, BHP: 70.0, Seats: 7 },
  { Company: 'Hyundai', Model: 'i20', Mileage: 25.17, Engine: 999, BHP: 67.0, Seats: 5 },
  { Company: 'Maruti', Model: 'altok10', Mileage: 30.11, Engine: 907, BHP: 63.2, Seats: 5 },
  { Company: 'Datsun', Model: 'Redigo', Mileage: 22.15, Engine: 900, BHP: 61.0, Seats: 5 },
]

module.exports.CATEGORIES = ['Mileage', 'Engine', 'BHP', 'Seats']
