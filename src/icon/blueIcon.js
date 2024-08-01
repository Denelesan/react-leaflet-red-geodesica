import L from "leaflet"



const {iconSize, shadowSize, iconAnchor, popupAnchor, tooltipAnchor} = L.Marker.prototype.options.icon.options

const blueIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 40],
    shadowSize: [31, 31],
    iconAnchor: [13, 37],
    popupAnchor: [1, -34],
    tooltipAnchor

})

export default blueIcon

