import { render } from '../framework/render';
import EventsListView from '../view/events-list-view.js';
import SortingView from '../view/sorting-view';
import EmptyListView from '../view/empty-list-view';
import EventPresenter from './event-presenter';
import { sortByPrice, sortByDuration, sortByDate, update } from '../utils';
import { SORT_TYPES } from '../mock/const';

export default class RootPresenter {
  #rootContainer = null;
  #eventsModel = null;
  #events = null;
  #eventsList = new EventsListView();
  #sortComponent = new SortingView();
  #emptyList = new EmptyListView();
  #eventPresenter = new Map();
  #currentSortType = SORT_TYPES.DEFAULT;
  #initialEvents = [];

  constructor(rootContainer, eventsModel) {
    this.#rootContainer = rootContainer;
    this.#eventsModel = eventsModel;
  }

  init = () => {
    this.#initialEvents = [...this.#eventsModel.events];
    this.#events = [...this.#eventsModel.events].sort(sortByDate);
    this.#renderEventsList();
  }

  #changePointHandler = (updatedEvent) => {
    this.#events = update(this.#events, updatedEvent);
    this.#initialEvents = update(this.#initialEvents, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #switchModeHandler = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #sort = (sortType) => {
    switch (sortType) {
      case SORT_TYPES.PRICE:
        this.#events.sort(sortByPrice);
        break;
      case SORT_TYPES.TIME:
        this.#events.sort(sortByDuration);
        break;
      default:
        this.#events.sort(sortByDate);
    }

    this.#currentSortType = sortType;
  };

  #sortHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sort(sortType);
    this.#clearEventstList();
    this.#renderEventsList();
  };

  #renderEventsList = () => {
    if (this.#events.length) {
      this.#renderSort();
      render(this.#eventsList, this.#rootContainer);
      this.#renderEvents();
    } else {
      this.#renderEmptyList();
    }
  };

  #clearEventstList = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  };

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter(this.#eventsList.element,
      this.#changePointHandler, this.#switchModeHandler);
    eventPresenter.init(event);
    this.#eventPresenter.set(event.id, eventPresenter);
  };

  #renderEvents = () => {
    this.#events.forEach((event) => this.#renderEvent(event));
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#rootContainer);
    this.#sortComponent.setSortHandler(this.#sortHandler);
  };

  #renderEmptyList = () => render(this.#emptyList, this.#rootContainer);
}
