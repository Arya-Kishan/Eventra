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

export type NotificationType = {
    _id?: string,
    user?: string | userType,
    title: String,
    body: String,
    notification_type: "like" | "comment" | "booking",
    link?: string,
    isRead?: boolean
}

export type SpotLightType = {
    title: string,
    description: string,
    pic: { url: string, public_id: string },
    category: "event" | "venue" | "product" | "post",
    categoryId: string
}