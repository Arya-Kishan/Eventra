import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterSlice'
import eventReducer from './reducers/eventSlice'
import userReducer from './reducers/userSlice'
import venueReducer from './reducers/venueSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        event: eventReducer,
        user: userReducer,
        venue: venueReducer,
    },
    devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch