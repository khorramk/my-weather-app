//final call
function clouds(ws){
  if (ws == 'Clouds'){
    document.body.setAttribute('background', 'http://res.cloudinary.com/dgfv6mqdf/image/upload/v1517089195/clouds-cloudporn-weather-lookup-158163_ddqtkw.jpg')
  }else if(ws == 'mist'){
    document.body.setAttribute('background', 'http://res.cloudinary.com/dgfv6mqdf/image/upload/v1517088534/amidst-the-mist-forest-plain_r3g1eo.jpg')
  }else{
    document.body.setAttribute('background', 'http://res.cloudinary.com/dgfv6mqdf/image/upload/v1517088958/maxresdefault_qxcufq.jpg');
  }
  
}
function picshow(pic, town, land){
      var picture = document.createElement('img');
      document.body.appendChild(picture);
      var attr = picture.setAttribute('src', pic);
      var name = document.createElement('h3');
      document.body.appendChild(name);
      name.innerHTML = town;
      var countryName = document.createElement('h3');
      document.body.appendChild(countryName);
      countryName.innerHTML = land;
}
function showDom(tempC, tempF, pic, town, land){
   //present it to dom using jquery
   //create elements
   var button = document.createElement('button');
   var div = document.createElement('div');
   //use click to change and present tempc
   document.body.appendChild(div);
  document.body.appendChild(button);
   button.innerHTML = 'change to farenheight';
   div.innerHTML = tempC+'&#8451;';
  //add eventlistener to know when clicked
  button.addEventListener('click', function(){
    //check the state of the buttton
      if(button.innerHTML == 'change to celcius'){
        button.innerHTML = 'change to farenhieght';
        div.innerHTML = tempC+'&#8451;';

      }else{
        button.innerHTML = 'change to celcius';
        div.innerHTML = tempF+'&#8457;';
      }
  }, false)
   //pass pic town land on different function
  picshow(pic, town, land);

}
function getTemprature(obj){
  //tempreture:: obj -> convert info, transfer it to showDom
  //store in variable
  var tempC = obj.main.temp_max;
  let tempcon = (tempC * 1.8) + 32;
  let tempF = Math.round(tempcon);
  let pic = obj.weather[0].icon;
  let town = obj.name;
  let land = obj.sys.country;
  let weatherState = obj.weather[0].main;
  //pass this variable as parameter into showDom
  showDom(tempC, tempF, pic, town, land);
  clouds(weatherState);
  
}
//call this 1st
function getLocation(){
    //location::  -> number
  //uses navigator object to find the user position and coordinates
  //then coordinates is used to find the longtitude
  if(navigator.geolocation){
      //calling getcurrent position method to get users position
      //a callback is created to campture the information or object of the users
      navigator.geolocation.getCurrentPosition(showPosition);
  }

}
//call this 2nd
function showPosition(o){
  //position:: obj -> send it to weatherInfo()
  //sends position info to weatherInfo
  var lat = 'lat='+o.coords.latitude;
  var lon = 'lon='+o.coords.longitude;
weatherInfo(lat, lon);

}
//call this third
function weatherInfo(lat, lon){
  //getweather info:: obj - > send info to temprature function
  //after making request
  const api = 'https://fcc-weather-api.glitch.me/api/current?';
  $.get(api+lat+'&'+lon, function(info){
    console.log(info);
    getTemprature(info);
  });



}

$(document).ready(function(){
  getLocation();
});
