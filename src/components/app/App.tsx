import React, { useEffect } from 'react';
import styles from './App.module.css';
import Header from '../header/Header';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import {
  setCurrencies,
  selectCurrencies,
} from '../../features/currencies/currenciesSlice';
import Preloader from '../preloader/Preloader';
import Table from '../table/Table';
import Tooltip from '../tooltip/Tooltip';

function App() {
  const { data, isLoading } = useAppSelector(selectCurrencies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrencies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(setCurrencies());
      clearTimeout(timer);
    }, 20000);

    return () => {
      clearTimeout(timer);
    };
  }, [data, dispatch]);

  return (
    <div
      className={isLoading ? styles.app : `${styles.app} ${styles.app_active}`}
    >
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={styles.app__container}>
          <Header />
          <Table />
          <Tooltip />
        </div>
      )}
    </div>
  );
}

export default App;
