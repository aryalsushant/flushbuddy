document.addEventListener('DOMContentLoaded', function() {
    maptilersdk.config.apiKey = 'vjTGB9AS7ixmVPTofWEZ';
    const map = new maptilersdk.Map({
        container: 'map', // container's id or the HTML element to render the map
        style: "streets-v2",
        center: [-89.33278, 31.32944], // starting position [lng, lat]
        zoom: 16, // starting zoom
    });

    const locations = [
        {coords: [-89.33278, 31.32944], name: "Thad Cochran Center"},
        {coords: [-89.33358, 31.32870], name: "Walker Science Building"},
        // Add more locations here with the format {coords: [longitude, latitude], name: "Location Name"}
    ];
    
    locations.forEach(location => {
        const marker = new maptilersdk.Marker()
            .setLngLat(location.coords)
            .addTo(map);
        
        marker.getElement().addEventListener('click', function() {
            const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.coords[1]},${location.coords[0]}`;
            window.open(navigationUrl, '_blank');
        });
    });
});
