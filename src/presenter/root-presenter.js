import EditFormView from '../view/edit-form-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import { render } from '../render.js';

export default class RootPresenter {
  constructor() {
    this._rootContainer = null;
    this._eventsModel = null;
    this._events = null;
    this._eventList = new EventsListView();
  }

  _renderEvent(event) {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EditFormView(event);

    const eventToEdit = () => {
      this._eventList.element.replaceChild(eventEditComponent.element, eventComponent.element);
    };

    const editToEvent = () => {
      this._eventList.element.replaceChild(eventComponent.element, eventEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        editToEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      eventToEdit();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      editToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.element.querySelector('.event__save-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      editToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(eventComponent, this._eventList.element);
  }

  init(rootContainer, eventsModel) {
    this._rootContainer = rootContainer;
    this._eventsModel = eventsModel;
    this._events = [...this._eventsModel.events];
    render(this._eventList, this._rootContainer);
    this._events.forEach((event) => this._renderEvent(event));
  }
}
