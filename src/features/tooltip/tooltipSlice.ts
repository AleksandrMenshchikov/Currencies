import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface tooltipState {
  x: number;
  y: number;
  text: string;
  display: string;
}

const initialState: tooltipState = {
  x: 0,
  y: 0,
  text: '',
  display: 'none'
};

const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
    setDisplay: (state, action) => {
      state.display = action.payload;
    },
  },
});

export const { setCoordinates, setText, setDisplay } = tooltipSlice.actions;

export const selectTooltip = (state: RootState) => state.tooltip;

export default tooltipSlice.reducer;
