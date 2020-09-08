import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

   function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature is ${Math.round(response.main.temp * (9/5) - 459.67)} degrees.`);
      $('.feelsLike').text(`The temperature feels like ${Math.round(response.main.feels_like * (9/5) - 459.67)} degrees.`);
      $('.windSpeed').text(`The wind is ${response.wind.speed} mph.`);
      $('.description').text(`The weather is `+ response.weather[0].main + `.`);
    }
  });

  $('#weatherZipcode').click(function () {
    const zipCode = $('#zipcode').val();
    $('#zipcode').val('');

    let request = new XMLHttpRequest();

    const urlZip = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", urlZip, true);
    request.send();

   function getElements(response) {
      $('.showHumidity').text(`The humidity in ${zipCode} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature is ${Math.round(response.main.temp * (9/5) - 459.67)} degrees.`);
      $('.feelsLike').text(`The temperature feels like ${Math.round(response.main.feels_like * (9/5) - 459.67)} degrees.`);
      $('.windSpeed').text(`The wind is ${response.wind.speed} mph.`);
      $('.description').text(`The weather is `+ response.weather[0].main + `.`);
    }
  
  })
});
// T(°F) = T(K) × 9/5 - 459.67
// let Farenheight =(`(${response.main.temp} * (9/5)) - 459.67`)