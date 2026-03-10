window.MapCard = function MapCard({ title, data, loading, isMobile }) {
  // visual layout now governed by CSS classes

  return React.createElement(
    "section",
    { className: "card" },
    React.createElement("h2", { className: "card-heading" }, title),
    loading
      ? React.createElement(
          "div",
          { className: "card-map" },
          "Loading map data..."
        )
      : data && data.length > 0
      ? React.createElement(
          "ul",
          { className: "card-list" },
          ...data.map((item, idx) =>
            React.createElement(
              "li",
              { key: idx, className: "card-item" },
              React.createElement("strong", null, item.ward || "Ward " + (idx + 1)),
              React.createElement(
                "span",
                { className: "aqi-value" },
                `AQI: ${Math.round(item.aqi) || "N/A"}`
              )
            )
          )
        )
      : React.createElement(
          "div",
          { className: "card-map" },
          "No data available"
        )
  );
};
