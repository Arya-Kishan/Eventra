import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '@store/store';
import {MessageType, userType} from 'types/AppTypes';

// Define a type for the slice state
interface chatState {
  value: number;
  unOpenedMessages: any[];
  unSeenMessages: null | MessageType[];
  messages: [];
  selectedOppoentUser: null | userType;
}

// Define the initial state using that type
const initialState: chatState = {
  value: 0,
  unOpenedMessages: [],
  unSeenMessages: null,
  messages: [],
  selectedOppoentUser: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addUnOpendedMessages: (state, action: PayloadAction<any>) => {
      state.unOpenedMessages.push(action.payload);
    },
    setUnOpendedMessages: (state, action: PayloadAction<any>) => {
      state.unOpenedMessages = action.payload;
    },
    setUnSeenMessages: (state, action: PayloadAction<MessageType[]>) => {
      state.unSeenMessages = action.payload;
    },
    setMessages: (state, action: PayloadAction<any>) => {
      state.messages = action.payload;
    },
    setSelectedOpponentUser: (
      state,
      action: PayloadAction<userType | null>,
    ) => {
      state.selectedOppoentUser = action.payload;
    },
  },
});

export const {
  setUnSeenMessages,
  addUnOpendedMessages,
  setMessages,
  setSelectedOpponentUser,
  setUnOpendedMessages,
} = chatSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.chat.value;

export default chatSlice.reducer;
