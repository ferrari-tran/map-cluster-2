import * as React from "react";
// import ControlPanel from './components/ControlPanel';
import Mapbox from "./components/Mapbox";
import { locations } from "./data";

function convertDataToGeoJSON(data) {
  const myGeoJSON = {};
  myGeoJSON.type = "FeatureCollection";
  myGeoJSON.crs = {
    type: "name",
    properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
  };
  myGeoJSON.features = data.map((location) => {
    return {
      type: "Feature",
      properties: {
        id: location.poi_id,
        name: location.name
      },
      geometry: { type: "Point", coordinates: [location.lat, location.lon] },
    };
  });

  return myGeoJSON;
}

export default function App() {
  const data = convertDataToGeoJSON(locations);

  return (
    <>
      <Mapbox data={data} />
      {/* <ControlPanel /> */}
    </>
  );
}
