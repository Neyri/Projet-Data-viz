function build_distrib(data) {
  var width = 960;
  var height = 300;
  var xmin = 50;
  var xmax = width - 30;
  var ymin = 10;
  var margin = 15
  var ymax = height - 50;


  var distr = d3.select("#distribution").append("svg")
    .attr("width", width)
    .attr("height", height);

  var distrib = d3.nest()
    .key(d => new Date(d.getFullYear(), d.getMonth(), d.getDate()))
    .rollup(v => v.length)
    .entries(dates)

  var max_count = d3.max(distrib, d => d.value)
  var max_date = d3.max(distrib, d => new Date(d.key))
  var min_date = d3.min(distrib, d => new Date(d.key))

  var y = d3.scaleLinear()
    .domain([0, max_count])
    .range([ymax, ymin]);

  var x = d3.scaleTime()
    .domain([min_date, max_date])
    .range([xmin, xmax])

  var bandwidth = (xmax - xmin) / Math.ceil((max_date - min_date) / (1000 * 3600 * 24));
  distr.selectAll("svg").data(distrib).enter()
    .append("rect")
    .attr("width", bandwidth)
    .attr("height", (d, i) => ymax - y(d.value))
    .attr("x", function(d, j) {
      var date = new Date(d.key);
      return x(date) + bandwidth;
    })
    .attr("y", (d, i) => y(d.value))
    .attr("fill", color(0))
    .attr("stroke", 'none')

  var xAxis = d3.axisBottom(x)
    .ticks(d3.timeMonth);

  var yAxis = d3.axisLeft(y)

  distr.append("g")
    .attr("transform", "translate(" + 0 + ", " + y(0) + ")")
    .attr("class", "x axis")
    .call(xAxis);
  distr.append("g")
    .attr("transform", "translate(" + xmin + ", " + 0 + ")")
    .attr("class", "y axis")
    .call(yAxis);

}