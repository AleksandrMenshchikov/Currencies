import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { AppThunk, RootState } from '../store';

const initialState = {
  data: [],
  codeValute: '',
  isLoading: true,
  error: '',
};

const archiveCurrenciesSlice = createSlice({
  name: 'archiveCurrencies',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = action.payload.isLoading;
    },
    setCodeValute: (state, action) => {
      state.codeValute = action.payload;
    },
  },
});

export const { setData, setCodeValute } = archiveCurrenciesSlice.actions;

export const selectArchiveCurrencies = (state: RootState) =>
  state.archiveCurrencies;

export const setArchiveCurrenciesData =
  (): AppThunk => (dispatch, getState) => {
    const arrData = [getState().currencies.data];

    let counter = 0;
    function getData() {
      const arrDate = arrData[counter].PreviousURL.split('/').slice(-4, -1);
      api
        .getArchiveCurrencies(arrDate[0], arrDate[1], arrDate[2])
        .then((res) => {
          arrData.push(res);
          counter += 1;
          if (counter < 9) {
            getData();
          }
          if (arrData.length === 10) {
            dispatch(setData({ data: arrData, isLoading: false, error: '' }));
          }
        })
        .catch((err) => {
          dispatch(
            setData({
              data: null,
              isLoading: true,
              error: 'Ошибка на сервере. Попробуйте зайти на сайт чуть позже.',
            })
          );
          console.log(err);
        });
    }
    getData();
  };

export default archiveCurrenciesSlice.reducer;
