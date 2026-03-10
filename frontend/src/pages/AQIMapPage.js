import { MapCard } from "../components/MapCard.js";
import { fetchCurrentAQI } from "../components/api.js";

export function AQIMapPage() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchCurrentAQI().then(setData).catch(() => setData([]));
  }, []);

  return React.createElement(
    "div",
    { style: styles.grid },
    React.createElement(MapCard, {
      title: "Ward-Level AQI Heatmap",
      data,
      valueKey: "aqi",
      colorForValue: colorForAQI,
    }),
    React.createElement(
      "section",
      { style: styles.panel },
      React.createElement("h2", null, "Citizen Health Advisories"),
      ...data.map((item) =>
        React.createElement(
          "div",
          { key: item.ward, style: styles.row },
          React.createElement("strong", null, item.ward),
          React.createElement("span", { style: styles.badge }, `AQI ${item.aqi}`),
          React.createElement("p", { style: styles.copy }, item.advisory)
        )
      )
    )
  );
}

function colorForAQI(aqi) {
  if (aqi <= 50) return "#60d394";
  if (aqi <= 100) return "#ffd166";
  if (aqi <= 200) return "#f08a5d";
  return "#d7263d";
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  },
  panel: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 12px 30px rgba(20, 61, 42, 0.08)",
  },
  row: {
    padding: "14px 0",
    borderBottom: "1px solid #e7efe4",
  },
  badge: {
    display: "inline-block",
    marginLeft: "10px",
    padding: "4px 8px",
    borderRadius: "999px",
    background: "#eaf7e3",
  },
  copy: {
    marginBottom: 0,
    color: "#355246",
  },
};
