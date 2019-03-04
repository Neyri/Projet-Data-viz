function build_distances_acti(daily_locations, color) {
  d3.select("#probas_actis_distance").remove()
  daily_activities = get_daily_activities(daily_locations);

  var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 30
  };
  var inner_width = d3.select("#div_distance_acti").node().getBoundingClientRect().width
  var width = inner_width - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var svg = d3.select("#div_distance_acti").append("svg")
    .attr("id", "probas_actis_distance")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var distances = {
    'TOTAL': 0,
    'STILL': 0,
    'UNKNOWN': 0,
    'WALKING': 0,
    'ON_BICYCLE': 0,
    'IN_ROAD_VEHICLE': 0,
    'RUNNING': 0,
    'IN_RAIL_VEHICLE': 0,
    'EXITING_VEHICLE': 0
  }
  for (var i = 0; i < (daily_locations.length - 1); i++) {
      lat1 = daily_locations[i].lat * Math.PI / 180
      lat2 = daily_locations[i + 1].lat * Math.PI / 180
      long1 = daily_locations[i].long * Math.PI / 180
      long2 = daily_locations[i + 1].long * Math.PI / 180
	  if (lat1 != lat2 || long1 != long2){
		  distance = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)) * 6371
		  distances[daily_locations[i].activity[0].type] = distances[daily_locations[i].activity[0].type] + distance
		  distances['TOTAL'] = distances['TOTAL'] + distance
	  }
  }
  console.log(distances);
  var offsety = 0;
  for (var activity in distances) {
    svg.append("rect")
      .attr("x", 180)
      .attr("y", offsety)
      .attr("width", Math.max((inner_width - 180)/distances['TOTAL'] * distances[activity], 2.5))
      .attr("height", 18)
      .style("fill", color(activity));
    svg.append("text")
      .attr("x", 5)
      .attr("y", offsety + 12)
      .style("text-anchor", "start")
      .style("font-size", "12px")
      .style("fill", color(activity))
      .text(activity + " - " + (Math.floor(distances[activity] * 100) / 100) + "km");

    offsety = offsety + 30;
  }
}