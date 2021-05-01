/* Initialize map */
var map = L.map('mymap').setView([57.316765, -4.439588],11);

/* Open Street Map Tile Layer */
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// function onEachFeature(feature, layer) {
//     // does this feature have a property named description?
//     if (feature.properties && feature.properties.description) {
//         layer.bindPopup(feature.properties.description);
//     }
// }

// L.geoJSON(pointsData, {
//     onEachFeature: onEachFeature
// }).addTo(map);