import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import currentDateReducer from './currentDate/currentDateSlice';
import currenciesReduser from './currencies/currenciesSlice';
import archiveCurrenciesReducer from './archiveCurrencies/archiveCurrenciesSlice';
import searchReducer from './search/searchSlice';
import tooltipReducer from './tooltip/tooltipSlice';

export const store = configureStore({
  reducer: {
    currentDate: currentDateReducer,
    currencies: currenciesReduser,
    tooltip: tooltipReducer,
    archiveCurrencies: archiveCurrenciesReducer,
    search: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
