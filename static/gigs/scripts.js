function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      alert("Geolocation is not supported by this browser.");
    }
}
let lt = "";
let long = "";

function showPosition(position) {
   lt = position.coords.latitude;
   long = position.coords.longitude;
   console.log(lt + "," +long);
   drawMap();
  }


var mymap = L.map('map', {zoomControl: false}).setView([13.0822189,77.5606381], 16);
L.tileLayer('https://api.mapbox.com/styles/v1/jeffeverhart383/cjgo34i5100202srogwdfs2mn/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVmZmV2ZXJoYXJ0MzgzIiwiYSI6IjIwNzVlOTA3ODI2MTY0MjM3OTgxMTJlODgzNjg5MzM4In0.QA1GsfWZccIB8u0FbhJmRg', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 25,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiamVmZmV2ZXJoYXJ0MzgzIiwiYSI6ImNqOXI2aDg5ejZhYncyd3M0bHd6cWYxc2oifQ.fzcb7maGkQhAxRZTotB4tg'
}).addTo(mymap);


var warblerWaypoints = [
    {title: "Richmond",
        id: 1,
     location:  {
         lat: 13.0822189,
         lng: 77.5606381 
     }
    },
    {title: "Alabama",
    id: 2,
     location:  {
         lat: 13.060654595662994, 
         lng: 77.58949072195264
     }
    },
    {title: "Mexico",
    id: 3,
     location:  {
         lat: 19.432608,
         lng: -99.133209
     }
    },
    {title: "Panama",
    id: 4,
     location:  {
         lat: 8.983333,
         lng: -79.516670
     }
    },
]
mymap.scrollWheelZoom.disable()

warblerWaypoints.forEach(waypoint => {
    //let marker = L.marker([waypoint.location.lat, waypoint.location.lng ]).addTo(mymap)
})

let latlngs = warblerWaypoints.map(waypoint => [waypoint.location.lat, waypoint.location.lng]);
var polyline = L.polyline(latlngs, {smoothFactor: 4, color: 'orange', weight: 20, opacity: .5}).addTo(mymap);
var polyline = L.polyline(latlngs, {color: 'red', dashArray: '12 12',}).addTo(mymap);
// instantiate the scrollama
const scroller = scrollama();
// setup the instance, pass callback functions
scroller
  .setup({
    step: '.step' // required - class name of trigger steps
  })
  .onStepEnter(handleStepEnter)
  .onStepExit(handleStepExit);

function handleFlyTo(value){
    mymap.panTo(warblerWaypoints[value - 1].location, {animate:true, duration: 6})
}

function handleStepEnter(e){
    console.log('enter')
    let value = e.element.attributes['data-step'].value
    handleFlyTo(value)

}

function handleStepExit(e){
    console.log('exit')
    console.log(e)
}
