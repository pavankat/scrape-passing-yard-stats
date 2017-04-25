var request = require('request');
var cheerio = require('cheerio')

var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "fantasy_db"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


request('http://www.nfl.com/stats/categorystats?tabSeq=0&statisticCategory=PASSING&conference=null&season=2016&seasonType=REG&d-447263-s=PASSING_YARDS&d-447263-o=2&d-447263-n=1', function (error, response, body) {

  // console.log(body);

    var $ = cheerio.load(body);

    var tableRows = $('tr')

    //Player, Team, Pos, Comp, Att, Yards, Tds, interceptions

    //skip first row
    tableRows.slice(1).each(function(i, element) {
      let cleanRow = [];
      let justThese = [1,2, 4, 5, 8, 11, 12];
      let tds = $(element).children('td');
      
      tds.each(function(tdIndex, td){
        cleanRow.push($(this).text().trim());
      });

      let filteredRow = cleanRow.filter(function(el, i){
        if (justThese.indexOf(i) >= 0) return el;
      });

      connection.query("INSERT INTO quarterbacks (player, team, pos, comp, att, yards, tds, interceptions) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
              filteredRow[0],
              filteredRow[1],
              filteredRow[2],
              filteredRow[3],
              filteredRow[4],
              filteredRow[5],
              filteredRow[6],
              filteredRow[7]
            ], function(err, res) {
              if (err) return console.log(err);
              else console.log('done')
            });
    });


});