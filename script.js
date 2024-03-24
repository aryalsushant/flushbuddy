document.addEventListener('DOMContentLoaded', function() {
  maptilersdk.config.apiKey = 'vjTGB9AS7ixmVPTofWEZ';
  const map = new maptilersdk.Map({
      container: 'map',
      style: "streets-v2",
      center: [-89.33278, 31.32944],
      zoom: 16,
  });

  const locations = [
      // all location markers here
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

  locations.forEach(location => {
      const marker = new maptilersdk.Marker()
          .setLngLat(location.coords)
          .addTo(map);

      marker.getElement().addEventListener('click', function() {
          navigator.geolocation.getCurrentPosition(function(position) {
              const userCoords = [position.coords.longitude, position.coords.latitude];
              const destinationCoords = location.coords;

              fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${userCoords.join(',')};${destinationCoords.join(',')}?geometries=geojson&access_token=pk.eyJ1IjoiYXJ5YWxzdXNoYW50IiwiYSI6ImNsdTUwM2V5ejFydjUycm0yb2xhd3JkaHMifQ.9fSL1AAVoopecHxpjof2Vw`)
                  .then(response => response.json())
                  .then(data => {
                      const route = data.routes[0].geometry;

                      if (map.getSource('route')) {
                          map.getSource('route').setData(route);
                      } else {
                          map.addLayer({
                              id: 'route',
                              type: 'line',
                              source: {
                                  type: 'geojson',
                                  data: route
                              },
                              layout: {
                                  'line-join': 'round',
                                  'line-cap': 'round'
                              },
                              paint: {
                                  'line-color': '#888',
                                  'line-width': 8
                              }
                          });
                      }

                      document.getElementById('name').textContent = `Name: ${location.name}`;
                      document.getElementById('distance').textContent = `Distance: ${location.distance}`;
                      document.getElementById('accessibility').textContent = `Accessibility Rating: ${location.accessibility}`;
                      document.getElementById('cleanliness').textContent = `Cleanliness Rating: ${location.cleanliness}`;
                      document.getElementById('capacity').textContent = `Capacity Rating: ${location.capacity}`;
                  })
                  .catch(error => console.error("Fetching directions failed:", error));
          }, function(error) {
              console.error("Geolocation error:", error);
          });
      });
  });
  });

////might delete later
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('Latitude:', position.coords.latitude, 'Longitude:', position.coords.longitude);
    },
    (error) => {
      console.error('Geolocation error:', error);
    }
  );
  