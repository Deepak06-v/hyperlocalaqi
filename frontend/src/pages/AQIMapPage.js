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


  function colorForAQI(aqi) {
    if (!aqi) return "#999";
    if (aqi <= 50) return "#60d394";
    if (aqi <= 100) return "#ffd166";
    if (aqi <= 200) return "#f08a5d";
    return "#d7263d";
  }

  return React.createElement(
    "div",
    { className: "aqi-grid" },
    React.createElement(window.MapCard, {
      title: "Ward-Level AQI Heatmap",
      data,
      loading,
    }),
    React.createElement(
      "section",
      { className: "card" },
      React.createElement("h2", { className: "card-heading" }, "Citizen Health Advisories"),
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
                { key: item.ward, className: "row" },
                React.createElement("strong", null, item.ward),
                React.createElement(
                  "span",
                  { className: "badge" },
                  `AQI ${Math.round(item.aqi)}`
                ),
                React.createElement("p", { className: "advisory-text" }, item.advisory)
              )
            )
          )
    )
  );
};
