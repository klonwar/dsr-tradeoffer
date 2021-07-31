import './style.scss';

import React from 'react';
import UIkit from 'uikit';
import App from '#components/app/app';
import ReactDOM from 'react-dom';
import Icons from 'uikit/dist/js/uikit-icons';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '#src/js/redux/store';

(() => {
  // @ts-ignore
  UIkit.use(Icons);

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(`#root`),
  );
})();