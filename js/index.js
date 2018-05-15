var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempCelsius = "C";
var tempFahrenheit = "F";
var currentTempInCelsius;
var currentTempInFahrenheit;

$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
       setupWeather(lat, lon);
  });
  } else {
     console.log("Geolocation is not available");
  } //end of condition 
  
  function setupWeather(lat, lon) {
   var urlString = api + lat + "&" + lon;
    console.log(urlString);
   $.ajax({
    url: urlString, success: function (weatherDataIn) { 
     var icon = ("<img src='" + weatherDataIn.weather[0].icon + "'>");
      $("#icon").html(icon);
      currentTempInCelsius = Math.round(weatherDataIn.main.temp * 10) / 10;
      currentTempInFahrenheit = Math.round(currentTempInCelsius * 9 / 5 + 32); 
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176) + tempCelsius); 
      $("#descr").html(weatherDataIn.weather[0].main);
      var sw = Math.round(weatherDataIn.wind.speed*3.6);
      $("#windSpeed").text("Wind Speed: " + sw + " km/h");
      var city = weatherDataIn.name.replace(/keruelet/i, 'kerulet');
      $("#location").text(city + ", " + weatherDataIn.sys.country);
 
      if (city == "Shuzenji") {
        setupWeather(lat, lon);
      } else {
         pageLoading();
      };
      
    } //end of function
  }); //end of ajax
} //end of function setupWeather
}); //end of document ready

function myFunction() { 
       var checkBox = document.getElementById("myCheck");
       if (checkBox.checked){
        $("#temp").text(currentTempInFahrenheit + " " + String.fromCharCode(176) + tempFahrenheit);
       } else {
          $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176) + tempCelsius);
         } //end of condition 
    } //end of function

function pageLoading() {
  $("#refreshAnimation").addClass("hidden");
  $("#data").removeClass("hidden");
}