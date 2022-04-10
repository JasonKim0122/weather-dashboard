// Variables
var myKey = "appid=fe7a42d4613005e1775fd8f48c765d89";
var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=";
var weatherUV = "https://api.openweathermap.org/data/2.5/uvi?";
var weatherForecast ="https://api.openweathermap.org/data/2.5/onecall?";
var searchCityEl = document.getElementById("search-input");
var searchedCitiesEl = document.getElementById("searchedCity");
var cityInputEl = document.getElementById("city");
var dateInputEl = document.getElementById("currentDate");

//Function for getting info from API
function getWeather (cityName) {
    //Need to first Format the API Url
    var apiUrl = weatherAPI + cityName + "&" + myKey + "&units=imperial"; 

    //use fetch to make a request to the url
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            return response.json().then(function (response) {
                cityInputEl.innerHTML(response.name);
                
                //displaying date along with city
                var currentTime = response.dt;
                var currentDate = moment.unix(currentTime).format("MM/DD/YY");
                dateInputEl.innherHTML(currentDate);

                //displaying info
                var currentTemp =getElementById("temp");
                currentTemp.innerHTML(response.main.temp + " \u00B0F");

                var currentWind=getElementById("wind");
                currentWind.innerHTML(response.wind.speed + " MPH");

                var currentHumidity=getElementById("humidity");
                currentHumidity.innherHTML(response.main.humidity + " %");

                //need coordinates to call UV index correctly
                var lat = response.coord.lat;
                var lon = response.coord.lon;

                getUVIndex(lat, lon);
                getForecast(lat, lon);

            });
        } else {
            alert("This is not a valid City Name. Please Try again!")
        }
    });
};

//Need functions to call UVIndex and Forecast

function getForecast (lat, lon) {
    var apiUrl = weatherForecast + "lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly" + "&" + myKey + "&units=imperial";
    fetch (apiUrl).then(function(response){
        return response.json();
    }).then(function(response){
        for (var i= 1; i < 6; i++) {
            var currentTime = response.daily[i].dt;
            var currentDate = moment.unix(currentTime).format("MM/DD/YY");

            var dayEl = getElementById("day" + i);
            dayEl.innherHTML(currentDate); 

            //displaying weather pic
            var iconForWeatherUrl = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png";
            $("#weatherIcon" + i).attr("src", iconForWeatherUrl);

            //displaying current day temperature
            var tempToday = response.daily[i].temp.day + "\u00B0F"; 
            var tempDayEl = getElementById("tempDay" + i);
            tempDayEl.innerHTML(tempToday);

            //showing humidity
            var humidityToday = response.daily[i].humidity;
            var humidityDayEl = getElementById("humidityDay" + i);
            humidityDayEl.innerHTML(humidityToday);
        }
    });
};

function getUVIndex (lat, lon) {
    var apiUrl = weatherUV + myKey + "&lat=" + lat + "&lon=" + lon + "&units=imperial";

    fetch(apiUrl).then(function(response){
        return response.json();
    }).then(function(response){
        var currentIndex = getElementById("uv");
        currentIndex.innerHTML(response.value);
    });
};


//Creating buttons for recent search so user can easily click back 





//Save to localStorage





//Load localStorage






//Call functions
getWeather();
