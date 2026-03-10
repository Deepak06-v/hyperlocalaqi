window.PollutionSourcePage = function PollutionSourcePage() {
  const [sources, setSources] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    Promise.all([window.fetchSources(), window.fetchCurrentAQI()])
      .then(([sourceData, currentData]) => {
        console.log("Source data:", sourceData);
        setSources(Array.isArray(sourceData) ? sourceData : []);
      })
      .catch((err) => {
        console.error("Error in PollutionSourcePage:", err);
        setSources([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const styles = {
    container: {
      background: "#ffffff",
      borderRadius: "20px",
      padding: "20px",
      boxShadow: "0 12px 30px rgba(20, 61, 42, 0.08)",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      marginTop: "20px",
    },
    item: {
      background: "#f8fcf8",
      border: "1px solid #e6efe7",
      borderRadius: "12px",
      padding: "15px",
      marginBottom: "10px",
      fontSize: "14px",
    },
  };

  return React.createElement(
    "div",
    { style: styles.container },
    React.createElement("h2", null, "Detected Pollution Sources"),
    loading
      ? React.createElement("p", null, "Loading source data...")
      : sources && sources.length > 0
      ? React.createElement(
          "ul",
          { style: styles.list },
          ...sources.map((item, idx) =>
            React.createElement(
              "li",
              { key: idx, style: styles.item },
              React.createElement("strong", null, item.ward || "Unknown Ward"),
              React.createElement(
                "div",
                { style: { fontSize: "12px", marginTop: "5px", color: "#666" } },
                `Source: ${item.source || "Unknown source"}`,
                item.confidence &&
                  React.createElement(
                    "div",
                    null,
                    `Confidence: ${Math.round(item.confidence * 100)}%`
                  )
              )
            )
          )
        )
      : React.createElement("p", null, "No source data available")
  );
};
