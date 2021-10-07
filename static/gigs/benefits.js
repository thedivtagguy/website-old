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
       } else {
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
   var main2 = d3.select("#game");
   var scrolly2 = main2.select("#scrolly2");
   var figure2 = scrolly2.select("#charts");
   var side = scrolly2.select("#side-text");
   var step2 = side.selectAll(".step2");
   var header = document.getElementById('heading-text');
   var counter = document.getElementById('counter');
   var deliveries = document.getElementById('trips');
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
      console.log("enter", response);
      // add to color to current step
     
      response.element.classList.add("is-active");
      
    }

    function handleStepExit3(response) {
      // response = { element, direction, index }
      console.log("exit", response);
      // remove color from current step
      response.element.classList.remove("is-active");
    }

    function handleStepProgress3(response) {
      console.log(response.progress);
      var money = response.progress;
      calculateEarnings(money);
    }

    function calculateEarnings(money) {
      // If money is greater than 20 and less than 50, output hello
      console.log(money); 
      if(money >= 1 && money <= 0) {
        counter.innerHTML = "No Earnings Yet";
        deliveries.innerHTML = "No Deliveries Yet";
      } else {
        counter.innerHTML = "Rs." + money;
        deliveries.innerHTML = "0";
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
       console.log(value);
       if(value == 2) {
       button = document.getElementById("starter");
       console.log(button);
       button.classList.remove("disappear");
       button.classList.add("appear");
       }
       if (value2 >= 2) {
           header.innerHTML = "Benefits For Gig Workers";
       } else {
           header.innerHTML = "Benefits For Standard ";
       }
      
       counter.innerHTML = response.progress;
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
               debug: true
           })
           .onStepEnter(handleStepEnter2);
      
      scroller3
           .setup({
                step: "#start",
                debug: true,
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



   // This function returns an object containing the long distances travelled as well as the short distances travelled
const GetTotallyRealTotalTrips = (distancesOptions = {
  maxLongDistancesWhenDay: 9,
  minLongDistancesWhenDay: 6,
  maxShortDistancesWhenDay: 14,
  minShortDistancesWhenDay: 8,
  maxLongDistancesWhenNight: 7,
  minLongDistancesWhenNight: 4,
  maxShortDistancesWhenNight: 14,
  minShortDistancesWhenNight: 10,
}) => {
  let shortDistances = 0;
  let longDistances = 0;
  const isDay = Math.random() > 0.5;

  if (isDay) {
    // return a lot of trips, it's daytime
    longDistances = Math.ceil(Math.random() * (distancesOptions.maxLongDistancesWhenDay - distancesOptions.minLongDistancesWhenDay)) + distancesOptions.minLongDistancesWhenDay;
    shortDistances = Math.ceil(Math.random() * (distancesOptions.maxShortDistancesWhenDay - distancesOptions.minShortDistancesWhenDay)) + distancesOptions.minShortDistancesWhenDay;
  } else {
    // too late, return a few trips
    longDistances = Math.ceil(Math.random() * (distancesOptions.maxLongDistancesWhenNight - distancesOptions.minLongDistancesWhenNight)) + distancesOptions.minLongDistancesWhenNight;
    shortDistances = Math.ceil(Math.random() * (distancesOptions.maxShortDistancesWhenNight - distancesOptions.minShortDistancesWhenNight)) + distancesOptions.minShortDistancesWhenNight;
  }

  return {
    shortDistances,
    longDistances,
    isDay,
  };
}
 
let trips = 0;
// if you want to actually configure this function, you'd do something like
// GetTotallyRealTotalTrips({ maxLongDistancesWhenNight 7, maxShortDistancesWhenDay: 23 })
// which will override the default settings
function getTrips() {
  button = document.getElementById("starter");
  trips = GetTotallyRealTotalTrips();
  console.log(trips);
  let start = document.getElementById("start");
  start.classList.remove("hidden");
  button.classList.add("disappear");
}
// When page loads, run GetTotallyRealTotalTrips()

function redo() {
  button = document.getElementById("starter");
  button.classList.remove("disappear");
  button.classList.add("appear");
}
