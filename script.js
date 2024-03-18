document.addEventListener('DOMContentLoaded', function() {
  maptilersdk.config.apiKey = 'vjTGB9AS7ixmVPTofWEZ';
  const map = new maptilersdk.Map({
    container: 'map',
    style: "streets-v2",
    center: [-89.33278, 31.32944],
    zoom: 16,
  });

  const locations = [
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
  ];
  
  locations.forEach(location => {
    const marker = new maptilersdk.Marker()
      .setLngLat(location.coords)
      .addTo(map);
    
    marker.getElement().addEventListener('click', function() {
      document.getElementById('name').textContent = `Name: ${location.name}`;
      document.getElementById('distance').textContent = `Distance: ${location.distance}`;
      document.getElementById('accessibility').textContent = `Accessibility Rating: ${location.accessibility}`;
      document.getElementById('cleanliness').textContent = `Cleanliness Rating: ${location.cleanliness}`;
      document.getElementById('capacity').textContent = `Capacity Rating: ${location.capacity}`;

      // Opening the Google Maps navigation URL in a new tab
      const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.coords[1]},${location.coords[0]}`;
      window.open(navigationUrl, '_blank');
    });
  });
});
