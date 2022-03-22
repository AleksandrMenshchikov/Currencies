import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  setArchiveCurrenciesData,
  setCodeValute,
} from '../../features/archiveCurrencies/archiveCurrenciesSlice';
import { selectCurrencies } from '../../features/currencies/currenciesSlice';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import {
  setCoordinates,
  setOpacity,
  setText,
} from '../../features/tooltip/tooltipSlice';
import { calculatePercent } from '../../utils/calculatePercent';
import { throttle } from '../../utils/throttle';
import styles from './Table.module.css';

const Table = memo(() => {
  const history = useHistory();
  const { data } = useAppSelector(selectCurrencies);
  const dispatch = useAppDispatch();

  function handleTableMouseMove(e: any) {
    const trElement = e.target.parentElement;
    if (trElement.tagName === 'TR') {
      if (trElement.children[1].classList.contains('table__codeValute')) {
        dispatch(setText(data.Valute[trElement.children[1].textContent].Name));
      }
    }
    dispatch(setCoordinates({ x: e.pageX, y: e.pageY }));
  }

  function handleTableMouseLeave(e: any) {
    dispatch(setOpacity(0));
    dispatch(setText(''));
    dispatch(setCoordinates({ x: -30, y: 0 }));
  }

  function handleTableMouseOver(e: any) {
    dispatch(setOpacity(1));
  }

  function handleTbodyClick(e: any) {
    const trElement = e.target.parentElement;
    if (trElement.tagName === 'TR') {
      dispatch(setCodeValute(trElement.children[1].textContent));
      dispatch(setArchiveCurrenciesData());
      history.push('/currency_archive');
      dispatch(setOpacity(0));
    }
  }

  const optimizedHandleTableMouseMove = throttle(handleTableMouseMove, 50);
  const optimizedHandleTableMouseLeave = throttle(handleTableMouseLeave, 50);
  const optimizedHandleTableMouseOver = throttle(handleTableMouseOver, 50);

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.table__tr}>
          <th className={styles.table__th}>Единиц</th>
          <th className={styles.table__th}>Валюта</th>
          <th className={styles.table__th}>Курс</th>
          <th className={styles.table__th}>Разница, %</th>
        </tr>
      </thead>
      <tbody
        onMouseMove={optimizedHandleTableMouseMove}
        onMouseLeave={optimizedHandleTableMouseLeave}
        onMouseOver={optimizedHandleTableMouseOver}
        onClick={handleTbodyClick}
      >
        {data &&
          Object.entries(data.Valute).map((item: [string, any]) => (
            <tr className={styles.table__tr} key={item[1].ID}>
              <td className={styles.table__td}>{item[1].Nominal}</td>
              <td className={`table__codeValute ${styles.table__td}`}>
                {item[0]}
              </td>
              <td className={styles.table__td}>{item[1].Value}</td>
              <td className={styles.table__td}>
                {calculatePercent(item[1].Previous, item[1].Value)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
});

export default Table;
