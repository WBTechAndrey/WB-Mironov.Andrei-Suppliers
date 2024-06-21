import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { ErrorBoundary } from "components/ErrorBoundary";
import { setupStore } from "./store/store";
import { ConfigureRouter } from "./router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const store = setupStore();

root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ConfigureRouter />
    </Provider>
  </ErrorBoundary>,
);
