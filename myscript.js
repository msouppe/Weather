$(document).ready(function() {	
  var otherKey = "86a17c63187fb2a5";
  var yester_Weather = "http://api.wunderground.com/api/" + otherKey + "/yesterday/q/CA/San_Francisco.json";
  var today_Weather = "http://api.wunderground.com/api/" + otherKey + "/conditions/q/CA/San_Francisco.json";
  var yesterHigh, yesterLow, currTemp;
  yesterMean = "100";

  $("#driver").click(function(event){

    // var firstKey = "4a6c9c294860afdf";
    // var otherKey = "86a17c63187fb2a5";

    // var yester_Weather = "http://api.wunderground.com/api/" + otherKey + "/yesterday/q/CA/San_Francisco.json";
    // var today_Weather = "http://api.wunderground.com/api/" + otherKey + "/conditions/q/CA/San_Francisco.json";
    // var yesterHigh, yesterLow, yesterMean, currTemp;

    $.getJSON(yester_Weather, function(yester) {
      // debugger;
      yesterHigh = yester.history.dailysummary[0].maxtempi;
      yesterLow = yester.history.dailysummary[0].mintempi;
      yesterMean = yester.history.dailysummary[0].meantempi;

      $('#prevDay').html('<p>Yesterday\'s Date: ' + yester.history.date.pretty + '</p>');
      $('#prevDay').append('<p>Yesterday\'s Low temperature: ' + yesterLow + '&#x2109 </p>');
      $('#prevDay').append('<p>Yesterday\'s High temperature: ' + yesterHigh + '&#x2109 </p>');
      $('#prevDay').append('<p>Yesterday\'s Mean temperature: ' + yesterMean + '&#x2109 </p>');
    });

    $.getJSON(today_Weather, function(curr) {

      currTemp = curr.current_observation.temp_f;
      // debugger;
      $('#yoyo').html('<p>Today\'s temperature: ' + currTemp + '&#x2109 </p>');
      
    });

    degreeDifference(yesterMean, currTemp);
    // debugger;

    });	
 });

function degreeDifference(prevTemp, todayTemp){
  debugger;
  var tempDiff = Number(todayTemp) - Number(prevTemp);
  // debugger;
  if (tempDiff > 0) {
    $('#butt').html('<p>Today\'s temperature is ' + Math.abs(tempDiff).toString() + '&#x2109 </p>');
  } 
  else if (tempDiff < 0) {
    $('#butt').html('<p>Today\'s temperature: ' + tempDiff.toString() + '&#x2109 </p>');
  }
  else {
    $('#butt').html('<p>Today\'s forecast is the same as yesterday\'s of ' + todayTemp + '&#x2109 </p>');
  }
}

