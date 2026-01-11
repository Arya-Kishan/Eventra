import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '@store/store';
import {ProductType} from 'types/AppTypes';

// Define a type for the slice state
interface ProductState {
  value: number;
  cart: ProductType[] | null;
}

// Define the initial state using that type
const initialState: ProductState = {
  value: 0,
  cart: null,
};

export const productSlice = createSlice({
  name: 'product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ProductType[]>) => {
      state.cart = action.payload;
    },
  },
});

export const {setCart} = productSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.product.value;

export default productSlice.reducer;
