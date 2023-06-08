import { render } from '../framework/render';
import EventsListView from '../view/events-list-view.js';
import SortingView from '../view/sorting-view';
import EmptyListView from '../view/empty-list-view';
import EventPresenter from './event-presenter';
import { update } from '../utils';

export default class RootPresenter {
  #rootContainer = null;
  #eventsModel = null;
  #events = null;
  #eventsList = new EventsListView();
  #sortComponent = new SortingView();
  #emptyList = new EmptyListView();
  #eventPresenter = new Map();

  constructor(rootContainer, eventsModel) {
    this.#rootContainer = rootContainer;
    this.#eventsModel = eventsModel;
  }

  init = () => {
    this.#events = [...this.#eventsModel.events];
    this.#renderEventsList();
  }

  #changePointHandler = (updatedEvent) => {
    this.#events = update(this.#events, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #switchModeHandler = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
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

  #renderSort = () => render(this.#sortComponent, this.#rootContainer);
  #renderEmptyList = () => render(this.#emptyList, this.#rootContainer);
}
