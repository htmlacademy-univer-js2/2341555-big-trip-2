import { render, replace, remove } from '../framework/render.js';
import EventView from '../view/event-view.js';
import EditFormView from '../view/edit-form-view';

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

export default class EventPresenter {
  #eventsListContainer;
  #changeData;
  #switchMode;
  #eventComponent;
  #editComponent;
  #event;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeData, switchMode) {
    this.#eventsListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#switchMode = switchMode;
  }

  init = (event) => {
    this.#event = event;
    const previousEventComponent = this.#eventComponent;
    const previousEventEditComponent = this.#editComponent;
    this.#eventComponent = new EventView(event);
    this.#eventComponent.setRollUpHandler(this.#handleEditClick);
    this.#eventComponent.setFavoriteHandler(this.#handleFavoriteClick);
    this.#editComponent = new EditFormView(event);
    this.#editComponent.setRollDownHandler(this.#handleEventClick);
    this.#editComponent.setSaveHandler(this.#handleEventClick);

    if (!previousEventComponent || !previousEventEditComponent) {
      render(this.#eventComponent, this.#eventsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, previousEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editComponent, previousEventEditComponent);
    }

    remove(previousEventComponent);
    remove(previousEventEditComponent);
  };

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#editComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editToEvent();
    }
  };

  #eventToEdit = () => {
    replace(this.#editComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#switchMode();
    this.#mode = Mode.EDITING;
  };

  #editToEvent = () => {
    replace(this.#eventComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editToEvent();
    }
  };

  #handleFavoriteClick = () => this.#changeData({ ...this.#event, isFavorite: !this.#event.isFavorite });
  #handleEditClick = () => this.#eventToEdit();
  #handleEventClick = () => this.#editToEvent();
}
