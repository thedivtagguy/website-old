

   // set the dimensions and margins of the graph
   var margin = {top: 50, right: 60, bottom: 90, left: 120},
       width = 460 - margin.left - margin.right,
       height = 450 - margin.top - margin.bottom;
   
   // append the svg object to the body of the page
   var svg = d3.select("#my_dataviz")
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
   svg.append("g")
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
   svg.append("g")
     .call(d3.axisLeft(y))
     .selectAll("text")
       .attr("fill", "#A6ACC9")
       .attr("font-style", "cocogoose")
       .attr("font-size", "15px");

     // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
  var tooltip = d3.select("#my_dataviz")
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
     .transition()
     .duration(50)
     .style("opacity", 0)
 }


   // Bars
   svg.selectAll("mybar")
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
   svg.selectAll("rect")
     .transition()
     .duration(800)
     .attr("y", function(d) { return y(d.Value); })
     .attr("height", function(d) { return height - y(d.Value); })
     .delay(function(d,i){console.log(i) ; return(i*100)})
   
   })