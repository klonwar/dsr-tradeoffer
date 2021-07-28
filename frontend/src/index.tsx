import React from "react";
import UIkit from "uikit";
import App from "#components/app/app";
import ReactDOM from "react-dom";
import Icons from "uikit/dist/js/uikit-icons";

(() => {
  // @ts-ignore
  UIkit.use(Icons);

  ReactDOM.render((
    <App />
  ), document.querySelector(`#root`));
})();