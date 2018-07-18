
var api = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
document.addEventListener("DOMContentLoaded", function(event) {
   fetch(api)
     .then(function(response) { return response.json(); })
     .then(function(data) { 
         //DO SOMETHING WITH DATA  
         parsedData = parseData(data)
         drawScatterPlot(parsedData)
     })
});

// formats the data
function parseData(json) {
	return json;
}

function drawScatterPlot(data) {
	const w = 960;
	const h = 500;
	const padding = 50;

	var yScale = d3.scaleLinear()
		.range([h, 0])
		.domain([d3.max(data, (d) => d.Seconds)])

	var yScale = d3.scaleLinear()
		.range([])
		.domain([])

	var chart = d3.select('body')
		.append('svg')
		.attr('height', h)
		.attr('width', w)
		.style('passing', padding)
}



