import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    Main: undefined;
    EventDetailScreen: { eventId: string };
    VenueDetailScreen: { venueId: string };
    ProductDetailScreen: { productId: string };
    CreateEventScreen: { event: EventType | null, method: "create" | "update" };
    CreateVenueScreen: { venue: VenueType | null, method: "create" | "update" };
    CreatePostScreen: { post: PostType | null, method: "create" | "update" };
    ErrorScreen: undefined;
    CartScreen: undefined;
    Home: undefined;
    AuthScreen: undefined;
    LoginScreen: undefined;
    SignUpScreen: undefined;
    ForgotPasswordScreen: undefined;
    ChatDashboardScreen: undefined;
    ChatScreen: { user: userType };
    ProfileScreen: { userId: string };
    VenueScreen: undefined;
    SearchScreen: { type: SearchType };
    NotificationScreen: undefined;
    Details: { userId: number; userName: string };
    BottomTabBar: undefined
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

export type SearchType = "user" | "venue" | "event";

export type userType = {
    name: string,
    email: string,
    password: string,
    bio: string,
    profilePic: { url: string, public_id: string },
    role: "admin" | "user",
    FCMToken: string,
    _id: string,
    chats: userType[];
    active: string,
    joinedEvents: string[] | EventType[],
}

type location = { latitude: string, longitude: string };
type address = { state: string, city: string, area: string };
export type LoaderType = "loading" | "idle" | "success" | "error"
export type pic = { url: string, public_id: string, success: boolean }

export type EventType = {
    title: string,
    description: string,
    time: { start: string, end: string },
    date: string,
    pic: any,
    host: userType | string,
    participants: [],
    venue: VenueType | string,
    headcount: string,
    category: string,
    status?: "pending" | "rejected" | "accepted",
    _id: string
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

export type CommentType = { user: userType, createdAt: string, comment: string, star: string }
export type PostCommentType = { user: userType | string, createdAt?: string, comment: string, post: PostType | string, _id?: string }

export type VenueType = {
    title: string,
    description: string,
    pic: pic,
    location: location,
    address: address,
    bookedEvents: any,
    slots: slotType[],
    reviews: []
    _id: string
}

export type PostType = {
    _id: string,
    user: userType | string,
    event: EventType | string,
    file: {
        fileType?: "image" | "video",
        url?: string,
        public_id?: string,
        uri?: string,
        name?: string,
        type?: string
    },
    title: string,
    description: string,
    tags: string[],
    likes: userType[] | null,
    comments: string[]

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

export type ProductType = {
    _id: string,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    category: string,
    sizes?: string[],
    pic: string,
} | null

export type ProductSizesType = "XS" | "S" | "M" | "L" | "XL" | "L"

export type CartProductType = {
    product: ProductType,
    quantity: number,
    selectedsize?: ProductSizesType,

}

export type CartType = ProductType[];

export type UserAddressType = {
    area: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    phone: string,
}

export type ProductOrderType = { product: ProductType | string, quantity: number, size: "XS" | "S" | "M" | "L" | "XL" | "L" }

export type OrderType = {
    user: userType | string,
    products: ProductOrderType[],
    totalAmount: number,
    paymentStatus: 'pending' | 'paid' | 'failed',
    orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled',
    shippingAddress: UserAddressType,
    paymentMethod: 'UPI' | 'COD'
}

export type MessageType = {
    sender: userType,
    receiver: userType,
    message: { value: string, type: string },
    timestamp: string,
    status: string
    read: boolean
}