import './style.scss';

import React from 'react';
import UIkit from 'uikit';
import App from '#components/app/app';
import ReactDOM from 'react-dom';
import Icons from 'uikit/dist/js/uikit-icons';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '#src/js/redux/store';
import { USER_SLICE_NAME, UserActions } from '#src/js/redux/reducers/slices/user-slice';

(() => {
  // @ts-ignore
  UIkit.use(Icons);

  store.dispatch(UserActions.stateFromStorage());

  // Сохранение состояния в localStorage
  store.subscribe(() => {
    localStorage.setItem(
      USER_SLICE_NAME,
      JSON.stringify(store.getState().userReducer)
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