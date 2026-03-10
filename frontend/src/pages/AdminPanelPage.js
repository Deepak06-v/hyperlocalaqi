window.AdminPanelPage = function AdminPanelPage() {
  const [recommendations, setRecommendations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    window.fetchRecommendations()
      .then((result) => {
        console.log("Recommendations data:", result);
        setRecommendations(Array.isArray(result) ? result : []);
      })
      .catch((err) => {
        console.error("Error in AdminPanelPage:", err);
        setRecommendations([]);
      })
      .finally(() => setLoading(false));
  }, []);


  return React.createElement(
    "section",
    { className: "card" },
    React.createElement("h2", { className: "card-heading" }, "Mitigation Recommendations"),
    loading
      ? React.createElement("p", null, "Loading recommendations...")
      : recommendations && recommendations.length > 0
      ? React.createElement(
          React.Fragment,
          null,
          ...recommendations.map((item) =>
            React.createElement(
              "article",
              { key: item.ward, className: "item" },
              React.createElement("h3", { className: "item-title" }, item.ward),
              React.createElement(
                "p",
                { className: "reason" },
                item.reason || "No reason provided"
              ),
              React.createElement(
                "p",
                { className: "recommendation" },
                item.recommendation || "No recommendation available"
              )
            )
          )
        )
      : React.createElement("p", null, "No recommendations available")
  );
};
