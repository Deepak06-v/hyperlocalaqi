const { MapContainer, TileLayer, CircleMarker, Popup } = ReactLeaflet;

export function MapCard({ title, data, valueKey, colorForValue, labelKey = "ward" }) {
  return React.createElement(
    "section",
    { style: styles.card },
    React.createElement("h2", { style: styles.heading }, title),
    React.createElement(
      MapContainer,
      { center: [28.6139, 77.209], zoom: 10, style: styles.map },
      React.createElement(TileLayer, {
        attribution: "&copy; OpenStreetMap contributors",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      }),
      ...data
        .filter((item) => item.latitude && item.longitude)
        .map((item, index) =>
          React.createElement(
            CircleMarker,
            {
              key: `${item[labelKey]}-${index}`,
              center: [item.latitude, item.longitude],
              radius: 14,
              pathOptions: {
                fillColor: colorForValue(item[valueKey]),
                color: "#102018",
                fillOpacity: 0.7,
              },
            },
            React.createElement(
              Popup,
              null,
              React.createElement("strong", null, item[labelKey]),
              React.createElement("div", null, `${valueKey}: ${item[valueKey]}`)
            )
          )
        )
    )
  );
}

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 12px 30px rgba(20, 61, 42, 0.08)",
  },
  heading: {
    marginTop: 0,
  },
  map: {
    height: "520px",
    width: "100%",
    borderRadius: "16px",
  },
};
