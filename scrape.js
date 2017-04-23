var request = require('request');
var cheerio = require('cheerio')


request('http://www.nfl.com/stats/categorystats?tabSeq=0&statisticCategory=PASSING&conference=null&season=2016&seasonType=REG&d-447263-s=PASSING_YARDS&d-447263-o=2&d-447263-n=1', function (error, response, body) {

	// console.log(body);

  	var $ = cheerio.load(body);

  	var tableRows = $('tr')
  	var filteredData = [];

  	//Player, Team, Pos, Comp, Att, Yards, Tds, interceptions

  	tableRows.each(function(i, element) {
  		let cleanRow = [];
  		let justThese = [1,2, 4, 5, 8, 11, 12];
  		let tds = $(element).children('td');
  		
  		tds.each(function(tdIndex, td){
  			cleanRow.push($(this).text().trim());
  		});

  		let filteredRow = cleanRow.filter(function(el, i){
  			if (justThese.indexOf(i) >= 0) return el;
  		});

  		filteredData.push(filteredRow);
  	});

  	filteredData = filteredData.splice(1);
  	
  	console.log(filteredData);
});