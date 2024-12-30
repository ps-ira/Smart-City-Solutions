const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const sustainabilityProjects = [
    { name: "Solar Farm", lat: 51.51, lng: -0.1 },
    { name: "Wind Turbines", lat: 51.49, lng: -0.08 },
    { name: "Recycling Center", lat: 51.505, lng: -0.11 }
];

const transportationHubs = [
    { name: "Central Station", lat: 51.52, lng: -0.09 },
    { name: "Bus Depot", lat: 51.48, lng: -0.07 },
    { name: "Bike Sharing Hub", lat: 51.5, lng: -0.12 }
];

const techZones = [
    { name: "Innovation Lab", lat: 51.515, lng: -0.105 },
    { name: "Smart Grid Control", lat: 51.495, lng: -0.085 },
    { name: "IoT Testing Ground", lat: 51.51, lng: -0.095 }
];

function addMarkers(data, iconUrl) {
    const markers = L.layerGroup();
    const icon = L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    data.forEach(item => {
        L.marker([item.lat, item.lng], { icon: icon })
            .bindPopup(item.name)
            .addTo(markers);
    });

    return markers;
}

const sustainabilityLayer = addMarkers(sustainabilityProjects, 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png');
const transportationLayer = addMarkers(transportationHubs, 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png');
const techLayer = addMarkers(techZones, 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png');

document.getElementById('show-sustainability').addEventListener('click', () => {
    map.removeLayer(transportationLayer);
    map.removeLayer(techLayer);
    sustainabilityLayer.addTo(map);
});

document.getElementById('show-transportation').addEventListener('click', () => {
    map.removeLayer(sustainabilityLayer);
    map.removeLayer(techLayer);
    transportationLayer.addTo(map);
});

document.getElementById('show-technology').addEventListener('click', () => {
    map.removeLayer(sustainabilityLayer);
    map.removeLayer(transportationLayer);
    techLayer.addTo(map);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const featureHighlights = document.querySelectorAll('.feature-highlight');
featureHighlights.forEach(highlight => {
    highlight.addEventListener('mouseenter', () => {
        highlight.style.transform = 'scale(1.05)';
        highlight.style.transition = 'transform 0.3s ease-in-out';
    });
    highlight.addEventListener('mouseleave', () => {
        highlight.style.transform = 'scale(1)';
    });
});
