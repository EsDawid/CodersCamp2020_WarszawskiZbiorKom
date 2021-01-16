import busStopIconUrl from '../img/bus-stop.png';
import vehicleIconUrl from '../img/bus.png';

export class Map {

    initializeMap(){
        const L = require('leaflet');
        const map = L.map('map').setView([52.2297700, 21.0117800], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        return map;
    }

    addBusStopMarker(map, busStop, listOfLines){ 
        const busStopIcon = L.icon({iconUrl: busStopIconUrl, iconSize: [32, 32]});
        let busStopMarker;

        if(busStop.lat && busStop.lng != "null"){
            busStopMarker = new L.marker([busStop.lat,busStop.lng], {icon: busStopIcon})
            .addTo(map)
            .bindPopup(`${busStop.name} ${busStop.number} <br> Lines: ${listOfLines}`)
            .openPopup();
        }
        return busStopMarker;
    };

    addVehicleMarker(map, vehicles){
        const vehicleIcon = L.icon({iconUrl: vehicleIconUrl, iconSize: [24, 24]});
        let vehicleMarkers = [];
        vehicles.forEach(vehicle =>
            vehicleMarkers.push(new L.marker([vehicle.lat,vehicle.lng], {icon: vehicleIcon})
            .addTo(map))
        );
        return vehicleMarkers;
    }
    
    removeMarkers(markers){
        markers.forEach(marker => map.removeLayer(marker));
    }
}
