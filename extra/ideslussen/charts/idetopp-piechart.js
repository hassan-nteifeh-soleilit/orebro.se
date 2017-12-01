google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Förvaltning', 'Idéer'],
          ['Förvaltningen för utbildning, försörjning och arbete',     2],
          ['Tekniska förvaltningen',      4],
          ['Kommunstyrelseförvaltningen',  5],
          ['Kultur- och fritidsförvaltningen', 4],
          ['Förvaltningen för funktionshindrade',    10],
          ['Miljökontoret',    7],
          ['Stadsbyggnad',    9],
          ['Förvaltningen förskola och skola',    3],
          ['Vård- och omsorgsförvaltningen',    6]
        ]);

        var options = {
           backgroundColor: { fill:'transparent' },
           pieHole: 0.3,
           pieSliceText: 'value',
           is3D: false,
           chartArea: {width: 500, height: 500},
           legend: {position: 'right', alignment: 'center'},
           fontName: 'Open Sans',
           fontSize: 16,
           pieSliceTextStyle: {color: '#353853B', fontName: 'Open Sans', fontSize: 16},
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
      }
$(window).resize(function(){
	drawChart1();
 	drawChart2();
});