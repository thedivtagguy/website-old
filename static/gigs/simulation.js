

// This function returns an object containing the long distances travelled as well as the short distances travelled
const GetTotallyRealTotalTrips = (x, distancesOptions = {
  maxLongDistancesWhenDay: 10,
  minLongDistancesWhenDay: 6,
  maxShortDistancesWhenDay: 13,
  minShortDistancesWhenDay: 8,
  maxLongDistancesWhenNight: 7,
  minLongDistancesWhenNight: 4,
  maxShortDistancesWhenNight: 14,
  minShortDistancesWhenNight: 10,
  longDistanceTime: 35,
  shortDistanceTime: 15,
}) => {
let long = [7, 8, 9, 10, 11, 12, 13]
let short = [2, 3, 4, 5, 6, 7]
let perKm = 6

// Format to Time
function time_convert(num) {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  return hours + " hours, " + minutes + " minutes";
}
  // Total Short Distances
  let shortDistances = 0;
  // Total Long Distances
  let longDistances = 0;
  // Total Time Taken
  let time = 0;
  // Will You have Long Trips Today? Boolean Value
  let isLong = 0;
  // Hours Placeholder
  let hours = "";
  // Placeholder for storing the randomly chosen long distance.
  let lDist = 0;
  // Placeholder for storing the randomly chosen short distance.
  let sDist = 0;
  // Chart Data
  let data = [{}];
  let data2 = [{}];
  // Placeholder for storing time.
  let t = 0;
  // Total Pay for Short Distance Deliveries
  let shortPay = 0;
  // Total Pay for Long Distance Deliveries
  let longPay = 0;
  // Storing Incentives
  let incentives = 0


  // Loop through the number of days entered by the uers
  for (let i = 0; i < x; i++) {
    t = 0;
    // Decide whether more long trips or short trips will be taken today. 
    isLong = Math.random() > 0.5;
    if (isLong) {
      // Store the randomly chosen long distance.
      lDist = Math.ceil(Math.random() * (distancesOptions.maxLongDistancesWhenDay - distancesOptions.minLongDistancesWhenDay)) + distancesOptions.minLongDistancesWhenDay;
      longDistances = longDistances + lDist;
      // Store the randomly chosen short distance.
      sDist = Math.ceil(Math.random() * (distancesOptions.maxShortDistancesWhenDay - distancesOptions.minShortDistancesWhenDay)) + distancesOptions.minShortDistancesWhenDay;
      shortDistances = shortDistances + sDist;
      t = lDist * distancesOptions.longDistanceTime + sDist * distancesOptions.longDistanceTime;
    } else {

      lDist = Math.ceil(Math.random() * (distancesOptions.maxLongDistancesWhenNight - distancesOptions.minLongDistancesWhenNight)) + distancesOptions.minLongDistancesWhenNight;
      longDistances = longDistances + lDist;
      sDist = Math.ceil(Math.random() * (distancesOptions.maxShortDistancesWhenNight - distancesOptions.minShortDistancesWhenNight)) + distancesOptions.minShortDistancesWhenNight;

      shortDistances = shortDistances + sDist;
      // Calculate time taken today.
      t = lDist * distancesOptions.longDistanceTime + sDist * distancesOptions.longDistanceTime;
    }
    // Build the data array for the chart.
    data[i] = {
      day: i + 1,
      deliveries: lDist + sDist
    }
  }
  // Total Time for All Days
  time = time + longDistances * distancesOptions.longDistanceTime + shortDistances * distancesOptions.longDistanceTime;
  hours = time_convert(time);
  // Transform Data to What Google Charts Needs

  for (let i = 0; i <= shortDistances; i++) {
    shortPay = shortPay + perKm * short[Math.floor(Math.random() * short.length)];
    data2[i] = {
      shortPay: shortPay
    }
  }

  for (let i = 0; i <= longDistances; i++) {
    longPay = longPay + perKm * long[Math.floor(Math.random() * long.length)];
    
  }
  let total = longPay + shortPay;
  if (total > 600) {
    incentives = 230;
  }
  const keys = Object.keys(data[0]);
  const perDay = [keys, ...data.map(obj => keys.map(key => obj[key]))];

  let earnings = {
    shortTripsPay: shortPay,
    longTripsPay: longPay,
    totalPay: shortPay + longPay + incentives,
    longTrips: longDistances,
    shortTrips: shortDistances,
    isLong,
    perDay,
    workingHours: hours,
  };
  return earnings;

}

function calcTrips(x){
    let trips = GetTotallyRealTotalTrips(x)
    console.log(trips);
    return trips;
}
