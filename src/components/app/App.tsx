import React, { useEffect } from 'react';
import styles from './App.module.css';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import {
  setCurrencies,
  stopCurrencies,
  selectCurrencies,
} from '../../features/currencies/currenciesSlice';
import Preloader from '../preloader/Preloader';
import { Route, Switch } from 'react-router-dom';
import CurrencyArchive from '../currency_archive/CurrencyArchive';
import HomePage from '../../pages/HomePage';
import NotFoundPage from '../../pages/NotFoundPage';
import ProtectedRoute from '../protected-route/ProtectedRoute';

function App() {
  const { isLoading } = useAppSelector(selectCurrencies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrencies());
    return () => stopCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={isLoading ? styles.app : `${styles.app} ${styles.app_active}`}
    >
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={styles.app__container}>
          <a
            href="https://www.cbr-xml-daily.ru/"
            target="_blank"
            rel="noreferrer"
            style={{ marginTop: 20 }}
          >
            Курсы валют, API
          </a>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <ProtectedRoute
              exact
              component={CurrencyArchive}
              path="/currency_archive"
              pathToRedirect={{
                pathname: '/',
              }}
            />
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
