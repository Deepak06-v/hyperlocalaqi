window.NavBar = function NavBar() {
  const items = [
    { id: "map", label: "AQI Map" },
    { id: "forecast", label: "AQI Forecast" },
    { id: "sources", label: "Pollution Source Map" },
    { id: "admin", label: "Admin Panel" },
  ];

  const navStyles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 24px",
      background: "#143d2a",
      color: "#f4fbf2",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    title: {
      margin: 0,
      fontSize: "1.4rem",
    },
    links: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    },
    link: {
      color: "#d8f4e0",
      padding: "10px 14px",
      borderRadius: "999px",
      background: "rgba(255,255,255,0.08)",
      cursor: "pointer",
      border: "none",
      fontSize: "14px",
    },
    activeLink: {
      background: "#9fe870",
      color: "#143d2a",
    },
  };

  return React.createElement(
    "nav",
    { style: navStyles.nav },
    React.createElement("h1", { style: navStyles.title }, "HyperLocal AQI Dashboard"),
    React.createElement(
      "div",
      { style: navStyles.links },
      ...items.map((item) =>
        React.createElement(
          "button",
          {
            key: item.id,
            onClick: () => window.switchPage(item.id),
            style: {
              ...navStyles.link,
              ...(window.currentPage === item.id ? navStyles.activeLink : {}),
            },
          },
          item.label
        )
      )
    )
  );
};
