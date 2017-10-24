/*Application Constants and defaults*/
var dateFormat = "MMM dd, yyyy";
var dateTimeFormat = "medium";
var autoRefreshInterval = 600000;
var defaultWeatherWidgetConfiguration = {
  temperatureScale : 'CELSIUS',
  showDetailsSection : false,
  dateFormat : dateFormat,
  dateTimeFormat : dateTimeFormat
};
var defaultWeatherTrackLocations = [
  {
    city_code: 'london',
    country_code:'uk',
    city_name: 'London',
    country_name: 'United Kingdom'
  },
  {
    city_code: 'paris',
    country_code:'fr',
    city_name: 'Paris',
    country_name: 'France'
  },
  {
    city_code: 'Barcelona',
    country_code:'ES',
    city_name: 'Barcelona',
    country_name: 'Spain'
  },
  {
    city_code: 'Oslo',
    country_code:'NO',
    city_name: 'Oslo',
    country_name: 'Norway'
  },
  {
    city_code: 'Budapest',
    country_code:'HU',
    city_name: 'Budapest',
    country_name: 'Hungary'
  },
];

var defaultLocationWeatherData = {
  averageTemp : 0,
  wind : 0
};

var locationWiseCurrentWeatherDataMap = {};
var locationWiseForecastWeatherDataMap = {};
var weatherIconURI = 'http://openweathermap.org/img/w/';
var temperatureScales = {
  KELVIN: {
    description : 'Kelvin',
    unit: 'K',
    converter : function(tempInKelvin) {
        return tempInKelvin
    }
  },
  CELSIUS:{
    description : 'Celsius',
    unit: 'C',
    converter : function(tempInKelvin) {
        return tempInKelvin - 273.15;
    }
  },
  FAHRENHEIT:{
    description : 'Fahrenheit',
    unit: 'F',
    converter : function(tempInKelvin) {
        return (tempInKelvin - 273.15) * 9/5 + 32;
    }
  }
}
