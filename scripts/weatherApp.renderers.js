var app = angular.module('euroWeatherApp', ['ui.bootstrap']);

/*Main Controller*/
app.controller('appController', function($scope, $interval, $filter, weatherService) {
	var vm = this;
  /*Static Path Definitions */
  vm.imagePath = 'resources/images/';
	vm.templatePath = 'ngtemplates/';
  /*Default Map Definitions*/
  vm.defaultWeatherWidgetConfiguration = defaultWeatherWidgetConfiguration;
  vm.temperatureScale = defaultWeatherWidgetConfiguration.temperatureScale;
  vm.locations = defaultWeatherTrackLocations;
  vm.currentWeatherMap = locationWiseCurrentWeatherDataMap;
  vm.citySearchString = '';
  vm.autoRefresh = 1;

  /*On load function*/
  this.onPageLoad=function(){
    getCurrentWeatherDataForAllLocations();
	};

  function getCurrentWeatherDataForAllLocations() {
    angular.forEach(vm.locations,function(location){
      vm.getCurrentWeatherData(location.city_code, location.country_code);
    });
  }

  /*Fetch Current Weather data for city and country and populate UI maps*/
  this.getCurrentWeatherData = function(city,country){
    weatherService.fetchCurrentWeatherData(city, country).then(function(response) {
      vm.currentWeatherMap[city] = response;
		}, function(error) {
      console.info('Error');
		});
  };
  /*Fetch Forecast Weather data for city and country and populate UI maps*/
  this.getForecastWeatherData = function(city,country){
    weatherService.fetchForecastWeatherData(city, country).then(function(response) {
      vm.currentWeatherMap[city]['forecast'] = response;
    }, function(error) {
      console.info('Error');
    });
  };

  /*Temperature conversion functions*/
  this.convertTemperatures = function(temp, scale) {
      return temperatureScales[scale].converter(temp) + ' ' + temperatureScales[scale].unit;
  };

  /*Used in the Typeahead widget on top of the page*/
  this.getMatchingCity = function(){
    if (vm.citySearchString === '')
      vm.locations = defaultWeatherTrackLocations;
    else{
      var locations = [];
      angular.forEach(defaultWeatherTrackLocations,function(location){
        if(location.city_name.toLowerCase().indexOf(vm.citySearchString.toLowerCase()) >=0)
          locations.push(location);
      });
      vm.locations = locations;
    }
  };

  /*Refreshes the current weather info based on configurable interval*/
  this.autoUpdate = function () {
    $scope.timer = $interval(function () {
        getCurrentWeatherDataForAllLocations();
    }, autoRefreshInterval);
  };

  /*Stop Auto refresh*/
  this.stopAutoRefresh = function () {
    if (angular.isDefined($scope.timer)) {
        $interval.cancel($scope.timer);
    }
  };

  this.toggleAutoRefresh = function() {
    if (autoRefresh == 1)
      vm.autoUpdate();
    else
      vm.stopAutoRefresh();
  }
  vm.autoUpdate();
});

/*This directive houses all the weather information for a particular location*/
app.directive('weatherWidget', ['$window', '$timeout',
  function($window, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        configuration:'=',
        locationData: '=',
        locationWeatherData: '=',
        locationForecastWeatherData: '=',
        refreshCurrentWeather: '&',
        getForecastWeatherDetails: '&'
      },
       templateUrl: 'ngtemplates/locationWeatherCard.html',
      link: function(scope, ele, attrs) {
          scope.showForecast = false;
          $window.onresize = function() {
            scope.$apply();
          };
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.locationWeatherData);
          });
          scope.$watch('locationWeatherData', function(newData) {
            scope.render(newData);
          }, true);

          scope.render = function(locationWeatherData) {
            scope.city = scope.locationData.city_name;
            scope.country = scope.locationData.country_name;
            scope.weatherData = locationWeatherData;
          }
          scope.convertTemperatures = function(temp, scale) {
              if (!scale)
                scale = scope.configuration.temperatureScale;
              return temperatureScales[scale].converter(temp).toFixed(2) + ' ' + temperatureScales[scale].unit;
          };
          scope.windSpeed = function(windSpeed) {
            if(!windSpeed) return;
            return windSpeed.toFixed(2) + ' m/s';
          };
          scope.showForecastWeatherDetails = function() {
            scope.showForecast = !scope.showForecast;
            if (scope.showForecast)
              scope.getForecastWeatherDetails();
          }

      }
  };
}]);
