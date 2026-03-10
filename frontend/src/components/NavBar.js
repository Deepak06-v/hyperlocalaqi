window.NavBar = function NavBar({ isMobile }) {
  const items = [
    { id: "map", label: "AQI Map" },
    { id: "forecast", label: "AQI Forecast" },
    { id: "sources", label: "Pollution Source Map" },
    { id: "admin", label: "Admin Panel" },
  ];

  // styles moved to CSS classes
  return React.createElement(
    "nav",
    { className: "navbar" },
    React.createElement("h1", { className: "navbar-title" }, "HyperLocal AQI Dashboard"),
    React.createElement(
      "div",
      { className: "navbar-links" },
      ...items.map((item) => {
        const classes = ["navbar-link"];
        if (window.currentPage === item.id) classes.push("navbar-link-active");
        return React.createElement(
          "button",
          {
            key: item.id,
            onClick: () => window.switchPage(item.id),
            className: classes.join(" "),
          },
          item.label
        );
      })
    )
  );
};
