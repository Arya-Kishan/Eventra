import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@store/store'
import { NotificationType, userType } from 'types/AppTypes'

// Define a type for the slice state
interface UserState {
    value: number,
    loggedInUser: userType | null,
    allNotifications: NotificationType[] | null,
}

// Define the initial state using that type
const initialState: UserState = {
    value: 0,
    loggedInUser: null,
    allNotifications: null
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        resetLogout: (state) => initialState,
        setLoggedInUser: (state, action: PayloadAction<userType | null>) => {
            state.loggedInUser = action.payload
        },
        setAllNotifications: (state, action: PayloadAction<NotificationType[] | null>) => {
            state.allNotifications = action.payload
        },
        addNotification: (state, action: PayloadAction<NotificationType>) => {
            state.allNotifications?.push(action.payload);
        },
    },
})

export const { setLoggedInUser, resetLogout, setAllNotifications, addNotification } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.value

export default userSlice.reducer