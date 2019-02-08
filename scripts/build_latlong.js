function build_latlong(data) {
  var width = 960;
  var height = 800;
  var pos = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height);
  var xmin = 50;
  var xmax = width - 30;
  var ymin = 10;
  var margin = 15
  var ymax = height - 50;

  console.log(data)

  var minlat = d3.min(data, d => d['lat'])
  var maxlat = d3.max(data, d => d['lat'])
  var minlong = d3.min(data, d => d['long'])
  var maxlong = d3.max(data, d => d['long'])
  var minalt = d3.min(data, d => d['alt'])
  var maxalt = d3.max(data, d => d['alt'])
  var y_lat = d3.scaleLinear()
    .domain([minlat, maxlat])
    .range([2 * ymax / 3 - margin, ymax / 3 + margin]);
  var y_long = d3.scaleLinear()
    .domain([minlong, maxlong])
    .range([ymax / 3 - margin, ymin]);
  var y_alt = d3.scaleLinear()
    .domain([minalt, maxalt])
    .range([ymax, 2 * ymax / 3 + margin]);

  var x = d3.scaleBand()
    .domain(d3.range(data.length + 1)) //d3.extent(data, (d) => d['AAPL']['x']))
    .range([xmin, xmax])

  var tmin = d3.min(data, d => d['date'])
  var tmax = d3.max(data, d => d['date'])

  // var x = d3.scaleTime()
  //   .domain([tmin, tmax])
  //   .range([xmin, xmax])

  var t = d3.scaleTime()
    .domain([tmin, tmax])
    .range([xmin, xmax])


  var xAxis = d3.axisBottom(t)
    .ticks(d3.timeMonth);

  var yAxis_lat = d3.axisLeft(y_lat)
  var yAxis_long = d3.axisLeft(y_long)
  var yAxis_alt = d3.axisLeft(y_alt)

  // Bind data
  var line_lat = d3.line()
    .x((d, i) => t(d['date']))
    .y((d, i) => y_lat(d['lat']));

  var line_long = d3.line()
    .x((d, i) => t(d['date']))
    .y((d, i) => y_long(d['long']));

  var line_alt = d3.line()
    .x((d, i) => t(d['date']))
    .y((d, i) => y_alt(d['alt']));

  pos.append("g")
    .attr("transform", "translate(" + 0 + ", " + y_lat(0) + ")")
    .attr("class", "x axis")
    .call(xAxis);
  pos.append("g")
    .attr("transform", "translate(" + (xmin) + ", " + 0 + ")")
    .attr("class", "y axis")
    .call(yAxis_lat);
  pos.selectAll("#lat").data([data]).enter()
    .append("path")
    .attr("class", "line")
    .attr("d", line_lat)
    .attr("stroke", color(0))
    .attr('stroke-width', 2)
    .attr("fill", "none");

  pos.append("g")
    .attr("transform", "translate(" + 0 + ", " + y_long(0) + ")")
    .attr("class", "x axis")
    .call(xAxis);
  pos.append("g")
    .attr("transform", "translate(" + (xmin) + ", " + 0 + ")")
    .attr("class", "y axis")
    .call(yAxis_long);
  pos.selectAll("#long").data([data]).enter()
    .append("path")
    .attr("class", "line")
    .attr("d", line_long)
    .attr("stroke", color(1))
    .attr('stroke-width', 2)
    .attr("fill", "none");

  pos.append("g")
    .attr("transform", "translate(" + 0 + ", " + y_alt(0) + ")")
    .attr("class", "x axis")
    .call(xAxis);
  pos.append("g")
    .attr("transform", "translate(" + (xmin) + ", " + 0 + ")")
    .attr("class", "y axis")
    .call(yAxis_alt);
  pos.selectAll("#alt").data([data]).enter()
    .append("path")
    .attr("class", "line")
    .attr("d", line_alt)
    .attr("stroke", color(2))
    .attr('stroke-width', 2)
    .attr("fill", "none");
}