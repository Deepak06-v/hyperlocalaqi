window.App = function App() {
  const [page, setPage] = React.useState("map");
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    window.currentPage = page;
    window.switchPage = setPage;
  }, [page]);

  React.useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const isMobile = width < 600;

  const getPageContent = () => {
    switch (page) {
      case "map":
        return React.createElement(window.AQIMapPage, { isMobile });
      case "forecast":
        return React.createElement(window.ForecastPage, { isMobile });
      case "sources":
        return React.createElement(window.PollutionSourcePage, { isMobile });
      case "admin":
        return React.createElement(window.AdminPanelPage, { isMobile });
      default:
        return React.createElement(window.AQIMapPage, { isMobile });
    }
  };

  // main padding is handled in CSS (.main) with media queries
  return React.createElement(
    "div",
    { className: "shell" },
    React.createElement(window.NavBar, { isMobile }),
    React.createElement("main", { className: "main" }, getPageContent())
  );
};
