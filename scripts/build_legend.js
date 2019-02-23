function build_legend(data) {
  var leg = d3.select('#legend');
  for (var activity of activities) {
    var text = activity.split('_').join(' ').toLowerCase();
    var act = leg.append('div')
      .attr('class', 'legend')
    act.append('div')
      .style('background-color', color(activity))
      .attr('class', 'legend_square')
    act.append('span')
      .text(text)
      .attr('class', 'legend_text');
  }
}