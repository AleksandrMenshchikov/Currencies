import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { api } from '../../utils/api';

export interface currenciesState {
  data: any;
  isLoading: true | false;
  error: string;
}

const initialState: currenciesState = {
  data: null,
  isLoading: true,
  error: '',
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.data;
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
    },
  },
});

const { setData } = currenciesSlice.actions;

export const selectCurrencies = (state: RootState) => state.currencies;

export const setCurrencies = (): AppThunk => (dispatch) => {
  api
    .getLatestCurrencies()
    .then((res) => {
      dispatch(setData({ data: res, isLoading: false, error: '' }));
    })
    .catch((err) => {
      dispatch(
        setData({
          data: null,
          isLoading: false,
          error: 'Ошибка на сервере. Попробуйте зайти на сайт чуть позже.',
        })
      );
      console.log(err);
    });
};

export default currenciesSlice.reducer;
