import React from 'react';
import UIkit from 'uikit';
import App from '#components/app/app';
import ReactDOM from 'react-dom';
import Icons from 'uikit/dist/js/uikit-icons';
import { BrowserRouter } from 'react-router-dom';

import './style.scss';

(() => {
  // @ts-ignore
  UIkit.use(Icons);

  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.querySelector(`#root`),
  );
})();