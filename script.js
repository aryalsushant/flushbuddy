document.addEventListener('DOMContentLoaded', function() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ5YWxzdXNoYW50IiwiYSI6ImNsdTR6enR4NDFveHMycnBwbXp3NzRxaWQifQ.6o_xu90CG6KI9sMAiclV9w';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-89.33278, 31.32944],
    zoom: 16,
  });

  map.addControl(new mapboxgl.NavigationControl());

  // Real-time user location marker setup
  let userLocationMarker = null;
  function updateUserLocationMarker(lngLat) {
    if (userLocationMarker) {
      userLocationMarker.setLngLat(lngLat);
    } else {
      userLocationMarker = new mapboxgl.Marker({ 'color': '#304FFE' }) // Blue arrow marker
        .setLngLat(lngLat)
        .addTo(map);
    }
  }

  // Watch user's location in real-time
  navigator.geolocation.watchPosition(position => {
    const userLocation = [position.coords.longitude, position.coords.latitude];
    updateUserLocationMarker(userLocation);
    map.setCenter(userLocation);
  }, error => console.error('Geolocation error:', error), {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });

  // Since locations are defined in another file, we assume they are already loaded
  locations.forEach(location => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker(el)
      .setLngLat(location.coords)
      .addTo(map)
      .getElement().addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(position => {
          const origin = [position.coords.longitude, position.coords.latitude];
          const destination = location.coords;

          // Fetch and draw the route
          fetchRouteAndDraw(origin, destination);

          // Update info boxes with location details
          document.getElementById('name').textContent = `Name: ${location.name}`;
          document.getElementById('distance').textContent = `Distance: ${location.distance}`;
          document.getElementById('accessibility').textContent = `Accessibility Rating: ${location.accessibility}`;
          document.getElementById('cleanliness').textContent = `Cleanliness Rating: ${location.cleanliness}`;
          document.getElementById('capacity').textContent = `Capacity Rating: ${location.capacity}`;
        }, error => console.error('Geolocation error:', error), {
          enableHighAccuracy: true
        });
      });
  });

  function fetchRouteAndDraw(origin, destination) {
    fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${origin.join(',')};${destination.join(',')}?geometries=geojson&access_token=${mapboxgl.accessToken}`, {
      method: 'GET'
    }).then(response => response.json()).then(data => {
      const route = data.routes[0].geometry.coordinates;
      drawRoute(map, route);
    });
  }

  function drawRoute(map, coordinates) {
    if (map.getSource('route')) {
      map.removeLayer('route');
      map.removeSource('route');
    }

    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates,
        },
      },
    });

    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#FFD600', // Use a bright color for the route line
        'line-width': 6,
      },
    });
  }
});
