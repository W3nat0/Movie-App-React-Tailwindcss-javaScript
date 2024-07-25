import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// components
import App from "./App";
import Layout from "./components/Layout";
// redux
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persister } from "./provider/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Layout>
          <App />
        </Layout>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
