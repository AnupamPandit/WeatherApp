WeatherApp

This simple weather app shows the current and forecasted weather for 5 europen cities
1) London
2) Paris
3) Barcelona
4) Oslo
5) Budapest

-- Page Sections
  The page is divided into two sections. The top header and the weather widget list section.
  - Top Header
    - The header section has a search bar for looking up the weather for a particular city.
    - It also has a Temperature Scale toggle button for Celsius and Fahrenheit.
    - It also has a Auto Refresh button to toggle auto refresh on and off.
  - Weather widget
    - This widget show the weather info for a particular location.
    - The top bar has City and Country name followed by current weather condition and time.
    - The bottom section is shows Temperature, Wind and Astro reading for the location.
    - The footer has a button for viewing the weather forecast.
      - On click of the View forecast the user can see the forecast values for the next 5 days.
      - The section has two tabs. The first showing hourly values and second showing daily values.



-- Project Structure
  - script
    - *.action.js: This file houses the angular service for rest calls and data manipulation.
    - *.renderers.js: This file houses the angular module and angular controllers used in the page.
    - *.constants.js: Page level constants and defaults.
  - style
    - *.css: Style file used on the app
  - ngtemplates
    - This folder houses all the html templates used in the app.
      - locationWeatherCard.html : The main template for the weather widget directive
      - weatherForecastCard.html : Nested template used for showing forecasted data.
      - temperatureDataCard/windDataCard.html/astroDataCard.html : Show weather parameters.
      - weatherAppHeaderCard.html : Top header section includes search bar and buttons.
  - Libraries/Plugins
    - Angularjs 1.5.11
    - bootstrap 3.3.7
    - Angular bootstrap UI 2.5.0
