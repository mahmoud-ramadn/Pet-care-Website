import L from "leaflet"
import "leaflet/dist/leaflet.css"

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

// استيراد الصور يدويًا
import markerIcon from "/map.png"

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

type MapProps = {
  latitude: number
  longitude: number
}

export default function MapComponent({ latitude, longitude }: MapProps) {
  const position: [number, number] = [latitude, longitude]

  return (
    <div className="w-full h-[500px] rounded shadow-lg overflow-hidden">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>هذا هو الموقع الذي حددته</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
