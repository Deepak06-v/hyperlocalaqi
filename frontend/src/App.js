import { NavBar } from "./components/NavBar.js";
import { AQIMapPage } from "./pages/AQIMapPage.js";
import { ForecastPage } from "./pages/ForecastPage.js";
import { PollutionSourcePage } from "./pages/PollutionSourcePage.js";
import { AdminPanelPage } from "./pages/AdminPanelPage.js";

const { BrowserRouter, Routes, Route } = ReactRouterDOM;

export default function App() {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      "div",
      { style: styles.shell },
      React.createElement(NavBar),
      React.createElement(
        "main",
        { style: styles.main },
        React.createElement(
          Routes,
          null,
          React.createElement(Route, {
            path: "/",
            element: React.createElement(AQIMapPage),
          }),
          React.createElement(Route, {
            path: "/forecast",
            element: React.createElement(ForecastPage),
          }),
          React.createElement(Route, {
            path: "/sources",
            element: React.createElement(PollutionSourcePage),
          }),
          React.createElement(Route, {
            path: "/admin",
            element: React.createElement(AdminPanelPage),
          })
        )
      )
    )
  );
}

const styles = {
  shell: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #eff6ec 0%, #dfeae2 100%)",
  },
  main: {
    padding: "24px",
  },
};
