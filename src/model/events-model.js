import { generateEvent } from '../mock/event';

export default class EventsModel {
  #events;
  constructor() {
    this.#events = Array.from({ length: 5 }, generateEvent);
  }

  get events() {
    return this.#events;
  }
}
