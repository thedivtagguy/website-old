   // using d3 for convenience
   var main = d3.select("main");
   var scrolly = main.select("#scrolly");
   var figure = scrolly.select("#story");
   var article = scrolly.select("article");
   var step = article.selectAll(".step1");
   var grid = figure.select("#storyGrid")
   // initialize the scrollama
   var scroller = scrollama();

   // generic window resize listener event
   function handleResize() {
     // 1. update height of step elements
     var stepH = Math.floor(window.innerHeight * 0.40);
     step.style("height", stepH + "px");
     var figureHeight = window.innerHeight / 2;
     var figureMarginTop = (window.innerHeight - figureHeight) / 50;

     figure
       .style("top", figureMarginTop + "px");

     // 3. tell scrollama to update new element dimensions
     scroller.resize();
   }
  
  // select all classes called "non" and add the class "non-benefits" to them
     
   // scrollama event handlers
   function handleStepEnter(response) {
     let value = response.element.attributes['data-step'].value

     console.log(value);
      if(value >= 2){
         var nons =  document.querySelectorAll('.non');
         [...nons].forEach(n => n.classList.add('no-benefits'));
    } else {
     var nons =  document.querySelectorAll('.non');
     [...nons].forEach(n => n.classList.remove('no-benefits'));
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
         offset: 0.65,
         debug: true
       })
       .onStepEnter(handleStepEnter);

     // setup resize event
     window.addEventListener("resize", handleResize);
   }

   // kick things off
   init();