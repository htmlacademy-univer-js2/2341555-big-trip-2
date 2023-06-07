import { getRandomInteger } from '../utils';
import { TYPES, OFFER_TITLES } from './const';

const generateOfferTypes = () => TYPES.map((type) => (
  {
    type,
    offers: [... new Set(Array.from(
      { length: getRandomInteger(1, OFFER_TITLES.length) },
      () => getRandomInteger(1, OFFER_TITLES.length - 1)))
    ],
  })
);

const generateOffersArray = () => OFFER_TITLES.map((title, index) => (
  {
    id: index + 1,
    title,
    price: getRandomInteger(50, 300)
  })
);

const OFFERS = generateOffersArray();
const OFFERS_BY_TYPE = generateOfferTypes();

export { OFFERS, OFFERS_BY_TYPE };
