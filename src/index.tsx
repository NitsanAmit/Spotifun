import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Spotifun} from "./spotifun";
import {LocaleService} from "./i18n/locale-service";
import {AuthService} from "./networking/auth-service";

const APP_LOCALE = "en" // TODO maybe we'd like to support other languages in the future...
const localeService = new LocaleService(APP_LOCALE);
const authService = new AuthService();

ReactDOM.render(
  <React.StrictMode>
    <Spotifun localeService={localeService} authService={authService}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
