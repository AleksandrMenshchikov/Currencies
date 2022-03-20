import { createSlice } from '@reduxjs/toolkit';
import { getCurrentDate } from '../../utils/getCurrentDate';
import { AppThunk, RootState } from '../store';

export interface currentDateState {
  value: string;
}

const initialState: currentDateState = {
  value: getCurrentDate(),
};

const currentDateSlice = createSlice({
  name: 'currentDate',
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { setTime } = currentDateSlice.actions;

export const selectCurrentDate = (state: RootState) => state.currentDate.value;

export const setCurrentDate = (): AppThunk => (dispatch) => {
  dispatch(setTime(getCurrentDate()));
};

export default currentDateSlice.reducer;
