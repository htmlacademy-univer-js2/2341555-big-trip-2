import {render} from '../render.js';
import ListRoutePointView from '../view/list-route-point-view.js';
import FormEditingView from '../view/form-editing-view.js';
import SortingView from '../view/sorting-view.js';
import FormCreatingView from '../view/form-creating-view.js';
import TripEventsView from '../view/trip-events-view.js';


export default class TripEventsPresenter {
  constructor() {
    this.eventsList = new TripEventsView();
  }

  init (tripContainer, pointsModel, editingFormModel, destinationsModel) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
    this.points = [...this.pointsModel.getPoints()];
    this.destinations = destinationsModel.getDestinations();

    render(new SortingView(), this.tripContainer);
    render(this.eventsList, this.tripContainer);
    render(new FormEditingView(editingFormModel.getForm(), this.destinations), this.eventsList.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new ListRoutePointView(this.points[i], this.destinations), this.eventsList.getElement());
    }

    render(new FormCreatingView(), this.eventsList.getElement());
  }
}
