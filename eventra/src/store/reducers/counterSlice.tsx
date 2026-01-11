import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '@store/store';
import {SharedValue, useSharedValue} from 'react-native-reanimated';

// Define a type for the slice state
interface CounterState {
  value: number;
  scrollOffset: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  scrollOffset: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setScrollOffset: (state, action: PayloadAction<number>) => {
      state.scrollOffset = action.payload;
    },
  },
});

export const {setScrollOffset} = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
