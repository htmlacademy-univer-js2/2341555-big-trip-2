import { generateEvent } from '../mock/event';
import Observable from '../framework/observable';

export default class EventsModel extends Observable {
  #events = Array.from({ length: 5 }, generateEvent);

  get events() {
    return this.#events;
  }

  updateEvent = (updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addEvent = (updateType, update) => {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  };

  deleteEvent = (updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
