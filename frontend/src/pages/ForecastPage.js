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

  const styles = {
    card: {
      background: "#ffffff",
      borderRadius: "20px",
      padding: "20px",
      boxShadow: "0 12px 30px rgba(20, 61, 42, 0.08)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      background: "#143d2a",
      color: "#fff",
      padding: "10px",
      textAlign: "left",
      fontSize: "14px",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #e7efe4",
      fontSize: "14px",
    },
  };

  return React.createElement(
    "section",
    { style: styles.card },
    React.createElement("h2", null, "Next 24 Hours AQI Forecast"),
    loading
      ? React.createElement("p", null, "Loading forecast data...")
      : data && data.length > 0
      ? React.createElement(
          "table",
          { style: styles.table },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement("th", { style: styles.th }, "Ward"),
              React.createElement("th", { style: styles.th }, "Predicted AQI"),
              React.createElement("th", { style: styles.th }, "Forecast Time")
            )
          ),
          React.createElement(
            "tbody",
            null,
            ...data.map((item, idx) =>
              React.createElement(
                "tr",
                { key: idx },
                React.createElement("td", { style: styles.td }, item.ward || "N/A"),
                React.createElement(
                  "td",
                  { style: styles.td },
                  Math.round(item.predicted_aqi) || "N/A"
                ),
                React.createElement(
                  "td",
                  { style: styles.td },
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
