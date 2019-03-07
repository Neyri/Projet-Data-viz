function build_barchart(data_to_use) {
  d3.select("#distance_temps").remove()
  daily_activities = get_daily_activities(daily_locations);

  var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 30
  };

  var inner_width = d3.select("#div_distance_temps").node().getBoundingClientRect().width
  var width = inner_width - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var svg = d3.select("#div_distance_temps").append("svg")
    .attr("id", "distance_temps")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var distances = {
    '00h - 01h': 0,
    '01h - 02h': 0,
    '02h - 03h': 0,
    '03h - 04h': 0,
    '04h - 05h': 0,
    '05h - 06h': 0,
    '06h - 07h': 0,
    '07h - 08h': 0,
    '08h - 09h': 0,
    '09h - 10h': 0,
    '10h - 11h': 0,
    '11h - 12h': 0,
    '12h - 13h': 0,
    '13h - 14h': 0,
    '14h - 15h': 0,
    '15h - 16h': 0,
    '16h - 17h': 0,
    '17h - 18h': 0,
    '18h - 19h': 0,
    '19h - 20h': 0,
    '20h - 21h': 0,
    '21h - 22h': 0,
    '22h - 23h': 0,
    '23h - 00h': 0,
    //'TOTAL' : 0,
  };

  var reference_table = [
    '00h - 01h', '01h - 02h', '02h - 03h', '03h - 04h', '04h - 05h', '05h - 06h', '06h - 07h',
    '07h - 08h', '08h - 09h', '09h - 10h', '10h - 11h', '11h - 12h', '12h - 13h', '13h - 14h',
    '14h - 15h', '15h - 16h', '16h - 17h', '17h - 18h', '18h - 19h', '19h - 20h', '20h - 21h',
    '21h - 22h', '22h - 23h', '23h - 00h'
  ];

  for (var i = 0; i < (daily_locations.length - 1); i++) {
    lat1 = daily_locations[i].lat * Math.PI / 180
    lat2 = daily_locations[i + 1].lat * Math.PI / 180
    long1 = daily_locations[i].long * Math.PI / 180
    long2 = daily_locations[i + 1].long * Math.PI / 180
    if (lat1 != lat2 || long1 != long2) {
      var distance = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)) * 6371
      // modifier distances pour ajouter la valeure de distance pour chaque intervalle d'une heure !
      var annexe = reference_table[daily_locations[i].date.getUTCHours()]
      distances[annexe] = distances[annexe] + distance
      //distances['TOTAL'] = distances['TOTAL'] + distance
    }
  }

  console.log(distances);
  //console.log(reference_table)

  // Creation of the svg
  var parseTime = d3.timeFormat("%H %M")

  var t = d3.scaleTime()
    .range([0, width]);

  t.domain(d3.extent(daily_activities, function(d) {
    return d.date;
  }));

  var xAxis = d3.axisBottom()
    .scale(t);


  var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, (Math.floor(d3.max(d3.values(distances)) * 100) / 100)]);

  var yAxis = d3.axisLeft()
    .scale(y)
    .tickFormat(function(d) {
      return d + " km"
    });
  var bandMargin = 3;
  var bandwidth = width / 24 - bandMargin;
  var offsetx = 0;
  for (var time in distances) {
    svg.append("rect")
      .attr("x", offsetx)
      .attr("y", y(distances[time]))
      .attr("width", bandwidth)
      .attr("height", height - y(distances[time]))
      .style("fill", color("TOTAL"));

    offsetx = offsetx + bandwidth + bandMargin;
  }

  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'x axis')
    .call(xAxis);

  svg.append('g')
    .attr('transform', 'translate(0,' + 0 + ')')
    .attr('class', 'y axis')
    .call(yAxis);

}