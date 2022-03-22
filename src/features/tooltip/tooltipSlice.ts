import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface tooltipState {
  x: number;
  y: number;
  text: string;
  opacity: number;
}

const initialState: tooltipState = {
  x: -50,
  y: 0,
  text: '',
  opacity: 0,
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
    setOpacity: (state, action) => {
      state.opacity = action.payload;
    },
  },
});

export const { setCoordinates, setText, setOpacity } = tooltipSlice.actions;

export const selectTooltip = (state: RootState) => state.tooltip;

export default tooltipSlice.reducer;
