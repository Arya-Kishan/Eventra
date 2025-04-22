import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@store/store'
import { userType } from 'types/AppTypes'

// Define a type for the slice state
interface UserState {
    value: number,
    loggedInUser: userType | null
}

// Define the initial state using that type
const initialState: UserState = {
    value: 0,
    loggedInUser: {
        name: "Arya",
        email: "arya12345kishan@gmail.com",
        password: "12345",
        bio: "I am a good boy",
        profilePic: "https://i.pinimg.com/474x/0b/b5/83/0bb583aad899151f55967bb374cb29f8.jpg",
        role: "admin",
        FCMToken: "AC12XSFFQ223DFDDDGF01SS",
        _id: "68027b81ecf0300d691eaf8a"
    }
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setLoggedInUser: (state, action: PayloadAction<userType>) => {
            state.loggedInUser = action.payload
        },
    },
})

export const { setLoggedInUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.value

export default userSlice.reducer