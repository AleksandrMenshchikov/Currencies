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

let timerId: ReturnType<typeof setTimeout>;
export const setCurrentDate = (): AppThunk => (dispatch) => {
  timerId = setTimeout(function tick() {
    dispatch(setTime(getCurrentDate()));
    timerId = setTimeout(tick, 1000);
  }, 1000);
};

export const stopCurrentDate = () => clearTimeout(timerId);

export default currentDateSlice.reducer;
