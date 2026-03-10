window.ForecastPage = function ForecastPage() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    window.fetchForecast()
      .then((result) => {
        console.log("Forecast data:", result);
        setData(Array.isArray(result) ? result : []);
      })
      .catch((err) => {
        console.error("Error in ForecastPage:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);


  return React.createElement(
    "section",
    { className: "card" },
    React.createElement("h2", { className: "card-heading" }, "Next 24 Hours AQI Forecast"),
    loading
      ? React.createElement("p", null, "Loading forecast data...")
      : data && data.length > 0
      ? React.createElement(
          "table",
          { className: "forecast-table" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement("th", null, "Ward"),
              React.createElement("th", null, "Predicted AQI"),
              React.createElement("th", null, "Forecast Time")
            )
          ),
          React.createElement(
            "tbody",
            null,
            ...data.map((item, idx) =>
              React.createElement(
                "tr",
                { key: idx },
                React.createElement("td", null, item.ward || "N/A"),
                React.createElement(
                  "td",
                  null,
                  Math.round(item.predicted_aqi) || "N/A"
                ),
                React.createElement(
                  "td",
                  null,
                  item.forecast_for
                    ? new Date(item.forecast_for).toLocaleString()
                    : "N/A"
                )
              )
            )
          )
        )
      : React.createElement("p", null, "No forecast data available")
  );
};
