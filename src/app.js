import $ from 'jQuery';
import { sortByDistance } from './lib/distance';
import './scss/style.scss';

const APPID = '8a7fb03d61c68d95d9aeb6f64d8bb8bc';
const path = 'http://api.openweathermap.org/data/2.5/weather';
const stores = [
  { name: 'Cambridge Naturals', x: -71.1189, y: 42.3895 },
  { name: "Sarah's Market", x: -71.1311, y: 42.3823 },
  { name: 'Whole Foods Fresh Pond', x: -71.142, y: 42.3904 },
];

async function success(position) {
  const { latitude, longitude } = position.coords;
  const url = new URL(path);
  // console.log(url);
  const params = { lat: latitude, lon: longitude, APPID };
  url.search = new URLSearchParams(params).toString();
  const ftch = await fetch(url);
  const data = await ftch.json();
  const locat = `${data.sys.country}, ${data.name}`;
  $('#location').html(locat);
  console.log(data);
}

function error(err) {
  console.log(err);
}
const here = { name: 'You are here', x: -71.147, y: 42.3834 };
const nearest = sortByDistance(here, stores)[0];
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  console.error('Access Denided');
}

// import('jquery').then((jquery) => {
//    window.jQuery = jquery;
//    window.$ = jquery;
//    $("#nearest-store").html(nearest.name);
// });

$('#nearest-store').html(nearest.name);
// document.getElementById("nearest-store").innerHTML = nearest.name;
