var show_everything = function(buildings){


var places_list = document.querySelector('[id=places_list]')

buildings.forEach(function(building) {
  building.element = document.createElement('div')
  building.element.textContent = building.name
  building.places.forEach(function(place){
    place.element = document.createElement('div')
    place.element.textContent = place.name
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
  var buildings = JSON.parse(request.textContent)
  show_everything(buildings)
})


