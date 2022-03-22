import React, { useEffect } from 'react';
import styles from './App.module.css';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import {
  setCurrencies,
  stopCurrencies,
  selectCurrencies,
} from '../../features/currencies/currenciesSlice';
import Preloader from '../preloader/Preloader';
import Home from '../../pages/Home';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../not-found/NotFound';

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
              <Home />
            </Route>
            <Route exact path="/currency_archive">
              <h2>Hello</h2>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
