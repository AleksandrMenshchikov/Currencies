import React, { memo, useEffect } from 'react';
import styles from './Search.module.css';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { selectSearch, setValue } from '../../features/search/searchSlice';
import { setFilteredData } from '../../features/currencies/currenciesSlice';

const Search = memo(() => {
  const { value } = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFilteredData(value))
  }, [dispatch, value]);
  

  function handleInputChange(e: { target: { value: string } }) {
    dispatch(setValue(e.target.value));
  }

  function handleButtonClick() {
    dispatch(setValue(''));
  }

  return (
    <div className={styles.container}>
      <input
        maxLength={100}
        className={styles.search}
        type="text"
        name="search"
        id="search"
        placeholder="&#128269; введите например доллар или usd"
        autoComplete="off"
        onChange={handleInputChange}
        value={value}
      />
      <button className={styles.button} onClick={handleButtonClick}>
        Очистить
      </button>
    </div>
  );
});

export default Search;
