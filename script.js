document.addEventListener('DOMContentLoaded', function() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ5YWxzdXNoYW50IiwiYSI6ImNsdTR6enR4NDFveHMycnBwbXp3NzRxaWQifQ.6o_xu90CG6KI9sMAiclV9w';

  const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-89.33278, 31.32944],
      zoom: 16,
  });

  //might delete later
  map.addControl(new mapboxgl.NavigationControl());

  const locations = [
      // locations array
      {
        coords: [-89.33278, 31.32944], 
        name: "Thad Cochran Center", 
        distance: "0.5 miles", 
        accessibility: "8/10", 
        cleanliness: "9/10", 
        capacity: "7/10"
      },
  
      {
        coords: [-89.333483944629, 31.329238728063725], 
        name: "Walker Science Building", 
        distance: "0.8 miles", 
        accessibility: "7/10", 
        cleanliness: "8/10", 
        capacity: "5/10"
      },
  
      {
        coords: [-89.33677734888524, 31.330714976717108], 
        name: "Payne Center", 
        distance: "0.6 miles", 
        accessibility: "7/10", 
        cleanliness: "8/10", 
        capacity: "5/10"
      },
  
      {
        coords: [-89.33083857772077, 31.32630535911501], 
        name: "McLemore Hall", 
        distance: "0.3 miles", 
        accessibility: "7/10", 
        cleanliness: "8/10", 
        capacity: "5/10"
      },
  
      {
        coords: [-89.33427791820249, 31.327582620569032], 
        name: "Cook Library", 
        distance: "1 miles", 
        accessibility: "7/10", 
        cleanliness: "8/10", 
        capacity: "5/10"
      },
  
      {
        coords: [-89.33431450157403, 31.32922459731702], 
        name: "Johnson Science Tower", 
        distance: "0.5 miles", 
        accessibility: "5/10", 
        cleanliness: "7/10", 
        capacity: "5/10"
      },
  
      {
        coords: [-89.33491082334419, 31.327942799836975], 
        name: "Owings-McQuagge Hall", 
        distance: "0.5 miles", 
        accessibility: "5/10", 
        cleanliness: "7/10", 
        capacity: "5/10"
      },
  
      {
        coords: [-89.3358386917369, 31.327431326700196], 
        name: "Joseph Greene Hall", 
        distance: "1.2 miles", 
        accessibility: "9/10", 
        cleanliness: "9/10", 
        capacity: "6/10"
      },
  
      {
        coords: [-89.33411591523232, 31.328189148315296,], 
        name: "Scianna Hall", 
        distance: "0.2 miles", 
        accessibility: "8/10", 
        cleanliness: "9/10", 
        capacity: "8/10"
      },
  
      {
        coords: [-89.32961419869852, 31.330198447668852], 
        name: "Southern Wings", 
        distance: "0.3 miles", 
        accessibility: "6/10", 
        cleanliness: "9/10", 
        capacity: "5/10"
      },
  
      {
        coords: [-89.33126278617101, 31.3266440857949], 
        name: "Kennard Washington Hall", 
        distance: "0.3 miles", 
        accessibility: "6/10", 
        cleanliness: "9/10", 
        capacity: "5/10"
      },
  
      {
        coords: [-89.33179805896903, 31.326162212500215], 
        name: "Southern Hall", 
        distance: "0.3 miles", 
        accessibility: "6/10", 
        cleanliness: "9/10", 
        capacity: "5/10"
      },
  
      {
        coords: [-89.33633047418918,31.327832083647], 
        name: "International Center", 
        distance: "0.3 miles", 
        accessibility: "6/10", 
        cleanliness: "9/10", 
        capacity: "5/10"
      },
  
      {
        coords: [-89.33787516142013, 31.327102838751838], 
        name: "Harkins Hall", 
        distance: "0.3 miles", 
        accessibility: "6/10", 
        cleanliness: "9/10", 
        capacity: "5/10"
      },
  
      {
        coords: [-89.33812473627977, 31.328342154513376], 
        name: "Asbury Hall", 
        distance: "0.3 miles", 
        accessibility: "6/10", 
        cleanliness: "9/10", 
        capacity: "5/10"
      },

  ];

  // Function to draw a route on the map
  function drawRoute(map, coordinates) {
      // Check if a route is already loaded
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
              'line-color': '#888',
              'line-width': 8,
          },
      });
  }

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

                  // Fetch the route using Mapbox Directions API
                  fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${origin.join(',')};${destination.join(',')}?geometries=geojson&access_token=${mapboxgl.accessToken}`, {
                      method: 'GET'
                  }).then(response => response.json()).then(data => {
                      const route = data.routes[0].geometry.coordinates;
                      drawRoute(map, route);
                  });
              }, (error) => {
                  console.error('Geolocation error:', error);
              });

              // Update info boxes with location details
              document.getElementById('name').textContent = `Name: ${location.name}`;
              document.getElementById('distance').textContent = `Distance: ${location.distance}`;
              document.getElementById('accessibility').textContent = `Accessibility Rating: ${location.accessibility}`;
              document.getElementById('cleanliness').textContent = `Cleanliness Rating: ${location.cleanliness}`;
              document.getElementById('capacity').textContent = `Capacity Rating: ${location.capacity}`;
          });
  });
});
