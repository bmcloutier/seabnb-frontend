import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

function distance(lat1, lon1, lat2, lon2) {
  const r = 6371; // km
  const p = Math.PI / 180;

  const a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p))) / 2;

  return Math.round(2 * r * Math.asin(Math.sqrt(a)));
}

function duration(distance, pace) {
  return Math.ceil(distance / pace);
}

export function Planner({
  ports,
  vessels,
  onVesselIndex,
  onStartPortSelection,
  onEndPortSelection,
  onBook,
  onBookUpdate,
  startPortCoords,
  endPortCoords,
  onGetExchangeRate,
  startPortCurrency,
  exchangeRate,
}) {
  const location = useLocation();
  const [selectedStart, setSelectedStart] = useState(location.state.startPort);
  const [selectedEnd, setSelectedEnd] = useState(location.state.endPort);
  const [selectedStartDate, setSelectedStartDate] = useState(location.state.startDate);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const startMarker = useRef(null);
  const endMarker = useRef(null);

  if (vessels.length == 0) {
    onVesselIndex(location.state.startPort);
  }

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        interactive: true,
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
      padding: { top: 50, bottom: 30, left: 75, right: 75 },
      duration: 500,
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
    <div className="mt-10">
      <div className="flex justify-center text-xl">
        <label>
          <select
            className="shadow-md p-2 rounded italic bg-blue-100 text-blue-900 hover:bg-blue-200"
            value={selectedStart}
            onChange={(e) => {
              setSelectedStart(e.target.value);
              onVesselIndex(e.target.value);
              onStartPortSelection(e.target.value);
              onGetExchangeRate();
            }}
            name="selectedStart"
            id=""
          >
            {ports.map((port) => (
              <option key={port.id} value={port.id}>
                {port.city}, {port.country}
              </option>
            ))}
          </select>
        </label>
        <p className="text-2xl italic p-1 ml-4 mr-4 text-blue-900">to</p>
        <label>
          <select
            className="shadow-md p-2 rounded italic bg-blue-100 text-blue-900 hover:bg-blue-200"
            value={selectedEnd}
            onChange={(e) => {
              setSelectedEnd(e.target.value);
              onEndPortSelection(e.target.value);
              onGetExchangeRate();
            }}
            name="selectedEnd"
            id=""
          >
            {ports.map((port) => (
              <option key={port.id} value={port.id}>
                {port.city}, {port.country}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex justify-center text-2xl p-5 italic text-blue-900">
        <form action="">
          on&nbsp;&nbsp;{" "}
          <input
            className="italic rounded border-2 shadow-md border-slate-200 bg-blue-100 text-blue-900 hover:bg-blue-200"
            type="date"
            defaultValue={location.state.startDate}
            onChange={(e) => setSelectedStartDate(e.target.value)}
          />
        </form>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div>
          <div ref={mapContainer} className="map-container rounded border-2 shadow-md border-slate-200" />
          <p className="text-sm italic mt-2 text-blue-900">
            Total Journey Distance:{" "}
            {distance(startPortCoords[1], startPortCoords[0], endPortCoords[1], endPortCoords[0])} km | Exchange Rate:
            USD to {startPortCurrency}: {exchangeRate}
          </p>
        </div>
        <div>
          {vessels.map((vessel) => (
            <div
              key={vessel.id}
              className="flex mb-4 rounded border-2 shadow-md text-blue-900 bg-slate-50 border-slate-200"
            >
              <div className="flex-none w-32">
                <img src={vessel.image_url} alt="" className="h-32 w-32 float-start mr-4 object-cover" />
              </div>
              <div className="grow mt-2 ml-4">
                <p className="text-lg font-bold">{vessel.name}</p>
                <p>
                  {vessel.length}&apos; {vessel.propulsion}
                </p>
                <p className="italic">{vessel.amenities}</p>
              </div>
              <div className="p-2 grid">
                <p className="justify-self-end">
                  {Intl.NumberFormat(undefined, { style: "currency", currency: startPortCurrency }).format(
                    vessel.daily_price * exchangeRate
                  )}{" "}
                  per day
                </p>
                <p className="justify-self-end">
                  {duration(
                    distance(startPortCoords[1], startPortCoords[0], endPortCoords[1], endPortCoords[0]),
                    vessel.daily_distance
                  )}{" "}
                  day journey
                </p>
                <div className="flex justify-end mt-4">
                  {location.state.bookingId === undefined ? (
                    <>
                      <button
                        className="rounded border text-blue-900 bg-blue-100 border-blue-900 p-2 hover:bg-blue-200"
                        onClick={() => onBook(vessel.id, selectedStart, selectedEnd, selectedStartDate)}
                      >
                        Book for&nbsp;
                        {Intl.NumberFormat(undefined, { style: "currency", currency: startPortCurrency }).format(
                          duration(
                            distance(startPortCoords[1], startPortCoords[0], endPortCoords[1], endPortCoords[0]),
                            vessel.daily_distance
                          ) *
                            vessel.daily_price *
                            exchangeRate
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="rounded border text-blue-900 bg-blue-100 border-blue-900 p-2 hover:bg-blue-200"
                        onClick={() =>
                          onBookUpdate(
                            vessel.id,
                            selectedStart,
                            selectedEnd,
                            selectedStartDate,
                            location.state.bookingId
                          )
                        }
                      >
                        Update to&nbsp;
                        {Intl.NumberFormat(undefined, { style: "currency", currency: startPortCurrency }).format(
                          duration(
                            distance(startPortCoords[1], startPortCoords[0], endPortCoords[1], endPortCoords[0]),
                            vessel.daily_distance
                          ) *
                            vessel.daily_price *
                            exchangeRate
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
