var tripInfo;
let earning = 0;
let shouldProgress;
let resetButton = document.getElementById("reset");
let gif = document.getElementById("gif");
let time1 = 0;

let farPlaces = []
let nearPlaces = []


function time_convert(num) {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  return hours + " hours, " + minutes + " minutes";
}
// This function returns an object containing the long distances travelled as well as the short distances travelled
const GetTotallyRealTotalTrips = (x, distancesOptions = {
  maxLongDistancesWhenDay: 6,
  minLongDistancesWhenDay: 6,
  maxShortDistancesWhenDay: 8,
  minShortDistancesWhenDay: 9,
  maxLongDistancesWhenNight: 7,
  minLongDistancesWhenNight: 2,
  maxShortDistancesWhenNight: 7,
  minShortDistancesWhenNight: 6,
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
  let time = 0;
  let shortDistances = 0;
  // Total Long Distances
  let longDistances = 0;
  // Total Time Taken
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
  time1 = time1 + time;
  console.log(time);
  hours = time_convert(time);
  // Transform Data to What Google Charts Needs

  for (let i = 0; i <= shortDistances; i++) {
    near = short[Math.floor(Math.random() * short.length)];
    nearPlaces.push(near);
    shortPay = shortPay + perKm * near;
   
  }

  for (let i = 0; i <= longDistances; i++) {
    far = long[Math.floor(Math.random() * long.length)];
    farPlaces.push(far);
    longPay = longPay + perKm * far;
    
  }
  let total = longPay + shortPay;
  if (total > 600) {
    incentives = 230;
  }
  const keys = Object.keys(data[0]);
  const perDay = [keys, ...data.map(obj => keys.map(key => obj[key]))];
  let sum = 0;
  sum = nearPlaces.concat(farPlaces);
  sum = sum.reduce((a, b) => a + b, 0);

  let earnings = {
    shortTripsPay: shortPay,
    longTripsPay: longPay,
    totalPay: shortPay + longPay + incentives,
    longTrips: longDistances,
    shortTrips: shortDistances,
    isLong,
    time,
    time1,
    hours,
    sum,
    perDay,
    workingHours: hours,
  };
  // console.log(earnings);
  return earnings;

}

function calcTrips(x){
    let trips = GetTotallyRealTotalTrips(x)
    // console.log(trips);
    return trips;
    
}
////////////////////////////////


let start = document.getElementById("start");
let button = document.getElementById("starter");
let earnings = document.getElementById("totalEarning");
let distance = document.getElementById("distance");
let fuelcost = document.getElementById("fuelcost");
let timertext = document.getElementById("timer-text");
let numberOfHours = document.getElementById("hours");
let i = 0;
let days = document.getElementById("days"); 
// if you want to actually configure this function, you'd do something like
// GetTotallyRealTotalTrips({ maxLongDistancesWhenNight 7, maxShortDistancesWhenDay: 23 })
// which will override the default settings
function getTrips() {
  i = i + 1;
  tripInfo =  calcTrips(1);
  button.classList.add("disappear");
  button.classList.remove("appear");
  timertext.classList.add("disappear");
  // Redo Button 
  ///wait for 05 seconds
  gif.classList.remove('hidden');
  gif.classList.add('appear');
  buttonCount = buttonCount + 1;
  earning = tripInfo.totalPay + earning;
  // console.log(earning);
  earnings.innerText = "₹ " + earning;
  distance.innerText = tripInfo.sum + " kms";
  fuelcost.innerText = "₹" + roundedToFixed(((tripInfo.sum/39)*101),0);
  numberOfHours.innerText = time_convert(tripInfo.time1);
  days.innerText = i;
}
// When page loads, run GetTotallyRealTotalTrips()

function redo() {
  button.classList.remove("disappear");
  button.classList.add("appear");
  gif.classList.remove('appear');
  gif.classList.add('hidden');
}

// Function to restart sim
function resetTrips() {
  if(buttonCount != 0) {
    redo();
    buttonCount = buttonCount -1;
  }
      

}
/////////////////////////////////////////////////////
    ////////    ////////    ////////    ////////    //
    /// Overlay Section ////    ////////    ////////    //
    ////////    ////////    ////////    ////////    //
    /////////////////////////////////////////////////////

   // using d3 for convenience
   var main = d3.select("main");
   var scrolly = main.select("#scrolly");
   var figure = scrolly.select("#story");
   var article = scrolly.select("article");
   var step = article.selectAll(".step1");
   var grid = figure.select("#storyGrid")
   var head = document.getElementById('benefitshead');
   var month = document.getElementById('month');
   // initialize the scrollama
   var scroller = scrollama();
   // generic window resize listener event
   function handleResize() {
       // 1. update height of step elements
       var figureHeight = window.innerHeight / 2;
       var figureMarginTop = (window.innerHeight - figureHeight) / 10;

       figure
           .style("top", figureMarginTop + "px");

       // 3. tell scrollama to update new element dimensions
       scroller.resize();
   }

   // select all classes called "non" and add the class "non-benefits" to them

   // scrollama event handlers
   function handleStepEnter(response) {
       let value = response.element.attributes['data-step'].value

       if (value >= 2) {
           var nons = document.querySelectorAll('.non');
           [...nons].forEach(n => n.classList.add('no-benefits'));
           head.innerHTML = "Benefits For Gig Workers";
       }  else {
           var nons = document.querySelectorAll('.non');
           [...nons].forEach(n => n.classList.remove('no-benefits'));
           head.innerHTML = "Benefits For Standard Workers";
       }
       // response = { element, direction, index }
       // add color to current step only
       step.classed("is-active", function(d, i) {
           return i === response.index;


       });



   }

   function setupStickyfill() {
       d3.selectAll(".sticky").each(function() {
           Stickyfill.add(this);
       });
   }


   /////////////////////////////////////////////////////
   /// END OVERLAY SECTION ////
  /////////////////////////////////////////////////////




   /////////////////////////////////////////////////////
   ////////////////////////////////////////////////////
   /// SIDE STICKY
   ////////////////////////////////////////////////////
   ////////////////////////////////////////////////////


   // using d3 for convenience
   var buttonCount = 0;
   var main2 = d3.select("#game");
   var scrolly2 = main2.select("#scrolly2");
   var figure2 = scrolly2.select("#charts");
   var side = scrolly2.select("#side-text");
   var step2 = side.selectAll(".step2");
   var header = document.getElementById('heading-text');
   var counter = document.getElementById('counter');
   var deliveries = document.getElementById('trips');
   var timer = document.getElementById('timer');
   // initialize the scrollama
   var scroller2 = scrollama();
   var scroller3 = scrollama();
   // generic window resize listener event
   function handleResize2() {
       // 1. update height of step2 elements
       var step2H = Math.floor(window.innerHeight * 0.75);
       step2.style("height", step2H + "px");

       var figure2Height = window.innerHeight / 2;
       var figure2MarginTop = (window.innerHeight - figure2Height) / 15;

       figure2
           .style("top", figure2MarginTop + "px");

       // 3. tell scrollama to update new element dimensions
       scroller2.resize();
   }

     // scrollama event handlers
     function handleStepEnter3(response) {
      // response = { element, direction, index }
      // console.log("enter", response);
      // add to color to current step
     
      response.element.classList.add("is-active");
      
    }

    function handleStepExit3(response) {
      // response = { element, direction, index }
      // console.log("exit", response);
      // remove color from current step
      response.element.classList.remove("is-active");
    }

    function handleStepProgress3(response) {
      // console.log(response);
      counter.innerText = "₹ " + roundedToFixed(response.progress*tripInfo.totalPay, 1);
      deliveries.innerText = roundedToFixed(response.progress*(tripInfo.longTrips + tripInfo.shortTrips), 0) + " deliveries";
      timer.innerText = time_convert(roundedToFixed(response.progress*tripInfo.time, 0));

      if(response.progress >= 0.8){
        resetButton.classList.remove("disappear");
      }else{
        resetButton.classList.add("disappear");
      }
    }


   // scrollama event handlers
   function handleStepEnter2(response) {
       // response = { element, direction, index }
       let value2 = response.element.attributes['data-step'].value

       // add color to current step2 only
       step2.classed("is-active", function(d, i) {
           return i === response.index;
       });
       let value = response.element.attributes['data-step'].value
       if(value == 2) {
       button = document.getElementById("starter");
       if(buttonCount == 0) {
       button.classList.remove("disappear");
       document.getElementById("timer-text").classList.remove("disappear");
       document.getElementById("timer-text").classList.remove("appear");
     
            document.getElementById("trips").classList.remove("disappear");
       document.getElementById("counter").classList.remove("disappear");
       buttonCount++;
       button.classList.add("appear");
       }}
      
 if(value == 10){
    totalE.classList.remove("disappear");
 }



       // update graphic based on step2
       figure2.select("#id").text(response.index + 1);
   }
   
   function setupStickyfill() {
       d3.selectAll(".sticky").each(function() {
           Stickyfill.add(this);
       });
   }

   
////////////////////////////////////////////////////
//// END SIDE STICKY ////
////////////////////////////////////////////////////


   function init() {
       setupStickyfill();

       // 1. force a resize on load to ensure proper dimensions are sent to scrollama
       handleResize();

       // 2. setup the scroller passing options
       // 		this will also initialize trigger observations
       // 3. bind scrollama event handlers (this can be chained like below)
       scroller
           .setup({
               step: "#scrolly article .step1",
               offset: 0.50,
               debug: false
           })
           .onStepEnter(handleStepEnter);

       // setup resize event
       window.addEventListener("resize", handleResize);

       // 1. force a resize on load to ensure proper dimensions are sent to scrollama
       handleResize2();

       // 2. setup the scroller2 passing options
       // 		this will also initialize trigger observations
       // 3. bind scrollama event handlers (this can be chained like below)
       scroller2
           .setup({
               step: "#scrolly2 #side-text .step2",
               offset: 0.33,
               debug: false
           })
           .onStepEnter(handleStepEnter2);
      
      scroller3
           .setup({
                step: "#start",
                debug: false,
                progress: true,
                offset: 0.90,
           })
           .onStepEnter(handleStepEnter3)
           .onStepExit(handleStepExit3)
           .onStepProgress(handleStepProgress3);

       // setup resize event
       window.addEventListener("resize", handleResize2);
   }



   // kick things off
   init();


   /// Sticky Side


   ////////////////////////////////////////////////
   
   function roundedToFixed(input, digits){
    var rounded = Math.pow(10, digits);
    return (Math.round(input * rounded) / rounded).toFixed(digits);
  }

  