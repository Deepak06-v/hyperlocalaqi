import { fetchRecommendations } from "../components/api.js";

export function AdminPanelPage() {
  const [recommendations, setRecommendations] = React.useState([]);

  React.useEffect(() => {
    fetchRecommendations().then(setRecommendations).catch(() => setRecommendations([]));
  }, []);

  return React.createElement(
    "section",
    { style: styles.card },
    React.createElement("h2", null, "Mitigation Recommendations"),
    ...recommendations.map((item) =>
      React.createElement(
        "article",
        { key: item.ward, style: styles.item },
        React.createElement("h3", { style: styles.itemTitle }, item.ward),
        React.createElement("p", { style: styles.reason }, item.reason),
        React.createElement("p", { style: styles.recommendation }, item.recommendation)
      )
    )
  );
}

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 12px 30px rgba(20, 61, 42, 0.08)",
  },
  item: {
    border: "1px solid #e6efe7",
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "14px",
    background: "#f8fcf8",
  },
  itemTitle: {
    marginTop: 0,
    marginBottom: "10px",
  },
  reason: {
    color: "#3d5648",
  },
  recommendation: {
    color: "#17301f",
    fontWeight: 600,
    marginBottom: 0,
  },
};
