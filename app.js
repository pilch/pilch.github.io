var data = [10,-100,30,40];
var height = 300;
var width = 300;
var padding = 10;
var gap = 10;
var yScale = d3.scale.linear()
  .domain([d3.min(data,(d)=>d),d3.max(data,(d) => d)])
  .range([0,width-padding*2]);
var xScale = d3.scale.linear()
  .domain([0,data.length])
  .range([0,height-padding*2-gap]);
var barHeight = (height - padding*2)/data.length - gap;

var svg = d3.select("body")
.append("svg")
.attr("width",width)
.attr("height",height)
.style("border","1px solid gray")
.style("padding","10px");

var bars = svg.selectAll("rect")
  .data(data)
  .enter()
    .append("rect")
    .attr("height",barHeight)
    .attr("width",(d) => yScale(d))
    .attr("y",(d,i) => xScale(i));