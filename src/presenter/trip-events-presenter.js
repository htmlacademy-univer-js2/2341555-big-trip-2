import TripEventsView from '../view/trip-events-view.js';
import ListRoutePointView from '../view/list-route-point-view.js';
import FormCreatingView from '../view/form-creating-view.js';
import FormEditingView from '../view/form-editing-view.js';
import SortingView from '../view/sorting-view.js';
import { render } from '../render.js';

export default class TripEventsPresenter {
  constructor() {
    this.eventsList = new TripEventsView();
  }

  init(tripContainer) {
    this.tripContainer = tripContainer;

    render(new SortingView(), this.tripContainer);
    render(this.eventsList, this.tripContainer);
    render(new FormEditingView(), this.eventsList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new ListRoutePointView(), this.eventsList.getElement());
    }

    render(new FormCreatingView(), this.eventsList.getElement());
  }
}
