import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
mapboxgl.accessToken = "pk.eyJ1IjoiYm1jbG91dGllciIsImEiOiJjbG1wcXVkaW0wOHV6Mm5wN3VpemgwNm9hIn0.-xTiT7uKWSoIA1GadyJJ3A";

export function HomePage() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const distancePerSecond = 6;

  useEffect(() => {
    setInterval(() => {
      const center = map.current.getCenter();
      center.lng += distancePerSecond;
      map.current.easeTo({ center, duration: 1000, easing: (n) => n });
    }, 1000);
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        zoom: 2,
        center: [-70, 20],
        interactive: false,
      });

      // 33.89322° N, 35.48035° E
      new mapboxgl.Marker({ color: "#1E3A8A" }).setLngLat([-73.9, 40.73]).addTo(map.current);
      new mapboxgl.Marker({ color: "#1E3A8A" }).setLngLat([-9.1388, 38.707]).addTo(map.current);

      new mapboxgl.Marker({ color: "#1E3A8A" }).setLngLat([-44.2204, -2.49976]).addTo(map.current);
      new mapboxgl.Marker({ color: "#1E3A8A" }).setLngLat([-17.44774, 14.72117]).addTo(map.current);

      new mapboxgl.Marker({ color: "#1E3A8A" }).setLngLat([3.35328, 6.49851]).addTo(map.current);
      new mapboxgl.Marker({ color: "#1E3A8A" }).setLngLat([18.41958, -33.92202]).addTo(map.current);

      new mapboxgl.Marker({ color: "#1E3A8A" }).setLngLat([45.30455, 2.03258]).addTo(map.current);
      new mapboxgl.Marker({ color: "#1E3A8A" }).setLngLat([72.83466, 18.9401]).addTo(map.current);

      new mapboxgl.Marker({ color: "#1E3A8A" }).setLngLat([13.19329, 32.88918]).addTo(map.current);
      new mapboxgl.Marker({ color: "#1E3A8A" }).setLngLat([35.48035, 33.89322]).addTo(map.current);

      map.current.on("load", () => {
        map.current.addSource("routes", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [-73.9, 40.73],
                    [-9.1388, 38.707],
                  ],
                },
              },
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [-44.2204, -2.49976],
                    [-17.44774, 14.72117],
                  ],
                },
              },
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [3.35328, 6.49851],
                    [18.41958, -33.92202],
                  ],
                },
              },
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [45.30455, 2.03258],
                    [72.83466, 18.9401],
                  ],
                },
              },
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [13.19329, 32.88918],
                    [35.48035, 33.89322],
                  ],
                },
              },
            ],
          },
        });
        map.current.addLayer({
          id: "routes",
          type: "line",
          source: "routes",
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
  });

  return (
    <div className="flex justify-center text-xl mt-10">
      <div className="w-3/5">
        <h1 className="flex justify-center text-4xl italic text-blue-900 mb-10">
          Chart a course for your next adventure!
        </h1>
        <div ref={mapContainer} className="rounded-xl shadow-md h-[600px]" />
      </div>
    </div>
  );
}
