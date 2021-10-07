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
       console.log(response);
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
   // initialize the scrollama
   var scroller2 = scrollama();

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
   function handleStepEnter2(response) {
       // response = { element, direction, index }
       let value2 = response.element.attributes['data-step'].value

       // add color to current step2 only
       step2.classed("is-active", function(d, i) {
           return i === response.index;
       });

       if (value2 >= 2) {
           header.innerHTML = "Benefits For Gig Workers";
       } else {
           header.innerHTML = "Benefits For Standard ";
       }
      
       counter.innerHTML = response.progress;
       // update graphic based on step2
       figure2.select("#id").text(response.index + 1);
   }
   function handleStepProgress(response) {
    console.log(response.progress);
    d3.select(response.element)
      .select("p")
      .text(d3.format(".1%")(response.progress));
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
           .onStepEnter(handleStepEnter2)
           .onStepProgress(handleStepProgress);


       // setup resize event
       window.addEventListener("resize", handleResize2);
   }



   // kick things off
   init();


   /// Sticky Side