import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { AppThunk, RootState } from '../store';

const initialState = {
  data: [],
};

const archiveCurrenciesSlice = createSlice({
  name: 'archiveCurrencies',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = archiveCurrenciesSlice.actions;

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
          if (counter < 10) {
            getData();
          }
        });
    }
    getData();

    console.log(arrData);
  };

export default archiveCurrenciesSlice.reducer;
