import { memo, useEffect } from 'react';
import { selectCurrencies } from '../../features/currencies/currenciesSlice';
import {
  setCurrentDate,
  selectCurrentDate,
} from '../../features/currentDate/currentDateSlice';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { formatDate } from '../../utils/formatDate';
import styles from './Header.module.css';

const Header = memo(() => {
  const currentDate = useAppSelector(selectCurrentDate);
  const data = useAppSelector(selectCurrencies);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setCurrentDate());
      clearTimeout(timer);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentDate, dispatch]);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Курсы валют ЦБ РФ на {currentDate}</h1>
      <p className={styles.text}>
        Последнее обновление базы данных: {formatDate(data.data.Timestamp)}
      </p>
    </header>
  );
});

export default Header;
