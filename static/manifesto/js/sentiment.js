(function modi(){

d3.select("#language").selectAll("svg1").remove();

var margin = {top: 10, right: 0, bottom: 0, left: 0},
width = 400 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var svg = d3.select("#sentiment1").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
var x = d3.scaleLinear()
  .range([0,width]);

var y = d3.scaleBand()
  .rangeRound([height,0])
  .padding(0.2);

d3.csv("https://raw.githubusercontent.com/thedivtagguy/files/main/sent_modi.csv",types,function(error,fullData){
console.log('FULLDATA: ', fullData);

if (error) throw error;

const sortedData = fullData.sort(function(a,b){
  return b.value - a.value;
}).map((d, i) => ({...d, id: i}));

d3.select("#controls").selectAll("button").on("click", function(){
  console.log('C: ', this.id)
  draw(this.id);
});

draw("cnnnews18");

function draw(myRegion){

  const data = sortedData.filter(function(d){ return d.channel== myRegion; 
})
 console.log('DATA: ', data);


x.domain(d3.extent(data, function(d){ return d.value; }));
y.domain(data.map(function(d) { return d.word3; }));


const bars = svg.selectAll(".bar")
    .data(data, d => d.id)
  bars.enter()
.append("rect")
    .attr("class", "bar")
    .attr("x", function(d){ return d.value < 0 ? x(d.value) : x(0); })
      .attr("width", function(d){ return d.value < 0 ? x(d.value * -1) - x(0) : x(d.value) - x(0); })
    .attr("y", function(d){ return y(d.word3); })
      .attr("height", y.bandwidth())
      .attr("fill", function(d){ return d.value < 0 ? "#d7191c": "#1a9641"; });

const values = svg.selectAll(".value")
 .data(data, d => d.id);

values.enter().append("text")
   .attr("class", "value")
   .attr("x", function(d){
    if (d.value < 0){
        return (x(d.value * -1) - x(0)) > 20 ? x(d.value) + 2 : x(d.value) - 1;
        } else {
        return (x(d.value) - x(0)) > 20 ? x(d.value) - 2 : x(d.value) + 1;
          }
   })
   .attr("y", function(d){ return y(d.word3); })
   .attr("dy", y.bandwidth() - 2.55)
   .attr("font-family", "cocogoose")
   .attr("font-size", "13px")
   .attr("text-anchor", function(d){
                    if (d.value < 0){
                        return (x(d.value * -1) - x(0)) > 20 ? "start" : "end";
                    } else {
                        return (x(d.value) - x(0)) > 20 ? "end" : "start";
                    }
                })
   .style("fill", function(d){
                    if (d.value < 0){
                        return (x(d.value * -1) - x(0)) > 20 ? "#fff" : "#3a403d";
                    } else {
                        return (x(d.value) - x(0)) > 20 ? "#fff" : "#3a403d";
                    }
                })
   .text(function(d){ return d.value; });
values.exit().remove();

      const names = svg.selectAll(".name")
        .data(data, d => d.id)
  
      names.enter().append("text")
        .attr("class", "name")
        .attr("x", function(d){ return d.value < 0 ? x(0) + 2.55 : x(0) - 2.55 })
        .attr("y", function(d){ return y(d.word3); })
        .attr("dy", y.bandwidth() - 2.55)
        .attr("font-family", "cocogoose")
        .attr("font-size", "14px")
        .attr("text-anchor", function(d){ return d.value < 0 ? "start" : "end"; })
        .text(function(d){ return d.word3; });
  names.exit().remove();

      svg.selectAll('.zero-line').remove();
      svg.append("line")
  .classed('zero-line', true)
        .attr("x1", x(0))
        .attr("x2", x(0))
        .attr("y1", 0 + margin.top)
        .attr("y2", height - margin.top)
        .attr("stroke", "#3a403d")
        .attr("stroke-width", "1px");

bars.exit()
/*
.transition()
.duration(1000)
.attr("width", 0)
*/
.remove();


}
});

function types(d){
        d.value = +d.value;
        return d;
}

}())


