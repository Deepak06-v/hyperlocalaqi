import { MapCard } from "../components/MapCard.js";
import { fetchCurrentAQI, fetchSources } from "../components/api.js";

export function PollutionSourcePage() {
  const [sources, setSources] = React.useState([]);

  React.useEffect(() => {
    Promise.all([fetchSources(), fetchCurrentAQI()])
      .then(([sourceData, currentData]) => {
        const byWard = Object.fromEntries(currentData.map((row) => [row.ward, row]));
        setSources(
          sourceData.map((item) => ({
            ...item,
            latitude: byWard[item.ward]?.latitude,
            longitude: byWard[item.ward]?.longitude,
          }))
        );
      })
      .catch(() => setSources([]));
  }, []);

  return React.createElement(
    "div",
    null,
    React.createElement(MapCard, {
      title: "Detected Pollution Sources",
      data: sources,
      valueKey: "source",
      colorForValue: sourceColor,
    })
  );
}

function sourceColor(source) {
  const palette = {
    construction_dust: "#c98b42",
    traffic_emissions: "#e76f51",
    biomass_burning: "#8d5524",
    industrial_pollution: "#457b9d",
  };
  return palette[source] || "#6c757d";
}
