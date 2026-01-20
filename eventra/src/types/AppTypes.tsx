import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Social: undefined; // example param
  Event: undefined;
  Store: undefined;
  Profile: {userId?: string};
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<TabParamList> | undefined;
  EventDetailScreen: {eventId: string};
  CustomSplashScreen: undefined;
  VenueDetailScreen: {venueId: string};
  ProductDetailScreen: {productId: string};
  CreateEventScreen: {event: EventType | null; method: 'create' | 'update'};
  CreateVenueScreen: {venue: VenueType | null; method: 'create' | 'update'};
  CreatePostScreen: {post: PostType | null; method: 'create' | 'update'};
  ErrorScreen: undefined;
  CartScreen: undefined;
  SinglePostScreen: {postId: string};
  Home: undefined;
  AuthScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgotPasswordScreen: undefined;
  ChatDashboardScreen: undefined;
  ChatScreen: {user: userType; conversationId: string};
  ProfileScreen: {userId: string};
  VenueScreen: undefined;
  SearchScreen: {type: SearchType};
  NotificationScreen: undefined;
  Details: {userId: number; userName: string};
  BottomTabBar: undefined;
  PracticeScreen: undefined;
  CompleteProfileScreen: {user: userType};
  EmailVerificationScreen: {user: userType};
};

// Generic helpers
export type NavigationProps<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type RouteProps<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type ApiReturnType = {
  success: boolean;
  data: any;
  message: string;
  error: string | null;
};

export type SearchType = 'user' | 'venue' | 'event';

export type userType = {
  name: string;
  email: string;
  password?: string;
  bio?: string;
  profilePic?: {url: string; public_id: string};
  role?: 'admin' | 'user';
  FCMToken?: string;
  _id: string;
  chats?: userType[];
  active?: string;
  isEmailVerified?: boolean;
  joinedEvents?: string[] | EventType[];
  location?: {type: string; coordinates: [string, string]};
  address?: {
    area: string;
    state: string;
    country: string;
    postalCode: string;
  };
  authType: 'google' | 'manual';
};

type location = {latitude: string; longitude: string};
export type locationModel = {type: string; coordinates: [string, string]};
type address = {state: string; city: string; area: string};
export type switchTabType = [
  {title: Element; icon: any; value: string},
  {title: Element; icon: any; value: string},
];
export type LoaderType = 'loading' | 'idle' | 'success' | 'error';
export type pic = {url: string; public_id: string; success: boolean};
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
  time: {start: string; end: string};
  date: string;
  pic: any;
  host: userType | string;
  participants: [];
  venue: VenueType | string;
  headcount: string;
  category: string;
  status?: 'pending' | 'rejected' | 'accepted';
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
    coordinates: {
      type: [Number];
    };
  };
};

export type slotType = {
  isBooked?: boolean;
  time: {start: string; end: string};
  eventId?: any;
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
  bookedEvents: any;
  slots: slotType[];
  reviews: [];
  _id: string;
  location?: {type: string; coordinates: [string, string]};
  address?: {
    area: string;
    state: string;
    country: string;
    postalCode: string;
  };
};

export type PostType = {
  _id: string;
  user: userType | string;
  event: EventType | string;
  file: {
    fileType?: 'image' | 'video';
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
  message: {value: string; type: string};
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
  title: String;
  body: String;
  notification_type: 'like' | 'comment' | 'booking';
  link?: string;
  isRead?: boolean;
};

export type SpotLightType = {
  title: string;
  description: string;
  pic: {url: string; public_id: string};
  category: 'event' | 'venue' | 'product' | 'post';
  categoryId: string;
};

export type notificationFeatureType =
  | 'main'
  | 'event_detail'
  | 'venue_detail'
  | 'product_detail'
  | 'create_event'
  | 'create_venue'
  | 'create_post'
  | 'CustomSplashScreen'
  | 'error'
  | 'cart'
  | 'post'
  | 'home'
  | 'auth'
  | 'login'
  | 'signup'
  | 'forgot_password'
  | 'chat_dashboard'
  | 'chat'
  | 'profile'
  | 'venue'
  | 'search'
  | 'notification'
  | 'Details'
  | 'BottomTabBar'
  | 'PracticeScreen'
  | 'complete_profile'
  | 'email_verification';

export type openingFromType =
  | 'cold'
  | 'foreground'
  | 'background'
  | 'notification'
  | 'pending';
