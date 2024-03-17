document.addEventListener('DOMContentLoaded', function() {
    maptilersdk.config.apiKey = 'vjTGB9AS7ixmVPTofWEZ';
    const map = new maptilersdk.Map({
      container: 'map',
      style: "streets-v2",
      center: [-89.33278, 31.32944],
      zoom: 16,
    });
  
    const locations = [
      {coords: [-89.33278, 31.32944], name: "Thad Cochran Center"},
      {coords: [-89.33358, 31.32870], name: "Walker Science Building"},
    ];
    
    locations.forEach(location => {
      const marker = new maptilersdk.Marker()
        .setLngLat(location.coords)
        .addTo(map);
      
      marker.getElement().addEventListener('click', function() {
        const infoContainer = document.querySelector('.info-container');
        infoContainer.textContent = `Location: ${location.name}`;
        const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.coords[1]},${location.coords[0]}`;
        window.open(navigationUrl, '_blank');
      });
    });
  });
  