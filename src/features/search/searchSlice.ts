import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  value: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = searchSlice.actions;
export const selectSearch = (state: RootState) => state.search;

export default searchSlice.reducer;
