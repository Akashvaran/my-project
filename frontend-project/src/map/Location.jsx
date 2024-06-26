import {  useRef, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './Location.css'; 


const specificLocation = [10.021611, 79.159333]; 

export const Location = () => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, []);

  return (
    <MapContainer center={specificLocation} zoom={8} scrollWheelZoom={true} className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Markers with popups">
          <LayerGroup>
            <Marker position={specificLocation} ref={markerRef}>
              <Popup autoClose={false} closeOnClick={false}>
              Company specific location 
              </Popup>
            </Marker>
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}

