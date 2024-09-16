import L from "leaflet"



const {iconSize, shadowSize, iconAnchor, popupAnchor, tooltipAnchor} = L.Marker.prototype.options.icon.options

const defaultIcon = L.icon({
    iconUrl: '/marker-icon-2x-green.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [15, 25],
    shadowSize: [31, 31],
    iconAnchor: [18, 18],
    popupAnchor: [1, -34],
    tooltipAnchor

})

export default defaultIcon

