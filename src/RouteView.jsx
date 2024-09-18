// import { useRef, useEffect, useState } from "react";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

export function RouteView({ startPortCoords, endPortCoords }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const startMarker = useRef(null);
  const endMarker = useRef(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        projection: "mercator",
        interactive: false,
      });
      startMarker.current = new mapboxgl.Marker({ color: "#66CC00" }).setLngLat(startPortCoords).addTo(map.current);
      endMarker.current = new mapboxgl.Marker({ color: "#CC3300" }).setLngLat(endPortCoords).addTo(map.current);

      map.current.on("load", () => {
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [startPortCoords, endPortCoords],
            },
          },
        });
        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });
      });
    }

    startMarker.current.setLngLat(startPortCoords);
    endMarker.current.setLngLat(endPortCoords);
    map.current.fitBounds([startPortCoords, endPortCoords], {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
      duration: 50,
    });
    if (map.current.getSource("route")) {
      map.current.getSource("route").setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [startPortCoords, endPortCoords],
        },
      });
    }
  });

  return (
    <div>
      <div ref={mapContainer} className="h-64" />
    </div>
  );
}
