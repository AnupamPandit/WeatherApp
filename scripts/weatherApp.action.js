/*URI Constants*/
var appid= '011c20592ae88c4ac68b32ea9081fa9b';
var currentWeatherURI = 'http://api.openweathermap.org/data/2.5/weather?q={city},{country}&appid={appid}';
var forecastWeatherURI = 'http://api.openweathermap.org/data/2.5/forecast?q={city},{country}&appid={appid}';
currentWeatherURI = currentWeatherURI.replace('{appid}',appid);
forecastWeatherURI = forecastWeatherURI.replace('{appid}',appid);

/*Service to fetch REST weather data*/
angular.module('euroWeatherApp').factory('weatherService', function($q, $http) {
				return {
          /*Rest service to fetch Current weather data*/
          fetchCurrentWeatherData : function(city, country){
						var deferred = $q.defer();
            var requestURI = currentWeatherURI.replace('{city}',city).replace('{country}',country);
						var httpPromise = $http.get(requestURI);
						httpPromise.then(function(response){
							deferred.resolve(weatherDataParser(response.data));
						},function(error){
							deferred.reject(error.data);
						});
						return deferred.promise;
					},
          /*Rest service to fetch Forecast weather data*/
          fetchForecastWeatherData : function(city, country){
            var deferred = $q.defer();
            var requestURI = forecastWeatherURI.replace('{city}',city).replace('{country}',country);
            var httpPromise = $http.get(requestURI);
            httpPromise.then(function(response){
              deferred.resolve(forecastWeatherDataParser(response.data));
            },function(error){
              deferred.reject(error.data);
            });
            return deferred.promise;
          }
			};
		});

    /*Adapter function to convert raw data from the API to UI usable data */
function weatherDataParser(rawLocationData) {
  var data = {};
  data['timestamp'] = rawLocationData.dt;
  data['condition'] = rawLocationData.weather[0].description;
  data['temp'] = {
    average : rawLocationData.main.temp,
    temp_min: rawLocationData.main.temp_min,
    temp_max: rawLocationData.main.temp_max
  };
  data['wind'] = rawLocationData.wind;
  data['details'] = rawLocationData;
  data['iconURI'] = weatherIconURI+rawLocationData.weather[0].icon;
  data['forecast'] = [];
  return data;
}

/*Adapter function to convert raw data from the API to UI usable data */
function forecastWeatherDataParser(rawLocationData) {
  var data = {
    hourly : [],
    daily: []
  };
  var forecastdata = rawLocationData.list;
  var dailyDataMap = {};
  angular.forEach(forecastdata,function(datum){
    var parsedData = weatherDataParser(datum);
    var dataString = datum.dt_txt.substring(0,10);
    if (dailyDataMap[dataString]) {
      dailyDataMap[dataString] = getAverageWeatherValues(dailyDataMap[dataString],parsedData);
    }else {
      dailyDataMap[dataString] = parsedData;
    }
    data.hourly.push(weatherDataParser(datum));
  });
  angular.forEach(dailyDataMap, function(value, key){
    data.daily.push(value);
  });
  return data;
}

/*Utility Function for averaging*/
function getAverageWeatherValues(value1, value2) {
  value1.temp.average =  (value1.temp.average + value2.temp.average) / 2;
  value1.temp.temp_min =  (value1.temp.temp_min + value2.temp.temp_min) / 2;
  value1.temp.temp_max =  (value1.temp.temp_max + value2.temp.temp_max) / 2;
  value1.wind.speed = (value1.wind.speed + value2.wind.speed) / 2;
  return value1;
}
