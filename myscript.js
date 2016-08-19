// var firstKey = "4a6c9c294860afdf";
var otherKey = "86a17c63187fb2a5";
var yester_Weather = "http://api.wunderground.com/api/" + otherKey + "/yesterday/q/CA/San_Francisco.json";
var today_Weather = "http://api.wunderground.com/api/" + otherKey + "/conditions/q/CA/San_Francisco.json";
var yesterHigh, yesterLow, currTemp, yesterMean;

$(document).ready(function() {
  $("#driver").click(onDriverClick);	// click
}); // doc

function degreeDifference(prevTemp, todayTemp){
  // debugger;
  var tempDiff = Number(todayTemp) - Number(prevTemp);
  var roundAns = Math.floor(tempDiff);
  // debugger;
  if (roundAns > 0) {
    $('#butt').html('<p>Today\'s temperature is ' + Math.abs(roundAns).toString() + '&#x2109 warmer than yesterday</p>');
  } 
  else if (roundAns < 0) {
    $('#butt').html('<p>Today\'s temperature: ' + Math.abs(roundAns).toString() + '&#x2109 cooler than yesterday</p>');
  }
  else {
    $('#butt').html('<p>Today\'s forecast is the same as yesterday\'s of ' + todayTemp + '&#x2109 </p>');
  }
}

function prevDayData (response) {
    yesterHigh = response.history.dailysummary[0].maxtempi;
    yesterLow = response.history.dailysummary[0].mintempi;
    yesterMean = response.history.dailysummary[0].meantempi;

    $('#prevDay').html('<p>Yesterday\'s Date: ' + response.history.date.pretty + '</p>');
    $('#prevDay').append('<p>Yesterday\'s Low temperature: ' + yesterLow + '&#x2109 </p>');
    $('#prevDay').append('<p>Yesterday\'s High temperature: ' + yesterHigh + '&#x2109 </p>');
    $('#prevDay').append('<p>Yesterday\'s Mean temperature: ' + yesterMean + '&#x2109 </p>');
}

function onDriverClick (event) {
  $.getJSON(yester_Weather, onYesterdayWeaReturn);
}

function currDayData (curr) {
  currTemp = curr.current_observation.temp_f;
  // debugger;
  $('#yoyo').html('<p>Today\'s temperature: ' + currTemp + '&#x2109 </p>');
  degreeDifference(yesterMean, currTemp);
}

function onYesterdayWeaReturn (response) {
  prevDayData(response);
  $.getJSON(today_Weather, currDayData);
}
