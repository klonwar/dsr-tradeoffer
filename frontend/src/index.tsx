import './style.scss';

import React from 'react';
import UIkit from 'uikit';
import App from '#components/app/app';
import ReactDOM from 'react-dom';
import Icons from 'uikit/dist/js/uikit-icons';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '#src/js/redux/store';
import { LOGIN_SLICE_NAME, LoginActions } from '#src/js/redux/reducers/slices/login-slice';

(() => {
  // @ts-ignore
  UIkit.use(Icons);

  store.dispatch(LoginActions.stateFromStorage());

  // Сохранение состояния в localStorage
  store.subscribe(() => {
    localStorage.setItem(
      LOGIN_SLICE_NAME,
      JSON.stringify(store.getState().loginReducer)
    );
  });
  
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(`#root`),
  );
})();