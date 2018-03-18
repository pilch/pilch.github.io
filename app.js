var stack = d3.stack();
var svg = d3.select('svg');
var g = svg.append("g").attr("transform", "translate(" + 0+ "," + 0 + ")");

d3.csv('widedata.csv',function(d,i,columns) {
    for (i=1; i < columns.length; i++) d[columns[i]] = +d[columns[i]];
    for (i=1,t=0; i < columns.length; i++) t += d[columns[i]];
    d.total = t;
    return d;
}, function(error,data) {
    if (error) throw error;
    
    console.log(data);
    
    var width = 800;
    var height = 600;
    var padding = 10;
    var barGap = 10;
    var barWidth = width/data.length-barGap;
    var y = d3.scaleLinear()
        .range([height,0])
        .domain([0,d3.max(data,(d) => d.total)]);
    var x = d3.scaleBand()
        .range([0,width])
        .domain(data.map(function(d) {
            return d.year;
        }))
    var z = d3.scaleOrdinal(d3.schemeCategory10);
    
    
    svg.attr('width',width)
        .attr('height',height);
    
    stack.keys(data.columns.slice(1));
    
    var series = stack(data);
    
    console.log(stack.keys(data.columns.slice(1))(data));
    
    g.selectAll(".serie")
        .data(stack.keys(data.columns.slice(1))(data))
        .enter().append("g")
        .attr("fill",(d) => z(d.key))
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter()
        .append("rect")
        .attr("height",(d) => y(d[0])-y(d[1]))
        .attr("width",barWidth)
        .attr("x",(d) => x(d.data.year))
        .attr("y",(d) => y(d[1]));

});
