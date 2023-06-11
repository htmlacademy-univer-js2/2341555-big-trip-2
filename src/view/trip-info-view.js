import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view';

const addOffersPrices = (eventType, eventOffers, allOffers) => {
  const allOffersForType = allOffers.find((item) => item.type === eventType).offers;
  const selectedOfferPrices = eventOffers.map((offer) => allOffersForType.find((item) => item.id === offer).price);
  return selectedOfferPrices.reduce((sum, price) => sum + price, 0);
};

const addDestinationName = (destination, allDestinations) =>
  allDestinations.find((item) => item.id === destination).name;

const getTripDestinationNames = (events) => {
  const tripDestinationNames = events.map((event) => event.destinationName);
  const uniqueNames = Array.from(new Set(tripDestinationNames));
  switch (uniqueNames.length) {
    case 1:
      return `${uniqueNames[0]}`;
    case 2:
      return `${uniqueNames[0]} &mdash; ${uniqueNames[1]}`;
    case 3:
      return `${uniqueNames[0]} &mdash; ${uniqueNames[1]} &mdash; ${uniqueNames[2]}`;
    default:
      return `${uniqueNames[0]} &mdash; ... &mdash;${uniqueNames[uniqueNames.length - 1]}`;
  }

};


const getTotalPrice = (events) => {
  const totalBasePrice = events.reduce((total, event) => total + event.basePrice, 0);
  const totalOffersPrice = events.reduce((total, event) => total + event.offerPrices, 0);

  return totalBasePrice + totalOffersPrice;
};

const getTripDates = (events) => {
  const startTripDate = events[0].startDate;
  const endTripDate = events[events.length - 1].endDate;

  if (dayjs(startTripDate).month() === dayjs(endTripDate).month()) {
    return `${dayjs(startTripDate).format('MMM D')}&nbsp;&mdash;&nbsp;${dayjs(endTripDate).format('DD')}`;
  }

  return `${dayjs(startTripDate).format('MMM D')}&nbsp;&mdash;&nbsp;${dayjs(endTripDate).format('MMM D')}`;
};

const createTripInfoTemplate = (events, allOffers, allDestinations) => {
  const tripEvents = events.map((event) => ({
    ...event,
    offerPrices: addOffersPrices(event.type, event.offers, allOffers),
    destinationName: addDestinationName(event.destination, allDestinations)
  }));

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${getTripDestinationNames(tripEvents)}</h1>
              <p class="trip-info__dates">${getTripDates(tripEvents)}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(tripEvents)}</span>
            </p>
          </section>`;
};

export default class TripInfoView extends AbstractView {
  #events = null;
  #allOffers = null;
  #allDestinations = null;

  constructor(events, allOffers, allDestinations) {
    super();
    this.#events = events;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
  }

  get template() {
    return createTripInfoTemplate(this.#events, this.#allOffers, this.#allDestinations);
  }
}
