import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import ChangeCenter from "./ChangeCenter";
import DetectClick from "./DetectClick";

import Button from "./Button";

import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();

  /* LOCAL state: SYNC LOCAL state with GLOBAL/REMOTE state */
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geoLocation,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    // SYNC LOCAL mapPosition with GLOBAL searchParams
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    // SYNC LOCAL mapPosition with REMOTE geoLocation
    function () {
      if (geoLocation) {
        setMapPosition([geoLocation.lat, geoLocation.lng]);
      }
    },
    [geoLocation]
  );

  /* https://react-leaflet.js.org/ */

  return (
    /* navigate: programmatic navigation */
    <div className={styles.mapContainer}>
      {!geoLocation && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />

        {/* Submit form in <DetectClick/> */}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

export default Map;
