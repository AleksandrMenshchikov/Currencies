import React, { memo } from 'react';
import styles from './CurrencyArchive.module.css';
import { useHistory } from 'react-router-dom';
import { selectArchiveCurrencies } from '../../features/archiveCurrencies/archiveCurrenciesSlice';
import { useAppSelector } from '../../features/hooks';
import { formatDate } from '../../utils/formatDate';
import spinBlack from '../../images/spin-black.svg';

const CurrencyArchive = memo(() => {
  const history = useHistory();

  const { data, codeValute, isLoading, error } = useAppSelector(
    selectArchiveCurrencies
  );

  function handleButtonClick() {
    history.push('/');
  }

  return (
    <div className={styles.archive}>
      <button className={styles.button} onClick={handleButtonClick}>
        Перейти на главную страницу
      </button>
      {isLoading ? (
        <div className={styles.preloader}>
          {error ? (
            <h2 className={styles.preloader__title}>{error}</h2>
          ) : (
            <img src={spinBlack} alt="Загрузка данных" />
          )}
        </div>
      ) : (
        <table className={styles.archive__table}>
          <thead>
            <tr className={styles.archive__tr}>
              <th className={styles.archive__th}>Дата</th>
              <th className={styles.archive__th}>Единиц</th>
              <th className={styles.archive__th}>Валюта</th>
              <th className={styles.archive__th}>Курс</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              codeValute &&
              data.map((item: any, index) => (
                <tr className={styles.archive__tr} key={index}>
                  <td className={styles.archive__td}>
                    {formatDate(item.Timestamp).split(',')[0]}
                  </td>
                  <td className={styles.archive__td}>
                    {item.Valute[codeValute].Nominal}
                  </td>
                  <td className={`${styles.archive__td} codeValute`}>
                    {codeValute}
                  </td>
                  <td className={styles.archive__td}>
                    {item.Valute[codeValute].Value}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
});

export default CurrencyArchive;
