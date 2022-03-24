import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { api } from '../../utils/api';
import getFilteredObject from '../../utils/getFilteredObject';

export interface currenciesState {
  data: any;
  rawData: any;
  isLoading: true | false;
  error: string;
}

const initialState: currenciesState = {
  data: null,
  rawData: null,
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
    setRawData: (state, action) => {
      state.rawData = action.payload;
    },
    setFilteredData: (state, action) => {
      state.data = {
        ...state.rawData,
        Valute: { ...getFilteredObject(state.rawData.Valute, action.payload) },
      };
    },
  },
});

export const { setData, setRawData, setFilteredData } = currenciesSlice.actions;

export const selectCurrencies = (state: RootState) => state.currencies;

let timerId: ReturnType<typeof setTimeout>;
export const setCurrencies = (): AppThunk => (dispatch, getState) => {
  timerId = setTimeout(function request() {
    api
      .getLatestCurrencies()
      .then((res) => {
        const searchValue = getState().search.value;
        const obj = getFilteredObject(res.Valute, searchValue);
        dispatch(
          setData({
            data: { ...res, Valute: { ...obj } },
            isLoading: false,
            error: '',
          })
        );
        dispatch(setRawData(res));
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
    timerId = setTimeout(request, 20000);
  }, 0);
};

export const stopCurrencies = () => clearTimeout(timerId);

export default currenciesSlice.reducer;
