import React, { memo } from 'react';
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
  const { data } = useAppSelector(selectCurrencies);
  const dispatch = useAppDispatch();

  function handleTableMouseMove(e: any) {
    const trElement = e.target.parentElement;
    if (trElement.tagName === 'TR') {
      if (trElement.children[1].className === 'codeValute') {
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

  const optimizedHandleTableMouseMove = throttle(handleTableMouseMove, 50);
  const optimizedHandleTableMouseLeave = throttle(handleTableMouseLeave, 50);
  const optimizedHandleTableMouseOver = throttle(handleTableMouseOver, 50);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Единиц</th>
          <th>Валюта</th>
          <th>Курс</th>
          <th>Разница, %</th>
        </tr>
      </thead>
      <tbody
        onMouseMove={optimizedHandleTableMouseMove}
        onMouseLeave={optimizedHandleTableMouseLeave}
        onMouseOver={optimizedHandleTableMouseOver}
      >
        {data &&
          Object.entries(data.Valute).map((item: [string, any]) => (
            <tr key={item[1].ID}>
              <td>{item[1].Nominal}</td>
              <td className="codeValute">{item[0]}</td>
              <td>{item[1].Value}</td>
              <td>{calculatePercent(item[1].Previous, item[1].Value)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
});

export default Table;
