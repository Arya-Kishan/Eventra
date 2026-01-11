import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '@store/store';
import {PostType} from 'types/AppTypes';

// Define a type for the slice state
interface postState {
  value: number;
  allPosts: PostType[] | null;
}

// Define the initial state using that type
const initialState: postState = {
  value: 0,
  allPosts: null,
};

export const postSlice = createSlice({
  name: 'post',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAllPost: (state, action: PayloadAction<PostType[]>) => {
      state.allPosts = action.payload;
    },
  },
});

export const {setAllPost} = postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.post.value;

export default postSlice.reducer;
