import { fetchForecast } from "../components/api.js";

const { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } = Recharts;

export function ForecastPage() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchForecast().then(setData).catch(() => setData([]));
  }, []);

  const chartData = data.slice(0, 24).map((item) => ({
    hour: new Date(item.forecast_for).getHours(),
    aqi: item.predicted_aqi,
    ward: item.ward,
  }));

  return React.createElement(
    "section",
    { style: styles.card },
    React.createElement("h2", null, "Next 24 Hours AQI Forecast"),
    React.createElement(
      ResponsiveContainer,
      { width: "100%", height: 480 },
      React.createElement(
        LineChart,
        { data: chartData },
        React.createElement(CartesianGrid, { strokeDasharray: "3 3" }),
        React.createElement(XAxis, { dataKey: "hour" }),
        React.createElement(YAxis, null),
        React.createElement(Tooltip, null),
        React.createElement(Legend, null),
        React.createElement(Line, {
          type: "monotone",
          dataKey: "aqi",
          stroke: "#1b6b4a",
          strokeWidth: 3,
        })
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
};
