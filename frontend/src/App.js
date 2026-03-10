window.App = function App() {
  const [page, setPage] = React.useState("map");

  React.useEffect(() => {
    window.currentPage = page;
    window.switchPage = setPage;
  }, [page]);

  const getPageContent = () => {
    switch (page) {
      case "map":
        return React.createElement(window.AQIMapPage);
      case "forecast":
        return React.createElement(window.ForecastPage);
      case "sources":
        return React.createElement(window.PollutionSourcePage);
      case "admin":
        return React.createElement(window.AdminPanelPage);
      default:
        return React.createElement(window.AQIMapPage);
    }
  };

  const appStyles = {
    shell: {
      minHeight: "100vh",
      background: "linear-gradient(180deg, #eff6ec 0%, #dfeae2 100%)",
    },
    main: {
      padding: "24px",
    },
  };

  return React.createElement(
    "div",
    { style: appStyles.shell },
    React.createElement(window.NavBar),
    React.createElement("main", { style: appStyles.main }, getPageContent())
  );
};
