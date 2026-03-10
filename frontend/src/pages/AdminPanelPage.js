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

  const styles = {
    card: {
      background: "#ffffff",
      borderRadius: "20px",
      padding: "20px",
      boxShadow: "0 12px 30px rgba(20, 61, 42, 0.08)",
    },
    item: {
      border: "1px solid #e6efe7",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "14px",
      background: "#f8fcf8",
    },
    itemTitle: {
      marginTop: 0,
      marginBottom: "10px",
      fontSize: "16px",
      fontWeight: "600",
    },
    reason: {
      color: "#3d5648",
      marginBottom: "8px",
      fontSize: "14px",
    },
    recommendation: {
      color: "#17301f",
      fontWeight: "600",
      marginBottom: 0,
      fontSize: "14px",
    },
  };

  return React.createElement(
    "section",
    { style: styles.card },
    React.createElement("h2", null, "Mitigation Recommendations"),
    loading
      ? React.createElement("p", null, "Loading recommendations...")
      : recommendations && recommendations.length > 0
      ? React.createElement(
          React.Fragment,
          null,
          ...recommendations.map((item) =>
            React.createElement(
              "article",
              { key: item.ward, style: styles.item },
              React.createElement("h3", { style: styles.itemTitle }, item.ward),
              React.createElement(
                "p",
                { style: styles.reason },
                item.reason || "No reason provided"
              ),
              React.createElement(
                "p",
                { style: styles.recommendation },
                item.recommendation || "No recommendation available"
              )
            )
          )
        )
      : React.createElement("p", null, "No recommendations available")
  );
};
