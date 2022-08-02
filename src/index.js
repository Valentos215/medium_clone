import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Routes from "./pages/routes";
import { BrowserRouter } from "react-router-dom";
import TopBar from "./components/topBar";
import { CurrentUserProvider } from "./contexts/currentUser";

const App = () => {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <TopBar />
        <Routes />
      </BrowserRouter>
    </CurrentUserProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
