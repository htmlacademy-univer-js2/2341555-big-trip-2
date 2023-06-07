import { createElement } from '../render.js';

const createEventsListTemplate = () =>
  '<ul class="trip-events__list">\
  </ul>';

export default class EventsListView {
  constructor() {
    this._element = null;
  }

  get template() {
    return createEventsListTemplate();
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
