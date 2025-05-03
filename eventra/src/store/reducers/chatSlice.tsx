import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@store/store'

// Define a type for the slice state
interface chatState {
  value: number,
  unOpenedMessages: null | [],
  unSeenMessages: null | [],
  messages: []
}

// Define the initial state using that type
const initialState: chatState = {
  value: 0,
  unOpenedMessages: null,
  unSeenMessages: null,
  messages: []
}

export const chatSlice = createSlice({
  name: 'chat',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUnOpendedMessages: (state, action: PayloadAction<any>) => {
      state.unOpenedMessages += action.payload
    },
    setUnSeenMessages: (state, action: PayloadAction<any>) => {
      state.unSeenMessages = action.payload
    },
    setMessages: (state, action: PayloadAction<any>) => {
      state.messages = action.payload
    },
  },
})

export const { setUnSeenMessages, setUnOpendedMessages, setMessages } = chatSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.chat.value

export default chatSlice.reducer