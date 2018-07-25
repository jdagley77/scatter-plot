// request the data
var api = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
document.addEventListener("DOMContentLoaded", function(event) {
   fetch(api)
     .then(function(response) { return response.json(); })
     .then(function(data) { 
         //do something with the data 
         parsedData = parseData(data)
         drawScatterPlot(parsedData)
     })
});

// formats the data
function parseData(json) {
	var arr = [];
	json.forEach(function(datapoint){
		var tempObj  = {
			'Time': new Date(datapoint['Seconds'] * 1000), //convert from seconds to milliseconds to use d3 time formatter function
			'Place': datapoint['Place'],
			'Seconds': datapoint['Seconds'],
			'Name': datapoint['Name'],
			'Year': d3.timeParse("%Y")(datapoint['Year']),
			'Nationality': datapoint['Nationality'],
			'Doping': datapoint['Doping'],
			'URL': datapoint['URL'] ? datapoint['URL'] : 'undefined',
			'Doping': datapoint['Doping'] 
		}
		arr.push(tempObj)
	})
	console.log(arr)
	return arr;
}

function drawScatterPlot(data) {
	const w = 960;
	const h = 500;
	const padding = 100;

	yScale = d3.scaleLinear()
		.range([h, 0])
		.domain([d3.max(data, (d) => d.Time), d3.min(data, (d) => d.Time)])

	xScale = d3.scaleLinear()
		.range([0, w])
		.domain([d3.min(data, (d)=> d.Year), d3.max(data, (d)=> d.Year)])

	chart = d3.select('body')
		.append('svg')
		.attr('height', h)
		.attr('width', w)
		.style('padding', padding)

	tooltip = d3.select('body').append('div')
		.attr('class', 'tooltip')

	circles = chart.selectAll('circle')
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
				.html(
							`<a href=${d.URL} class='wiki-link' target='_blank'>${d.Name}</a><br> 
							${d.Nationality}<br> 
							Place: ${d.Place}<br> 
							${d.Time.getMinutes()}: ${d.Time.getSeconds()}<br> 
							${d.Year.getFullYear()}`
				)
		})
		.on('click', function(d) {
			tooltip
				.style('display', 'none')
		})

	circles.each(function(d) {
		if (d.Doping.length) {
			this.classList.add('doping')
		} else {
			this.classList.add('not-doping')
		}
	})

	const xAxis = d3.axisBottom(xScale)
	const yAxis = d3.axisLeft(yScale)

	chart.append('g')
		.attr('class', 'xaxis')
		.attr('transform', 'translate(0,' + h + ')')
		.call(xAxis.tickFormat(d3.timeFormat("%Y")))

	chart.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 0 - padding/2)
		.attr('x', '-'+(h/2))
		.text('Time in Minutes')

	chart.append('g')
		.attr('class', 'yaxis')
		.attr('transform', 'translate(0,0)')
		.call(yAxis.tickFormat(d3.timeFormat("%M:%S")));

	chart.append('text')
		.attr('transform', 'translate('+w/2+', 0)')
		.attr('class', 'title')
		.style('text-anchor', 'middle')
		.text(`Doping in Professional Bicycle Racing`)

	chart.append('text')
		.attr('transform', 'translate('+w/2+', 30)')
		.attr('class', 'sub-title')
		.style('text-anchor', 'middle')
		.text(`35 Fastest Times up Alpe d'Huez`)
}



