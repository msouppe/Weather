// var firstKey = "4a6c9c294860afdf";
var otherKey = "86a17c63187fb2a5";
var zipcode;
// var yester_Weather = "http://api.wunderground.com/api/" + otherKey + "/yesterday/q/CA/San_Francisco.json";
// var today_Weather = "http://api.wunderground.com/api/" + otherKey + "/conditions/q/CA/San_Francisco.json";
var placement, yester_Weather, today_Weather;
var yesterHigh, yesterLow, currTemp, yesterMean, currZip, city, state_country;

$(document).ready(function() {
  $("#driver").click(getUserZipcode);
});

// Fcn: getUserZipCode
// Parameters: event
// Definition: Get the zipcode from the Weather API 
function getUserZipcode (event) {
  zipcode = $("userZip").value;
  placement = "http://api.wunderground.com/api/"+ otherKey +"/geolookup/q/" + zipcode + "94566.json";
  $.getJSON(placement, zipcodeData);
  getYesterdayWeather();
}

// Fcn: zipcodeData
// Parameters: code
// Definition: Takes the data from the API and writes the data to the html DOM
function zipcodeData(code) {
  var country = code.location.country;
  $('#myLoca').html('<p>My location: ' + country +'</p>');
  debugger;
  if ( country == "US") {
    city = code.location.city;
    state_country = code.location.state;
  } 
  else if (country != "US") {
    city = code.location.city;
    state_country = code.location.country;
  }
  else { // default case
    city = "Seattle";
    state_country = "WA";
  }

  $('#myLoca').html('<p>My location: ' + city + ', ' + state_country +'</p>');
}

// Fcn: getYesterdayWeather
// Parameters: none
// Definition: Get today's forecast from the Weather API
function getYesterdayWeather () {
  yester_Weather = "http://api.wunderground.com/api/" + otherKey + "/yesterday/q/" + state_country + "/" + city + ".json";
  $.getJSON(yester_Weather, getTodayWeather);
}

// Fcn: yesterdayData
// Parameters: response
// Definition: Takes the data from the API and writes the data to the html DOM
function yesterdayData (response) {
    yesterHigh = response.history.dailysummary[0].maxtempi;
    yesterLow = response.history.dailysummary[0].mintempi;
    yesterMean = response.history.dailysummary[0].meantempi;

    $('#prevDay').html('<p>Yesterday\'s Date: ' + response.history.date.pretty + '</p>');
    $('#prevDay').append('<p>Yesterday\'s Low temperature: ' + yesterLow + '&#x2109 </p>');
    $('#prevDay').append('<p>Yesterday\'s High temperature: ' + yesterHigh + '&#x2109 </p>');
    $('#prevDay').append('<p>Yesterday\'s Mean temperature: ' + yesterMean + '&#x2109 </p>');
}

// Fcn: getTodayWeather
// Parameters: response
// Definition: Get today's forecast from the Weather API
function getTodayWeather (response) {
  yesterdayData(response);
  today_Weather = "http://api.wunderground.com/api/" + otherKey + "/conditions/q/" + state_country + "/" + city + ".json";
  $.getJSON(today_Weather, todayData);
}

// Fcn: todayData
// Parameters: curr
// Definition: Takes the data from the API and writes the data to the html DOM
function todayData (curr) {
  currTemp = curr.current_observation.temp_f;
  // debugger;
  $('#yoyo').html('<p>Today\'s temperature: ' + currTemp + '&#x2109 </p>');
  degreeDifference(yesterMean, currTemp);
}

// Fcn: degreeDifference
// Parameters: prevTemp, todayTemp
// Definition: Calculates the temperature difference from yesterday's 
//             mean temperature to today's mean teamperature
function degreeDifference(prevTemp, todayTemp){
  var tempDiff = Math.floor(Number(todayTemp) - Number(prevTemp));
  if (tempDiff > 0) {
    $('#butt').html('<p>Today\'s temperature is ' + Math.abs(tempDiff).toString() + '&#x2109 warmer than yesterday</p>');
  } 
  else if (tempDiff < 0) {
    $('#butt').html('<p>Today\'s temperature: ' + Math.abs(tempDiff).toString() + '&#x2109 cooler than yesterday</p>');
  }
  else {
    $('#butt').html('<p>Today\'s forecast is the same as yesterday\'s of ' + todayTemp + '&#x2109 </p>');
  }
}