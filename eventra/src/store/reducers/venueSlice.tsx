import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '@store/store';
import {LoaderType, VenueType} from 'types/AppTypes';

// Define a type for the slice state
interface VenueState {
  value: number;
  venueLoader: LoaderType;
  allVenues: VenueType[] | null;
}

// Define the initial state using that type
const initialState: VenueState = {
  value: 0,
  allVenues: null,
  venueLoader: 'idle',
};

export const venueSlice = createSlice({
  name: 'venue',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAllVenues: (state, action: PayloadAction<VenueType[]>) => {
      state.allVenues = action.payload;
    },
    setVenueLoader: (state, action: PayloadAction<LoaderType>) => {
      state.venueLoader = action.payload;
    },
  },
});

export const {setAllVenues, setVenueLoader} = venueSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.venue.value;

export default venueSlice.reducer;
