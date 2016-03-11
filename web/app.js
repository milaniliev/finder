var show_everything = function(buildings){
  var places_list = document.querySelector('[id=places_list]')

  buildings.forEach(function(building) {
    building.element = document.createElement('div')
    building.element.innerHTML = `
      ${building.name} <button name="edit">+</button>
    `
    building.element.querySelector('button[name=edit]').addEventListener('click', function(event){
      building.element.classList.toggle('expanded')
    })
    building.places.forEach(function(place){
      place.resources = place.resources || []
      place.element = document.createElement('div')
     
      place.element.innerHTML = `
        <input name="name" placeholder="Name" />
        <input name="resources" placeholder="Resources and Resources"/>
        <input name="directions" placeholder="Directions"/>
        <hr/>
      `
      place.name_field = place.element.querySelector('[name=name]')
      place.resources_field = place.element.querySelector('[name=resources]')
      place.directions_field = place.element.querySelector('[name=directions]')
      
      place.name_field.value = place.name
      place.resources_field.value = place.resources.join(", ")
      place.directions_field = place.directions
      
      place.element.classList.add('place')

      building.element.appendChild(place.element)
    })
    
    building.element.classList.add('building')
    places_list.appendChild(building.element)
  })

  var search_field = document.querySelector("[id=search_field]")

  search_field.addEventListener('keyup', function(){
    buildings.forEach(function(building){
      var building_name_matches = building.name.match(new RegExp(search_field.value, 'i'))
      var place_matched = false
      
      building.places.forEach(function(place){
        var place_name_matches = place.name.match(new RegExp(search_field.value, 'i'))
        if(place_name_matches)
        {
          place_matched = true
          place.element.style.display = ''
        }
        else
          {
            place.element.style.display = 'none'
          }
      })
      
      if(building_name_matches || place_matched){
        building.element.style.display = ''
      } else {
        building.element.style.display = 'none'
      }
    })
  })
}


var request = new XMLHttpRequest()

request.open('GET', 'buildings.json')
request.send()

request.addEventListener('load', function(){
  var buildings = JSON.parse(request.responseText)
  show_everything(buildings)
})

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7133515, lng: -73.59963929999999},
    zoom: 18,
    styles: [
        {
          "featureType": "poi.school",
          "stylers": [
            { "hue": "#aaff00" },
            { "lightness": -19 }
          ]
        }
    ]
  });
}

var user_location;
navigator.geolocation.getCurrentPosition(function(position){
  var marker = new google.maps.Marker({
    position: {lat: position.coords.latitude, lng: position.coords.longitude},
    animation: google.maps.Animation.DROP,
    map: map,
    icon: 'me.png',
    title: 'You are here.'
  });
});


