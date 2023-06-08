import { render, replace, remove } from '../framework/render.js';
import EventView from '../view/event-view.js';
import EditFormView from '../view/edit-form-view';

const MODE = {
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
  #mode = MODE.DEFAULT;

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
    this.#eventComponent.setRollUpHandler(this.#editClickHandler);
    this.#eventComponent.setFavoriteHandler(this.#favoriteClickHandler);
    this.#editComponent = new EditFormView(event);
    this.#editComponent.setRollDownHandler(this.#eventClickHandler);
    this.#editComponent.setSaveHandler(this.#saveHandler);

    if (!previousEventComponent || !previousEventEditComponent) {
      render(this.#eventComponent, this.#eventsListContainer);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#eventComponent, previousEventComponent);
    }

    if (this.#mode === MODE.EDITING) {
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
    if (this.#mode !== MODE.DEFAULT) {
      this.#editComponent.reset(this.#event);
      this.#editToEvent();
    }
  };

  #eventToEdit = () => {
    replace(this.#editComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#switchMode();
    this.#mode = MODE.EDITING;
  };

  #editToEvent = () => {
    replace(this.#eventComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = MODE.DEFAULT;
  };

  #escKeyDownHandler = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      this.#editComponent.reset(this.#event);
      this.#editToEvent();
    }
  };

  #favoriteClickHandler = () => this.#changeData({ ...this.#event, isFavorite: !this.#event.isFavorite });
  #editClickHandler = () => this.#eventToEdit();
  #eventClickHandler = () => {
    this.#editComponent.reset(this.#event);
    this.#editToEvent();
  };

  #saveHandler = (event) => {
    this.#changeData({ ...event });
    this.#editToEvent();
  }
}
