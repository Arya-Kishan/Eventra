import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '@store/store';
import {userType} from 'types/AppTypes';

// Define a type for the slice state
interface chatState {
  value: number;
  unseenMessageCount: number;
  messages: [];
  selectedOppoentUser: null | userType;
  allConversations: null | [];
  opponentActiveChatId: any;
}

// Define the initial state using that type
const initialState: chatState = {
  value: 0,
  unseenMessageCount: 0,
  messages: [],
  selectedOppoentUser: null,
  allConversations: null,
  opponentActiveChatId: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUnseenMessageCount: (
      state,
      action: PayloadAction<{count: number; type: 'inc' | 'dec' | 'set'}>,
    ) => {
      const {count, type} = action.payload;
      let unseenCounts = 0;
      if (type === 'inc') unseenCounts = state.unseenMessageCount + count;
      if (type === 'dec') unseenCounts = state.unseenMessageCount - count;
      if (type === 'set') unseenCounts = count;
      state.unseenMessageCount = unseenCounts;
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
    setAllConversations: (state, action: PayloadAction<any>) => {
      state.allConversations = action.payload;
    },
    updateAllConversations: (state, action: PayloadAction<any>) => {
      const {conversationId, userId, type = 'count'} = action.payload;

      const conversation: any = state.allConversations!.find(
        (c: any) => c._id === conversationId,
      );

      if (conversation) {
        conversation.unseenCount[userId] =
          type === 'count' ? conversation.unseenCount[userId] + 1 : 0;
      }
    },
    setOpponentActiveChatId: (state, action: PayloadAction<any>) => {
      state.opponentActiveChatId = action.payload;
    },
  },
});

export const {
  setUnseenMessageCount,
  setMessages,
  setSelectedOpponentUser,
  setAllConversations,
  updateAllConversations,
  setOpponentActiveChatId,
} = chatSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.chat.value;

export default chatSlice.reducer;