(function rahul(){

    d3.select("#language").selectAll("svg1").remove();
    
    var margin = {top: 10, right: 0, bottom: 0, left: 0},
    width = 400 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    var svg = d3.select("#sentiment2").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
    var x = d3.scaleLinear()
      .range([0,width]);
    
    var y = d3.scaleBand()
      .rangeRound([height,0])
      .padding(0.2);
    
    d3.csv("https://raw.githubusercontent.com/thedivtagguy/files/main/sent_rahul.csv",types,function(error,fullData){
    console.log('FULLDATA: ', fullData);
    
    if (error) throw error;
    
    const sortedData = fullData.sort(function(a,b){
      return b.value - a.value;
    }).map((d, i) => ({...d, id: i}));
    
    d3.select("#controls2").selectAll("input").on("click", function(){
      console.log('C2: ', d3.select(this).attr('class'))
      draw(d3.select(this).attr('class'));
    });
    
    draw("cnnnews18");
    
    function draw(myRegion){
    
      const data = sortedData.filter(function(d){ return d.channel== myRegion; 
    })
     console.log('DATA: ', data);
    
    
    x.domain(d3.extent(data, function(d){ return d.value; }));
    y.domain(data.map(function(d) { return d.word3; }));
    
    
    const bars = svg.selectAll(".bar")
        .data(data, d => d.id)
      bars.enter()
    .append("rect")
        .attr("class", "bar")
        .attr("x", function(d){ return d.value < 0 ? x(d.value) : x(0); })
          .attr("width", function(d){ return d.value < 0 ? x(d.value * -1) - x(0) : x(d.value) - x(0); })
        .attr("y", function(d){ return y(d.word3); })
          .attr("height", y.bandwidth())
          .attr("fill", function(d){ return d.value < 0 ? "#d7191c": "#1a9641"; });
    
    const values = svg.selectAll(".value")
     .data(data, d => d.id);
    
    values.enter().append("text")
       .attr("class", "value")
       .attr("x", function(d){
        if (d.value < 0){
            return (x(d.value * -1) - x(0)) > 20 ? x(d.value) + 2 : x(d.value) - 1;
            } else {
            return (x(d.value) - x(0)) > 20 ? x(d.value) - 2 : x(d.value) + 1;
              }
       })
       .attr("y", function(d){ return y(d.word3); })
       .attr("dy", y.bandwidth() - 3.55)
       .attr("font-family", "cocogoose")
       .attr("font-size", "13px")
       .attr("text-anchor", function(d){
                        if (d.value < 0){
                            return (x(d.value * -1) - x(0)) > 20 ? "start" : "end";
                        } else {
                            return (x(d.value) - x(0)) > 20 ? "end" : "start";
                        }
                    })
       .style("fill", function(d){
                        if (d.value < 0){
                            return (x(d.value * -1) - x(0)) > 20 ? "#fff" : "#3a403d";
                        } else {
                            return (x(d.value) - x(0)) > 20 ? "#fff" : "#3a403d";
                        }
                    })
       .text(function(d){ return d.value; });
    values.exit().remove();
    
          const names = svg.selectAll(".name")
            .data(data, d => d.id)
      
          names.enter().append("text")
            .attr("class", "name")
            .attr("x", function(d){ return d.value < 0 ? x(0) + 2.55 : x(0) - 2.55 })
            .attr("y", function(d){ return y(d.word3); })
            .attr("dy", y.bandwidth() - 2.55)
            .attr("font-family", "cocogoose")
            .attr("font-size", "14px")
            .attr("text-anchor", function(d){ return d.value < 0 ? "start" : "end"; })
            .text(function(d){ return d.word3; });
      names.exit().remove();
    
          svg.selectAll('.zero-line').remove();
          svg.append("line")
      .classed('zero-line', true)
            .attr("x1", x(0))
            .attr("x2", x(0))
            .attr("y1", 0 + margin.top)
            .attr("y2", height - margin.top)
            .attr("stroke", "#3a403d")
            .attr("stroke-width", "1px");
    
    bars.exit()
    /*
    .transition()
    .duration(1000)
    .attr("width", 0)
    */
    .remove();
    
    
    }
    });
    
    function types(d){
            d.value = +d.value;
            return d;
    }
    
    }())
    
