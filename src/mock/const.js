const TIME = {
  MINUTES: 60,
  HOURS: 24
};
const PRICE = {
  MIN: 100,
  MAX: 600
};
const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const OFFER_TITLES = ['Upgrade to a business class', 'Switch to comfort', 'Rent a car', 'Add breakfast', 'Order taxi', 'Add luggage'];
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

export {
  TIME,
  PRICE,
  TYPES,
  OFFER_TITLES,
  DESTINATIONS,
  FILTER_TYPES
};
