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


  return React.createElement(
    "div",
    { className: "card" },
    React.createElement("h2", { className: "card-heading" }, "Detected Pollution Sources"),
    loading
      ? React.createElement("p", null, "Loading source data...")
      : sources && sources.length > 0
      ? React.createElement(
          "ul",
          { className: "card-list" },
          ...sources.map((item, idx) =>
            React.createElement(
              "li",
              { key: idx, className: "item" },
              React.createElement("strong", null, item.ward || "Unknown Ward"),
              React.createElement(
                "div",
                { className: "subtext" },
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
