import { render, RenderPosition, replace } from '../framework/render';
import EditFormView from '../view/edit-form-view.js';
import EventsListView from '../view/events-list-view.js';
import SortingView from '../view/sorting-view';
import EventView from '../view/event-view.js';
import EmptyListView from '../view/empty-list-view';

export default class RootPresenter {
  #rootContainer = null;
  #eventsModel = null;
  #events = null;
  #eventsList = new EventsListView();

  #renderEvent = (event) => {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EditFormView(event);

    const eventToEdit = () => replace(eventEditComponent, eventComponent);

    const editToEvent = () => replace(eventComponent, eventEditComponent);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        editToEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventComponent.setRollUpHandler(() => {
      eventToEdit();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setRollDownHandler(() => {
      editToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setSaveHandler(() => {
      editToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(eventComponent, this.#eventsList.element);
  };

  init = (rootContainer, eventsModel) => {
    this.#rootContainer = rootContainer;
    this.#eventsModel = eventsModel;
    this.#events = [...this.#eventsModel.events];
    render(this.#eventsList, this.#rootContainer);
    if (this.#events.length) {
      render(new SortingView(), this.#rootContainer, RenderPosition.AFTERBEGIN);
      this.#events.forEach((event) => this.#renderEvent(event));
    } else {
      render(new EmptyListView(), this.#rootContainer);
    }
  }
}
