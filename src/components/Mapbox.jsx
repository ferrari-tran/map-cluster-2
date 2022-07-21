import * as React from 'react';
import {useRef} from 'react';
import {Map, Source, Layer} from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
import './Mapbox.css';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from '../layers';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibWl6dW5la284NiIsImEiOiJjazYxbmhzcXowNWoyM21zY2lpemRtMTJwIn0.zNhaJaXle_1Yssue-lXhNQ'; // Set your mapbox token here

export default function Mapbox() {
  const mapRef = useRef(null);

  const myGeoJSON = {};
  myGeoJSON.type = 'FeatureCollection';
  myGeoJSON.crs = {type: 'name', properties: {name: 'urn:ogc:def:crs:OGC:1.3:CRS84'}};
  myGeoJSON.features = [
    {
      type: 'Feature',
      properties: {
        id: 'ak16994521',
        mag: 2.3,
        time: 1507425650893,
        felt: null,
        tsunami: 0
      },
      geometry: {type: 'Point', coordinates: [-79.3899, 43.6708, 0.0]}
    },
    {
      type: 'Feature',
      properties: {
        id: 'ak16994519',
        mag: 1.7,
        time: 1507425289659,
        felt: null,
        tsunami: 0
      },
      geometry: {type: 'Point', coordinates: [-79.3871, 43.6426, 105.5]}
    },

    {
      type: 'Feature',
      properties: {
        id: 'ak16994517',
        mag: 1.6,
        time: 1507424832518,
        felt: null,
        tsunami: 0
      },
      geometry: {type: 'Point', coordinates: [-79.0849, 43.0896, 105.5]}
    },
    {
      type: 'Feature',
      properties: {
        id: 'ci38021336',
        mag: 1.42,
        time: 1507423898710,
        felt: null,
        tsunami: 0
      },
      geometry: {type: 'Point', coordinates: [-123.0884, 49.2965, 7.64]}
    }
  ];

  const onClick = event => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = mapRef.current.getSource('earthquakes');

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500
      });
    });
  };

  return (
    <div id="map">
      <Map
        initialViewState={{
          latitude: 40.67,
          longitude: -103.59,
          zoom: 3
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="earthquakes"
          type="geojson"
          data={myGeoJSON}
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
