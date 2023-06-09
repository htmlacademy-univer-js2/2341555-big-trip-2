import dayjs from 'dayjs';

const TIME = {
  MINUTES: 60,
  HOURS: 24
};
const PRICE = {
  MIN: 100,
  MAX: 600
};
const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const OFFER_TITLES = [
  'Add breakfast',
  'Add luggage',
  'Add late check-out',
  'Room with a beautiful view',
  'Order a taxi',
  'Switch to comfort',
  'Switch to business',
  'Rent a car',
  'Upgrade to business class',
  'Upgrade to Space+ Seat',
];
const DESTINATIONS = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'https://picsum.photos/300/200?r=1',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 2,
    description: 'Paris, is a overcrowded dirty city.',
    name: 'Paris',
    pictures: [
      {
        src: 'https://picsum.photos/300/200?r=2',
        description: 'Somewhere in Paris'
      }
    ]
  },
  {
    id: 3,
    description: 'Amsterdam, is a delightful free city',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'https://picsum.photos/300/200?r=3',
        description: 'Amsterdam or not'
      }
    ]
  }
];

const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const SORT_TYPES = {
  DEFAULT: 'day',
  TIME: 'time',
  PRICE: 'price'
};

const USER_ACTIONS = {
  UPDATE: 'UPDATE_POINT',
  ADD: 'ADD_POINT',
  DELETE: 'DELETE_POINT',
};

const UPDATE_TYPES = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const NEW_POINT = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: 1,
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

export {
  TIME,
  PRICE,
  TYPES,
  OFFER_TITLES,
  DESTINATIONS,
  FILTER_TYPES,
  SORT_TYPES,
  USER_ACTIONS,
  UPDATE_TYPES,
  NEW_POINT
};
