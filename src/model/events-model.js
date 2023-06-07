import { generateEvent } from '../mock/event';

export default class EventsModel {
  constructor() {
    this._events = Array.from({ length: 3 }, generateEvent);
  }

  get events() {
    return this._events;
  }
}
