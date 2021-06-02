///////////////////////////////////////////////////// Tweet count Chart //////////////////////////////////////////////////////////////
(function tweetcount(){
 
d3.select("#D3line").selectAll("svg1").remove();

   // set the dimensions and margins of the graph
   var margin = {top: 50, right: 60, bottom: 150, left: 120},
       width = 460 - margin.left - margin.right,
       height = 450 - margin.top - margin.bottom;
   
   // append the svg1 object to the body of the page
   var svg1 = d3.select("#chart1")
     .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
     .append("g")
       .attr("transform",
             "translate(" + margin.left + "," + margin.top + ")");
   
   // Parse the Data
   d3.csv("https://raw.githubusercontent.com/thedivtagguy/files/main/tweets.csv", function(data) {
   
   // X axis
   var x = d3.scaleBand()
     .range([ 0, width ])
     .domain(data.map(function(d) { return d.Country; }))
     .padding(0.2);
   svg1.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x))
     .selectAll("text")
       .attr("fill", "#A6ACC9")
       .attr("font-style", "cocogoose")
       .attr("font-size", "15px")
       .attr("transform", "translate(-10,0)rotate(-45)")
       .style("text-anchor", "end");
   
   // Add Y axis
   var y = d3.scaleLinear()
     .domain([0, 220000])
     .range([ height, 0]);
   svg1.append("g")
     .call(d3.axisLeft(y))
     .selectAll("text")
       .attr("fill", "#A6ACC9")
       .attr("font-style", "cocogoose")
       .attr("font-size", "15px");

       svg1.append("text")
       .attr("x", (width / 2))             
       .attr("y", 0 - ((margin.top +10) / 2))
       .attr("text-anchor", "middle")  
       .style("font-size", "12px") 
       .style("fill", "#A6ACC9")
       .style("font-family", "cocogoose")
       .text("# of Tweets between Dec 2019 and Nov 2020");

       svg1.append("text")
       .attr("x", (width / 2))             
       .attr("y", 360)
       .attr("text-anchor", "middle")  
       .style("font-size", "9px") 
       .style("fill", "#A6ACC9")
       .style("font-family", "cocogoose")
       .text("Hover for details");

     // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
  var tooltip = d3.select("#chart1")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "#A6ACC9")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("margin", "auto")
  .style("width", "50%")
  .style("font-family", "cocogoose")
  .style("font-size", "13px")
  .style("text-align", "center")

    // A function that change this tooltip when the user hover a point.
  // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
  var mouseover = function(d) {
   tooltip
     .style("opacity", 1)
 }

 var mousemove = function(d) {
   tooltip
     .html("Number of Tweets: " + d.Value)
     .style("left", (d3.mouse(this)[0]) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
     .style("top", (d3.mouse(this)[1]) + "px")
 }

 // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
 var mouseleave = function(d) {
   tooltip
     .style("opacity", 0);
 }


   // Bars
   svg1.selectAll("mybar")
     .data(data)
     .enter()
     .append("rect")
       .attr("x", function(d) { return x(d.Country); })
       .attr("width", x.bandwidth())
       .attr("fill", "#A6ACC9")
       // no bar at the beginning thus:
       .attr("height", function(d) { return height - y(0); }) // always equal to 0
       .attr("y", function(d) { return y(0); })
       .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )
   
   // Animation
   svg1.selectAll("rect")
     .transition()
     .duration(3000)
     .attr("y", function(d) { return y(d.Value); })
     .attr("height", function(d) { return height - y(d.Value); })
     .delay(function(d,i){console.log(i) ; return(i*100)})
   
   })
   ///////////////////////////////////////////////////// END Tweet count Chart //////////////////////////////////////////////////////////////
}())

   ///////////////////////////////////////////////////// BEGIN Tweet Hashtags Chart //////////////////////////////////////////////////////////////


// create 3 data_set
var republic = [
  { group: "IndiaWithArnab", value: 52 },
  { group: "RepublicFightsBack", value: 46 },
  { group: "CBIForSSR", value: 42 },
  { group: "KanganaSpeaksToArnab", value: 12 },
  { group: "BharatForKangana", value: 11 },
  { group: "SoniaGoonsAttackArnab", value: 11 },
  { group: "ReportForSSR", value: 10 },
  { group: "RepublicExposesParamBir", value: 10 }
];

var ndtv = [
  { group: "BTSOnNDTV", value: 18 },
  { group: "coronavirus", value: 11 },
  { group: "BTS", value: 9 },
  { group: "ProtestAgainstExamslnCOVID", value: 9 },
  { group: "RavishKumar", value: 9 },
  { group: "CoronavirusLockdown", value: 6 },
  { group: "Hathras", value: 6 },
  { group: "KanganaRanaut", value: 6 }
];

var cnn = [
  { group: "NewsAlert", value: 5 },
  { group: "CaughtOnCam", value: 5 },
  { group: "IndiaFightsCOVID19", value: 2 },
  { group: "RajasthanPoliticalCrisis", value: 2 },
  { group: "WATCH", value: 1 }
];

// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 150, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - (margin.bottom/5);

// append the svg object to the body of the page
var svg = d3
  .select("#hashtags")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand().range([0, width]).padding(0.2);
var xAxis = svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class", "myXaxis");

// Initialize the Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = svg.append("g").attr("class", "myYaxis");

// A function that create / update the plot for a given variable:
function update(data) {
  // Update the X axis
  x.domain(
    data.map(function (d) {
      return d.group;
    })
  );
  xAxis
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("fill", "#A6ACC9")
    .attr("font-style", "cocogoose")
    .attr("font-size", "12px")
    .attr("transform", "rotate(-45) translate(-65,2)");

  // Update the Y axis
  y.domain([
    0,
    d3.max(data, function (d) {
      return d.value;
    })
  ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // Create the u variable
  var u = svg.selectAll("rect").data(data);

  u.enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
    .attr("x", function (d) {
      return x(d.group);
    })
    .attr("y", function (d) {
      return y(d.value);
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
      return height - y(d.value);
    })
    .attr("fill", "#A6ACC9");

  // If less group in the new dataset, I delete the ones not in use anymore
  u.exit().remove();
}

// Initialize the plot with the first dataset
update(republic);


   ///////////////////////////////////////////////////// BEGIN Tweet Hashtags Chart //////////////////////////////////////////////////////////////
