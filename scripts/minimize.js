function minimize(id, action){
	if (d3.select('#' + id).style('height') != '0px')
	{
		d3.select('#' + id).style('height', '0px')
		d3.select('#' + id).style('visibility', 'hidden')
	}
	else{
		d3.select('#' + id).style('height', 'auto')
		d3.select('#' + id).style('visibility', 'visible')
	}
}