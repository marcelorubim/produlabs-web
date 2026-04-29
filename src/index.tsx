import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import LoginPage from './components/LoginPage';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import MainPage from './components/MainPage';
import Axios from 'axios';
import AuthenticationResponse from './types/AuthenticationResponse';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import logger from 'redux-logger';

if (sessionStorage.getItem("user")) {
    const user = JSON.parse(sessionStorage.getItem("user") || "") as AuthenticationResponse;
    Axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
}

const sagaMiddleware = createSagaMiddleware()

const middlewares: any[] = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(
    reducers,
    undefined,
    applyMiddleware(...middlewares)
);
sagaMiddleware.run(sagas)

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/login/*" element={<LoginPage />} />
                <Route path="/*" element={
                    <PrivateRoute>
                        <MainPage />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    </Provider>
);

serviceWorker.unregister();

function PrivateRoute({ children }: { children: React.ReactNode }) {
    return sessionStorage.getItem("user")
        ? <>{children}</>
        : <Navigate to="/login" replace />;
}
