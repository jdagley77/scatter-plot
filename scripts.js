
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
	console.log(json)
	var arr = [];
	json.forEach(function(datapoint){
		var tempObj  = {
			'Time': new Date(datapoint['Seconds'] * 1000),
			'Place': datapoint['Place'],
			'Seconds': datapoint['Seconds'],
			'Name': datapoint['Name'],
			'Year': d3.timeParse("%Y")(datapoint['Year']).getFullYear(),
			'Nationality': datapoint['Nationality'],
			'Doping': datapoint['Doping'],
			'URL': datapoint['URL'],
			'Doping': datapoint['Doping']
		}
		arr.push(tempObj)
	})
	console.log(arr)
	return arr;
}

function formatTime(time) {
	parseDate = d3.timeFormat("%Y")(time)
 	return parseDate;
}
	

function drawScatterPlot(data) {
	const w = 960;
	const h = 500;
	const padding = 50;

	var yScale = d3.scaleLinear()
		.range([h, 0])
		.domain([d3.max(data, (d) => d.Time), d3.min(data, (d) => d.Time)])

	var xScale = d3.scaleLinear()
		.range([0, w])
		.domain([d3.min(data, (d)=> d.Year), d3.max(data, (d)=> d.Year)])

	var chart = d3.select('body')
		.append('svg')
		.attr('height', h)
		.attr('width', w)
		.style('padding', padding)

	var tooltip = d3.select('body').append('div')
		.attr('class', 'tooltip')

	chart.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', (d, i) => xScale(d.Year))
		.attr('cy', (d, i) => yScale(d.Time))
		.attr('r', '10')
		.attr('class', 'circle')
		.on('mouseover', function(d) {
			tooltip
				.style('left', d3.event.pageX + 20 + 'px')
				.style('top', d3.event.pageY + 'px')
				.style('display', 'inline-block')
				.html(d.Name + '<br>' + 
							d.Nationality + '<br>' + 
							'Place: ' + d.Place + '<br>' + 
							d.Time.getMinutes() + ':' + 
							d.Time.getSeconds() + '<br>'+ 
							d.Year
						)
		})
		.on('mouseout', function(d) {
			tooltip
				.style('display', 'none')
		})

	const xAxis = d3.axisBottom(xScale)
	const yAxis = d3.axisLeft(yScale)

	chart.append('g')
		.attr('class', 'xaxis')
		.attr('transform', 'translate(0,' + h + ')')
		.call(xAxis.tickFormat(d3.timeFormat("%Y")))

	chart.append('g')
		.attr('class', 'yaxis')
		.attr('transform', 'translate(0,0)')
		.call(yAxis.tickFormat(d3.timeFormat("%M:%S")));
}


