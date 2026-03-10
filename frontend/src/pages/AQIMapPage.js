window.AQIMapPage = function AQIMapPage() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    window.fetchCurrentAQI()
      .then((result) => {
        console.log("AQI Map data:", result);
        setData(Array.isArray(result) ? result : []);
      })
      .catch((err) => {
        console.error("Error in AQIMapPage:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

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
      fontSize: "14px",
    },
    badge: {
      display: "inline-block",
      marginLeft: "10px",
      padding: "4px 8px",
      borderRadius: "999px",
      background: "#eaf7e3",
      fontSize: "12px",
    },
  };

  function colorForAQI(aqi) {
    if (!aqi) return "#999";
    if (aqi <= 50) return "#60d394";
    if (aqi <= 100) return "#ffd166";
    if (aqi <= 200) return "#f08a5d";
    return "#d7263d";
  }

  return React.createElement(
    "div",
    { style: styles.grid },
    React.createElement(window.MapCard, {
      title: "Ward-Level AQI Heatmap",
      data,
      loading,
    }),
    React.createElement(
      "section",
      { style: styles.panel },
      React.createElement("h2", null, "Citizen Health Advisories"),
      loading
        ? React.createElement("p", null, "Loading advisories...")
        : data.length === 0
        ? React.createElement("p", null, "No data available")
        : React.createElement(
            React.Fragment,
            null,
            ...data.map((item) =>
              React.createElement(
                "div",
                { key: item.ward, style: styles.row },
                React.createElement("strong", null, item.ward),
                React.createElement(
                  "span",
                  { style: styles.badge },
                  `AQI ${Math.round(item.aqi)}`
                ),
                React.createElement("p", { style: { margin: "5px 0", fontSize: "12px" } }, item.advisory)
              )
            )
          )
    )
  );
};
