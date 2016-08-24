// var firstKey = "4a6c9c294860afdf";
var otherKey = "86a17c63187fb2a5";
var city = "San_Francisco";
var state_country = "CA";
var zipcode = "95060";  // zipcode for Santa Cruz and temporarily is the default zipcode
var yester_Weather = "http://api.wunderground.com/api/" + otherKey + "/yesterday/q/" + state_country + "/" + city + ".json";
var today_Weather = "http://api.wunderground.com/api/" + otherKey + "/conditions/q/" + state_country + "/" + city + ".json";
var yesterHigh, yesterLow, currTemp, yesterMean, currZip, city, state_country, placement;

// Main program
$(document).ready(function() {
  $("#driver").click(getUserZipcode);
});

// Fcn: getUserZipCode
// Parameters: event
// Definition: Get the zipcode from the Weather API 
function getUserZipcode (event) {
  zipcode = document.getElementById("userZip").value;
  if(zipcode == null || zipcode == "") {
    alert("Enter a zipcode");
  } else {
    console.log(zipcode);
    placement = "http://api.wunderground.com/api/"+ otherKey +"/geolookup/q/" + zipcode + ".json";
    $.getJSON(placement, zipcodeData);
    getYesterdayWeather();
  }
}

// Fcn: zipcodeData
// Parameters: code
// Definition: Takes the country, state, and city data from the API and writes the data to the html DOM
function zipcodeData(code) {
  var etas = code.location.country;
  $('#myLoca').html('<p>My location: ' + etas +'</p>');
  console.log(etas);
  if (etas == "US") {
    city = code.location.city;
    state_country = code.location.state;
  } 
  else if (etas != "US") {
    city = code.location.city;
    state_country = code.location.country;
  }
  else { // default case
    city = "Seattle";
    state_country = "WA";
  }
  $('#myLoca').html('<p>' + city + ', ' + state_country +'</p>');
}

// Fcn: getYesterdayWeather
// Parameters: none
// Definition: Get today's forecast from the Weather API
function getYesterdayWeather () {
  $.getJSON(yester_Weather, getTodayWeather);
}

// Fcn: yesterdayData
// Parameters: response
// Definition: Takes the max, min, and mean farhenheit temperature data from the API and writes 
//             the data to the html DOM
function yesterdayData (response) {
    yesterHigh = response.history.dailysummary[0].maxtempi;
    yesterLow = response.history.dailysummary[0].mintempi;
    yesterMean = response.history.dailysummary[0].meantempi;

    $('#prevDay').html('<p>Yesterday\'s forecast: </p>');
    $('#prevDay').append('<p>   Low: ' + yesterLow + '&#x2109     <br> High: ' + yesterHigh + '&#x2109   <br>  Mean: ' + yesterMean + '&#x2109</p>');
    // $('#prevDay').append('<p>   High: ' + yesterHigh + '&#x2109 </p>');
    // $('#prevDay').append('<p>   Mean: ' + yesterMean + '&#x2109 </p>');
}

// Fcn: getTodayWeather
// Parameters: response
// Definition: Get today's forecast from the Weather API
function getTodayWeather (response) {
  yesterdayData(response);
  $.getJSON(today_Weather, todayData);
}

// Fcn: todayData
// Parameters: curr
// Definition: Takes the current temperature from the API and writes the data to the html DOM
function todayData (curr) {
  currTemp = curr.current_observation.temp_f;
  iconStr = curr.current_observation.weather;
  newStr = iconStr.replace(/\s+/g, '');
  iconImg = newStr.toLowerCase();
  console.log(iconImg);
  // debugger;
  $('#weatherIcon').html('<i class="wi wi-wu-' + iconImg + '"></i>');
  // $('#weatherIcon').append('<p>testting</p>');
  $('#currDay').html('<p>Today\'s temperature: ' + currTemp + '&#x2109 </p>');
  degreeDifference(yesterMean, currTemp);
}

// Fcn: degreeDifference
// Parameters: prevTemp, todayTemp
// Definition: Calculates the temperature difference from yesterday's 
//             mean temperature to today's mean teamperature
function degreeDifference(prevTemp, todayTemp){
  var tempDiff = Math.floor(Number(todayTemp) - Number(prevTemp));
  if (tempDiff > 0) {
    $('#calculate').html('<br><p>Today\'s temperature is ' + Math.abs(tempDiff).toString() + '&#x2109 warmer than yesterday</p>');
  } 
  else if (tempDiff < 0) {
    $('#calculate').html('<br><p>Today\'s temperature: ' + Math.abs(tempDiff).toString() + '&#x2109 cooler than yesterday</p>');
  }
  else {
    $('#calculate').html('<br><p>Today\'s forecast is the same as yesterday\'s of ' + todayTemp + '&#x2109 </p>');
  }
}