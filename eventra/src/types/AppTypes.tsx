import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    Main: undefined;
    EventDetailScreen: { event: EventType };
    VenueDetailScreen: { venue: VenueType };
    CreateEventScreen: { eventId: string | null };
    CreateVenueScreen: { venueId: string | null };
    ErrorScreen: undefined;
    Home: undefined;
    Details: { userId: number; userName: string };
};

// Generic helpers
export type NavigationProps<T extends keyof RootStackParamList> =
    NativeStackNavigationProp<RootStackParamList, T>;

export type RouteProps<T extends keyof RootStackParamList> =
    RouteProp<RootStackParamList, T>;


export type ApiReturnType = {
    success: boolean,
    data: any,
    message: string,
    error: string | null
}

export type userType = {
    name: string,
    email: string,
    password: string,
    bio: string,
    profilePic: string,
    role: "admin" | "user",
    FCMToken: string,
    _id: string,
}

type location = { latitude: string, longitude: string };
type address = { state: string, city: string, area: string };
export type LoaderType = "loading" | "idle" | "success" | "error"

export type EventType = {
    title: string,
    description: string,
    time: { start: string, end: string },
    date: string,
    pic: any,
    host: { name: string, _id: number, profilePic: string, bio: string } | string,
    participants: string[] | userType[],
    venue: VenueType | string,
    headCount: string,
    category: string,
    status?: "pending" | "rejected" | "accepted"
}

export type SpotLightType = {
    title: string,
    subTitle: string,
    pic: string
}

export type slotType = {
    isBooked?: boolean,
    time: { start: string, end: string },
    eventId?: any,
}

export type VenueType = {
    title: string,
    description: string,
    pic: string,
    location: location,
    address: address,
    bookedEvents: any,
    slots: slotType[],
}


export type AssetType = {
    fileName?: string;
    fileSize?: number;
    height?: number;
    width?: number;
    type?: string; // MIME type like 'image/jpeg'
    uri?: string;
    duration?: number;
    id?: string;
    base64?: string;
};
