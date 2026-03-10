window.MapCard = function MapCard({ title, data, loading }) {
  const cardStyles = {
    card: {
      background: "#ffffff",
      borderRadius: "20px",
      padding: "20px",
      boxShadow: "0 12px 30px rgba(20, 61, 42, 0.08)",
    },
    heading: {
      marginTop: 0,
    },
    mapContainer: {
      background: "#f0f0f0",
      borderRadius: "16px",
      height: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#666",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    listItem: {
      padding: "10px 0",
      borderBottom: "1px solid #e7efe4",
      fontSize: "14px",
    },
  };

  return React.createElement(
    "section",
    { style: cardStyles.card },
    React.createElement("h2", { style: cardStyles.heading }, title),
    loading
      ? React.createElement(
          "div",
          { style: cardStyles.mapContainer },
          "Loading map data..."
        )
      : data && data.length > 0
      ? React.createElement(
          "ul",
          { style: cardStyles.list },
          ...data.map((item, idx) =>
            React.createElement(
              "li",
              { key: idx, style: cardStyles.listItem },
              React.createElement("strong", null, item.ward || "Ward " + (idx + 1)),
              React.createElement(
                "span",
                { style: { marginLeft: "10px", color: "#666", fontSize: "12px" } },
                `AQI: ${Math.round(item.aqi) || "N/A"}`
              )
            )
          )
        )
      : React.createElement(
          "div",
          { style: cardStyles.mapContainer },
          "No data available"
        )
  );
};
