// functions related to the graphs concerning activity

function get_daily_activities(daily_locations){
	// return a list with good format to draw lines
	daily_activities = []
	for (var i = 0; i < daily_locations.length; i++) {
		for (var j = 0; j < daily_locations[i].activity.length; j++) {
			info = {}
			info['type'] = daily_locations[i].activity[j].type
			info['confidence'] = daily_locations[i].activity[j].confidence
			info['date'] = new Date(Number(daily_locations[i]['timestampMs']))
			daily_activities.push(info)
		}
	}
	return daily_activities
}

function build_proba_activities(daily_locations)
{	
	d3.select("#probas_actis").remove()
	daily_activities = get_daily_activities(daily_locations);
	
	var legend_width = 200;
	var margin = {top: 20, right: 20, bottom: 20, left: 30};
	var width = 1000 - margin.left - margin.right - legend_width,
    height = 400 - margin.top - margin.bottom;
	
	var svg = d3.select("body").append("svg")
		.attr("id", "probas_actis")
		.attr("width", width + margin.left + margin.right + legend_width)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var y = d3.scaleLinear()
		.range([height, 0])
		.domain([0, 100]);
	
	var yAxis = d3.axisLeft()
    	.scale(y);
		
	var parseTime  = d3.timeFormat("%H %M")
	
	var t = d3.scaleTime()
		.range([0, width]);

    t.domain(d3.extent(daily_activities, function(d) {
      return d.date;
    }));
	
	var xAxis = d3.axisBottom()
    	.scale(t);
	
	var color = d3.scaleOrdinal(d3.schemeCategory20);
	
	var symbols = d3.nest()
        .key(function(d) { return d.type; })
        .entries(daily_activities);

    symbols.forEach(function(s) {
      s.values.forEach(function(d) { 
        d.date = d.date; 
        d.confidence = +d.confidence; 
      });
    });
	
    var line = d3.line()
		.curve(d3.curveBasis)
		.x(function(d) { return t(d.date); })
		.y(function(d) { return y(d.confidence); });

    svg.selectAll(".line").data(symbols).enter()
      .append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })  
      .attr("stroke", function(d, i) { return color(d.key); })
      .attr("fill", "none");
    
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('class', 'x axis')
      .call(xAxis);

    svg.append('g')
      .attr('transform', 'translate(0,' + 0 + ')')
      .attr('class', 'y axis')
      .call(yAxis);
	
	var legend = svg.selectAll(".legend")
    .data(color.domain())
  .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(" + width + "," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", 30)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", 50)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
	  .style("fill", "#e6eeff")
      .text(function(d) { return d; });

}