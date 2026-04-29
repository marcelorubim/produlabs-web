import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import LoginPage from './components/LoginPage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import MainPage from './components/MainPage';
import Axios from 'axios';
import AuthenticationResponse from './types/AuthenticationResponse';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
if(sessionStorage.getItem("user") ){
    const user = JSON.parse(sessionStorage.getItem("user") || "") as AuthenticationResponse;
    Axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

}
const sagaMiddleware = createSagaMiddleware()

const middlewares: any[] = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
    const { default: logger } = await import('redux-logger');
    middlewares.push(logger);
}

const store =  createStore(
  reducers,
  applyMiddleware(...middlewares)
);
sagaMiddleware.run(sagas)
ReactDOM.render(<Provider store={store}><Router>
    <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/">
            <MainPage />
          </PrivateRoute>
        </Switch>
    </Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


function PrivateRoute({ children, ...rest }: any)  {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          sessionStorage.getItem("user") ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }