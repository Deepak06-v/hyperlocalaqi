const { Link, useLocation } = ReactRouterDOM;

export function NavBar() {
  const location = useLocation();
  const items = [
    { to: "/", label: "AQI Map" },
    { to: "/forecast", label: "AQI Forecast" },
    { to: "/sources", label: "Pollution Source Map" },
    { to: "/admin", label: "Admin Panel" },
  ];

  return React.createElement(
    "nav",
    { style: styles.nav },
    React.createElement("h1", { style: styles.title }, "HyperLocal AQI Dashboard"),
    React.createElement(
      "div",
      { style: styles.links },
      ...items.map((item) =>
        React.createElement(
          Link,
          {
            key: item.to,
            to: item.to,
            style: {
              ...styles.link,
              ...(location.pathname === item.to ? styles.activeLink : {}),
            },
          },
          item.label
        )
      )
    )
  );
}

const styles = {
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
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.08)",
  },
  activeLink: {
    background: "#9fe870",
    color: "#143d2a",
  },
};
