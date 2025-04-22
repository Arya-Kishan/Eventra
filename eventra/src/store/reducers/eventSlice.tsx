import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@store/store'
import { EventType, LoaderType } from 'types/AppTypes'

// Define a type for the slice state
interface eventState {
    value: number,
    title: string,
    description: string,
    time: { start: string, end: string },
    date: string,
    venue: string,
    pic: any,
    category: string,
    headcount: string,
    allEvents: EventType[] | null,
    upcomingEvents: EventType[] | null,
    eventLoader: LoaderType
}

// Define the initial state using that type
const initialState: eventState = {
    value: 0,
    title: "",
    description: "",
    time: { start: "", end: "" },
    date: "",
    venue: "68037ec56eb1526bb1e542ea",
    pic: "",
    category: "",
    headcount: "",
    allEvents: null,
    upcomingEvents: null,
    eventLoader: "idle"
}

export const eventSlice = createSlice({
    name: 'event',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        setTime: (state, action: PayloadAction<any>) => {
            state.time = action.payload
        },
        setDate: (state, action: PayloadAction<any>) => {
            state.date = action.payload
        },
        setVenue: (state, action: PayloadAction<string>) => {
            state.venue = action.payload
        },
        setPic: (state, action: PayloadAction<any>) => {
            state.pic = action.payload
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload
        },
        setHeadcount: (state, action: PayloadAction<string>) => {
            state.headcount = action.payload
        },
        setAllEvents: (state, action: PayloadAction<EventType[]>) => {
            state.allEvents = action.payload
        },
        setUpcomingEvents: (state, action: PayloadAction<EventType[]>) => {
            state.upcomingEvents = action.payload
        },
        setEventLoader: (state, action: PayloadAction<LoaderType>) => {
            state.eventLoader = action.payload
        }
    },
})

export const { setEventLoader, setTitle, setTime, setDate, setDescription, setHeadcount, setPic, setVenue, setCategory, setAllEvents, setUpcomingEvents } = eventSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.event.value

export default eventSlice.reducer