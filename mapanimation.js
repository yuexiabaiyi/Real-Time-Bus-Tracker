
mapboxgl.accessToken = '***';

var markers = [];
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});

async function run() {
  const locations = await getBusLocations();
  console.log(locations);
	locations.forEach(function(bus){
		var marker = getMarker(bus.id);		
		if (marker){
			moveMarker(marker, bus);
		}
		else{
			addMarker(bus);		
		}

	});

	console.log(new Date());
  setTimeout(run, 15000);
}

async function getBusLocations() {
  const url ='https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';	
	const response = await fetch(url);
	const json = await response.json();
	return json.data;
}

function addMarker(bus){
	const el = document.createElement('div');
	el.className = 'marker';
	var marker = new mapboxgl.Marker(el);
  marker.setLngLat([bus.attributes.longitude, bus.attributes.latitude]);
  marker.map = map;
  marker.id = bus.id;
  marker.addTo(map);
	markers.push(marker);
}

function moveMarker(marker,bus) {
	// move icon 
    marker.setLngLat([bus.attributes.longitude, bus.attributes.latitude]);
}

function getMarker(id){
	var marker = markers.find(function(item){
		return item.id === id;
	});
	return marker;
}