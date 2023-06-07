import { getRandomInteger } from '../utils';
import { TYPES, OFFER_TITLES } from './const';

const generateOfferTypes = () => {
  const offerByTypes = [];
  for (let i = 0; i < TYPES.length; i++) {
    offerByTypes.push({
      type: TYPES[i],
      offers: [... new Set(Array.from({ length: getRandomInteger(1, OFFER_TITLES.length) }, () => getRandomInteger(1, OFFER_TITLES.length - 1)))]
    });
  }
  return offerByTypes;
};

const generateOffersArray = () => {
  const offers = [];

  for (let i = 0; i < OFFER_TITLES.length; i++) {
    offers.push({
      id: i + 1,
      title: OFFER_TITLES[i],
      price: getRandomInteger(50, 300)
    });
  }
  return offers;
};

const OFFERS = generateOffersArray();
const OFFERS_BY_TYPE = generateOfferTypes();

export { OFFERS, OFFERS_BY_TYPE };
