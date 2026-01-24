import {SpotLightType} from 'types/AppTypes';
import {AppConstants} from './AppConstants';

export const AppTemporaryContants: {
  spotLightsArr: SpotLightType[];
  temporaryVenueArr: any;
  storeCategoryArr: any;
  jeansArr: any;
  shirtsArr: any;
  shoesArr: any;
} = {
  spotLightsArr: [
    {
      title: 'JJK',
      description: 'JJK Anime Event',
      pic: {
        url: 'https://i.pinimg.com/736x/38/03/30/3803309c8909b8258cc0ab95be5274d8.jpg',
        public_id: '',
      },
      category: 'event',
      categoryId: '69723242f296def1471bc140',
      deepLink: `https://eventra-website.vercel.app/event/share/69723242f296def1471bc140`,
    },
    {
      title: 'Gojo',
      description: 'Saturo Gojo',
      pic: {
        url: 'https://i.pinimg.com/736x/e2/46/49/e2464929af2884ac69d135b56dc85e5c.jpg',
        public_id: '',
      },
      category: 'event',
      categoryId: '69723242f296def1471bc140',
      deepLink: `https://eventra-website.vercel.app/event/share/69723242f296def1471bc140`,
    },
    {
      title: 'Sukuna',
      description: 'Sukuna is Devil',
      pic: {
        url: 'https://i.pinimg.com/736x/04/5b/91/045b9179ebdede69c3aba42195fd47b2.jpg',
        public_id: '',
      },
      category: 'event',
      categoryId: '69723242f296def1471bc140',
      deepLink: `https://eventra-website.vercel.app/event/share/69723242f296def1471bc140`,
    },
    {
      title: 'Demon',
      description: 'Demon Event',
      pic: {
        url: 'https://i.pinimg.com/736x/5c/df/b0/5cdfb05618cff753f93231358f475dd1.jpg',
        public_id: '',
      },
      category: 'event',
      categoryId: '69723242f296def1471bc140',
      deepLink: `https://eventra-website.vercel.app/event/share/69723242f296def1471bc140`,
    },
    {
      title: 'HUnter',
      description: 'Hunter Event',
      pic: {
        url: 'https://i.pinimg.com/736x/1d/a2/3e/1da23ed92f033baae09b7cd6eb527314.jpg',
        public_id: '',
      },
      category: 'event',
      categoryId: '69723242f296def1471bc140',
      deepLink: `https://eventra-website.vercel.app/event/share/69723242f296def1471bc140`,
    },
  ],
  temporaryVenueArr: [
    {
      title: 'International Band Music Concert',
      _id: 1,
      description:
        "A music concert is a live performance of music by one or more musicians or singers for an audience. It's a public event where music is played in front of a crowd, whether it's a single musician, a band, a choir, or an orchestra. A concert, often known informally as a gig or show, is a live performance of music in front",
      location: {latitude: '', longitude: ''},
      address: {state: 'UP', city: 'Patna', area: ''},
      pic: 'https://i.pinimg.com/736x/f2/df/c7/f2dfc73493b1e9a8c3c8c71bc0336b77.jpg',
      bookedEvents: [],
      slots: [
        {
          isBooked: true,
          time: {
            start: new Date().toISOString(),
            end: new Date().toISOString(),
          },
          eventId: 12,
        },
        {
          isBooked: false,
          time: {
            start: new Date().toISOString(),
            end: new Date().toISOString(),
          },
          eventId: 12,
        },
        {
          isBooked: false,
          time: {
            start: new Date().toISOString(),
            end: new Date().toISOString(),
          },
          eventId: 12,
        },
        {
          isBooked: false,
          time: {
            start: new Date().toISOString(),
            end: new Date().toISOString(),
          },
          eventId: 12,
        },
        {
          isBooked: true,
          time: {
            start: new Date().toISOString(),
            end: new Date().toISOString(),
          },
          eventId: 12,
        },
        {
          isBooked: false,
          time: {
            start: new Date().toISOString(),
            end: new Date().toISOString(),
          },
          eventId: 12,
        },
      ],
    },
    {
      _id: 2,
      title: 'Natinal Venue Arya House',
      description:
        "A music concert is a live performance of music by one or more musicians or singers for an audience. It's a public event where music is played in front of a crowd, whether it's a single musician, a band, a choir, or an orchestra. A concert, often known informally as a gig or show, is a live performance of music in front",
      location: {latitude: '', longitude: ''},
      address: {state: 'UP', city: 'Patna', area: ''},
      pic: 'https://i.pinimg.com/736x/f2/df/c7/f2dfc73493b1e9a8c3c8c71bc0336b77.jpg',
      bookedEvents: [],
      slots: [],
    },
    {
      _id: 3,
      title: 'Vasudha part center',
      description:
        "A music concert is a live performance of music by one or more musicians or singers for an audience. It's a public event where music is played in front of a crowd, whether it's a single musician, a band, a choir, or an orchestra. A concert, often known informally as a gig or show, is a live performance of music in front",
      location: {latitude: '', longitude: ''},
      address: {state: 'UP', city: 'Patna', area: ''},
      pic: 'https://i.pinimg.com/736x/f2/df/c7/f2dfc73493b1e9a8c3c8c71bc0336b77.jpg',
      bookedEvents: [],
      slots: [],
    },
    {
      _id: 4,
      title: 'Bottle Open Part Up',
      description:
        "A music concert is a live performance of music by one or more musicians or singers for an audience. It's a public event where music is played in front of a crowd, whether it's a single musician, a band, a choir, or an orchestra. A concert, often known informally as a gig or show, is a live performance of music in front",
      location: {latitude: '', longitude: ''},
      address: {state: 'UP', city: 'Patna', area: ''},
      pic: 'https://i.pinimg.com/736x/f2/df/c7/f2dfc73493b1e9a8c3c8c71bc0336b77.jpg',
      bookedEvents: [],
      slots: [],
    },
    {
      _id: 5,
      title: 'House Of Part People',
      description:
        "A music concert is a live performance of music by one or more musicians or singers for an audience. It's a public event where music is played in front of a crowd, whether it's a single musician, a band, a choir, or an orchestra. A concert, often known informally as a gig or show, is a live performance of music in front",
      location: {latitude: '', longitude: ''},
      address: {state: 'UP', city: 'Patna', area: ''},
      pic: 'https://i.pinimg.com/736x/f2/df/c7/f2dfc73493b1e9a8c3c8c71bc0336b77.jpg',
      bookedEvents: [],
      slots: [],
    },
    {
      _id: 6,
      title: 'Kamla Pasand Paan House',
      description:
        "A music concert is a live performance of music by one or more musicians or singers for an audience. It's a public event where music is played in front of a crowd, whether it's a single musician, a band, a choir, or an orchestra. A concert, often known informally as a gig or show, is a live performance of music in front",
      location: {latitude: '', longitude: ''},
      address: {state: 'UP', city: 'Patna', area: ''},
      pic: 'https://i.pinimg.com/736x/f2/df/c7/f2dfc73493b1e9a8c3c8c71bc0336b77.jpg',
      bookedEvents: [],
      slots: [],
    },
  ],
  storeCategoryArr: [
    {
      title: 'shoes',
      pic: 'https://cdn-icons-png.flaticon.com/128/5144/5144570.png',
    },
    {
      title: 'shirt',
      pic: 'https://cdn-icons-png.flaticon.com/128/11205/11205893.png',
    },
    {
      title: 'watch',
      pic: 'https://cdn-icons-png.flaticon.com/128/7361/7361546.png',
    },
    {
      title: 'glass',
      pic: 'https://cdn-icons-png.flaticon.com/128/11397/11397689.png',
    },
    {
      title: 'bag',
      pic: 'https://cdn-icons-png.flaticon.com/128/10252/10252887.png',
    },
    {
      title: 'jeans',
      pic: 'https://cdn-icons-png.flaticon.com/128/2806/2806131.png',
    },
    {
      title: 'beauty',
      pic: 'https://cdn-icons-png.flaticon.com/128/1005/1005684.png',
    },
  ],
  jeansArr: [
    'https://m.media-amazon.com/images/I/71AnYSyWDML._SY879_.jpg',
    'https://m.media-amazon.com/images/I/41NQV6nSbuL._AC_UF480,600_SR480,600_.jpg00',
    'https://m.media-amazon.com/images/I/41yKDa5HLsL._AC_UF480,600_SR480,600_.jpg',
    'https://m.media-amazon.com/images/I/41-kL-S3cbL._AC_UF480,600_SR480,600_.jpg',
    'https://m.media-amazon.com/images/I/31fPcM+zNaL._AC_UF480,600_SR480,600_.jpg',
    'https://m.media-amazon.com/images/I/31C4B7WIUSL._AC_UF480,600_SR480,600_.jpg',
    'https://m.media-amazon.com/images/I/41o8kAE4HCL._AC_UF480,600_SR480,600_.jpg',
    'https://m.media-amazon.com/images/I/31lfo6GucnL._AC_UF480,600_SR480,600_.jpg',
    'https://m.media-amazon.com/images/I/41MU90lfp2L._AC_UF480,600_SR480,600_.jpg',
    'https://m.media-amazon.com/images/I/417mkjTvGuL._AC_UF480,600_SR480,600_.jpg',
    'https://m.media-amazon.com/images/I/41yKDa5HLsL._AC_UF480,600_SR480,600_.jpg',
  ],
  shirtsArr: [
    'https://m.media-amazon.com/images/I/61oDyGf6qEL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/71I2JYu-YBL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/61YZXT3gSsL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/51-pLhPHoBL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/61SDTiZdvHL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/71LnycrT7qL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/71BfHmJgTtL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/611T65UTJ5L._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/71I9xt+IKRL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/711aUSDW66L._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/51eU9wZBwpL._AC_UL480_FMwebp_QL65_.jpg',
  ],
  shoesArr: [
    'https://m.media-amazon.com/images/I/51j4uFfPM6L._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/81ayrEYxUyL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/7137xGl01uL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/610fN3RyKFL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/41kQEFwcTzL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/61utX8kBDlL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/61pYhDY8fxL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/71Ij8W5U9vL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/61ocUOwG80L._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/61-1k3jfZmL._AC_UL480_FMwebp_QL65_.jpg',
  ],
};
