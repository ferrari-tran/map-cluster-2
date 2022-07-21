import * as React from "react";
import { useRef } from "react";
import { Map, Source, Layer } from "react-map-gl";
// import 'mapbox-gl/dist/mapbox-gl.css';
import "./Mapbox.css";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "../layers";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWl6dW5la284NiIsImEiOiJjazYxbmhzcXowNWoyM21zY2lpemRtMTJwIn0.zNhaJaXle_1Yssue-lXhNQ"; // Set your mapbox token here

export default function Mapbox({ data }) {
  const mapRef = useRef(null);

  const onClick = (event) => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = mapRef.current.getSource("locations");

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      });
    });
  };

  return (
    <div id="map">
      <Map
        initialViewState={{
          latitude: 40.67,
          longitude: -103.59,
          zoom: 3,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="locations"
          type="geojson"
          data={data}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </div>
  );
}
