import React, { memo } from 'react';
import styles from './Preloader.module.css';
import spinBlack from '../../images/spin-black.svg';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../features/hooks';
import { selectCurrencies } from '../../features/currencies/currenciesSlice';
const PreloaderModalRoot = document.getElementById('preloader-modal-root');

const Preloader = memo(() => {
  const { error } = useAppSelector(selectCurrencies);
  return PreloaderModalRoot
    ? createPortal(
        <div className={styles.container}>
          {error ? (
            <h2 className={styles.title}>{error}</h2>
          ) : (
            <img src={spinBlack} alt="Загрузка данных" />
          )}
        </div>,
        PreloaderModalRoot
      )
    : null;
});

export default Preloader;
