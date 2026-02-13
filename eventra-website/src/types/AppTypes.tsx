import { ReactNode } from "react";

export type TabParamList = {
  Home: undefined;
  Social: undefined; // example param
  Event: undefined;
  Store: undefined;
  Profile: { userId?: string };
};

export type ApiReturnType = {
  success: boolean;
  data: any;
  message: string;
  error: string | null;
};

export type SearchType = "user" | "venue" | "event";

export type userType = {
  name: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  phone?: string;
  password?: string;
  bio?: string;
  profilePic?: { url: string; public_id: string };
  role?: "admin" | "user";
  FCMToken?: string;
  _id: string;
  chats?: userType[];
  active?: string;
  isEmailVerified?: boolean;
  joinedEvents?: string[] | EventType[];
  location?: { type: string; coordinates: [string, string] };
  address?: {
    area: string;
    state: string;
    country: string;
    postalCode: string;
  };
  authType: "google" | "manual";
};

export type location = { latitude: string; longitude: string };
export type locationModel = { type: string; coordinates: [string, string] };
export type address = { state: string; city: string; area: string };
export type switchTabType = [
  { title: Element; icon: ReactNode; value: string },
  { title: Element; icon: ReactNode; value: string },
];
export type LoaderType = "loading" | "idle" | "success" | "error";
export type pic = { url: string; public_id: string; success: boolean };
export type addressesType = {
  country: string;
  state: string;
  area: string;
  postalCode: string;
  coords: [string, string];
};

export type EventType = {
  title: string;
  description: string;
  time: { start: string; end: string };
  date: string;
  pic: any;
  price?: number;
  host: userType | string;
  participants: [];
  venue: VenueType | string;
  headcount: string;
  category: string;
  isCancelled?: boolean;
  status?: "pending" | "rejected" | "accepted" | "cancelled";
  _id: string;
  address?: {
    area: string;
    state: string;
    country: string;
    postalCode: string;
  };
  location?: {
    type: {
      type: string;
    };
    coordinates: [number, number];
  };
  createdAt?: string;
  updatedAt?: string;
};

export type slotType = {
  isBooked?: boolean;
  time: { start: string; end: string };
  eventId?: any;
  _id?: string;
};

export type CommentType = {
  user: userType;
  createdAt: string;
  comment: string;
  star: string;
};
export type PostCommentType = {
  user: userType | string;
  createdAt?: string;
  comment: string;
  post: PostType | string;
  _id?: string;
};

export type VenueType = {
  title: string;
  description: string;
  pic: pic;
  price?: number;
  bookedEvents: any;
  slots: slotType[];
  host?: userType | string;
  reviews: [];
  _id: string;
  location?: { type: string; coordinates: [string, string] };
  address?: {
    area: string;
    state: string;
    country: string;
    postalCode: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

export type PostType = {
  _id: string;
  user: userType | string;
  event: EventType | string;
  file: {
    fileType?: "image" | "video";
    url?: string;
    public_id?: string;
    uri?: string;
    name?: string;
    type?: string;
  };
  title: string;
  description: string;
  tags: string[];
  likes: userType[] | null;
  comments: string[];
  createdAt: string;
  updatedAt: string;
};

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

export type UserAddressType = {
  area: string;
  state: string;
  postalCode: string;
  country: string;
};

export type MessageType = {
  sender: userType;
  receiver: userType;
  message: { value: string; type: string };
  timestamp: string;
  status: string;
  read: boolean;
  createdAt: string;
  deliveredAt: string;
  seenAt: string;
};

export type NotificationType = {
  _id?: string;
  user?: string | userType;
  title: string;
  body: string;
  notification_type: "like" | "comment" | "booking";
  link?: string;
  isRead?: boolean;
};

export type SpotLightType = {
  title: string;
  description: string;
  pic: { url: string; public_id: string };
  category: "event" | "venue" | "product" | "post";
  categoryId: string;
  deepLink?: string;
  _id?: string;
  isApproved: boolean;
};

export type BannerType = {
  image: string;
  link?: string;
  title: string;
  description: string;
  _id?: string;
};

export type notificationFeatureType =
  | "main"
  | "event"
  | "create_event"
  | "create_venue"
  | "create_post"
  | "cart"
  | "post"
  | "home"
  | "auth"
  | "login"
  | "signup"
  | "forgot_password"
  | "chat_dashboard"
  | "chat"
  | "profile"
  | "venue"
  | "search"
  | "notification"
  | "Details"
  | "BottomTabBar"
  | "PracticeScreen"
  | "complete_profile"
  | "email_verification";

export type openingFromType =
  | "cold"
  | "foreground"
  | "background"
  | "notification"
  | "pending";

export type ThreeDotBottomModalType = {
  dataArr: {
    title: string;
    description: string;
    icon: ReactNode;
    value: string;
  }[];
  show: boolean;
  setShow: (show: boolean) => void;
  onClick: (value: string) => void;
};

export type TimeDifference = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
};
