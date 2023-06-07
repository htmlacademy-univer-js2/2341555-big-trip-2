import { getRandomInteger, generateDates } from '../utils';
import { TYPES, DESTINATIONS, MIN_PRICE, MAX_PRICE } from './const';
import { OFFERS } from './offers';

const generateType = () => TYPES[getRandomInteger(0, TYPES.length - 1)];

const generateEvent = () => {
  const { startDate, endDate } = generateDates();
  return {
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    startDate,
    endDate,
    destination: getRandomInteger(1, DESTINATIONS.length),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: [... new Set(Array.from({ length: getRandomInteger(0, OFFERS.length) }, () => getRandomInteger(1, OFFERS.length - 1)))],
    type: generateType(),
  };
};

export { DESTINATIONS, generateEvent };
