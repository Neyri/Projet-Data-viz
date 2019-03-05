// functions related to the graphs concerning activity

function get_daily_activities(daily_locations) {
  // return a list with good format to draw lines
  daily_activities = []
  for (var i = 0; i < daily_locations.length; i++) {
    for (var j = 0; j < daily_locations[i].activity.length; j++) {
      info = {}
      info['type'] = daily_locations[i].activity[j].type
      info['confidence'] = daily_locations[i].activity[j].confidence
      info['date'] = daily_locations[i]['date']
      daily_activities.push(info)
    }
  }
  return daily_activities
}

function build_proba_activities(daily_locations, color) {
  d3.select("#probas_actis").remove()
  daily_activities = get_daily_activities(daily_locations);

  var legend_width = 0;
  var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 30
  };
  var inner_width = d3.select("#div_proba_acti").node().getBoundingClientRect().width
  var width = inner_width - margin.left - margin.right - legend_width,
    height = 400 - margin.top - margin.bottom;

  var svg = d3.select("#div_proba_acti").append("svg")
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

  var parseTime = d3.timeFormat("%H %M")

  var t = d3.scaleTime()
    .range([0, width]);

  t.domain(d3.extent(daily_activities, function(d) {
    return d.date;
  }));

  var xAxis = d3.axisBottom()
    .scale(t);

  var symbols = d3.nest()
    .key(function(d) {
      return d.type;
    })
    .entries(daily_activities);

  var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) {
      return t(d.date);
    })
    .y(function(d) {
      return y(d.confidence);
    });

  var checkbox_value = d3.select('input[name="type_acti"]:checked').node().value
  if (checkbox_value == 'main') {
    svg.selectAll(".bar").data(daily_locations.slice(0, -1)).enter()
      .append('rect')
      .attr('height', height)
      .attr('width', (d, i) => t(daily_locations[i + 1].date) - t(d.date))
      .attr('x', d => t(d.date))
      .attr('y', 0)
      .attr("fill", function(d, i) {
        var fill = d3.color(color(d.activity[0]['type']));
        fill.opacity = 0.5
        return fill;
      })
      .attr("stroke", "none");
  }

  if (checkbox_value == 'proba') {
    svg.selectAll(".line").data(symbols).enter()
      .append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .attr("stroke", function(d, i) {
        return color(d.key);
      })
      .attr("fill", "none");
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