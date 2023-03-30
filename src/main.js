import FiltersView from './view/filters-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import { render } from './render.js';
import PointsModel from './model/points-model';
import EditingFormModel from './model/editing-form-model';
import DestinationModel from './model/destinations-model';

const siteHeader = document.querySelector('.trip-main');
const siteMain = document.querySelector('.page-main');
const tripPresenter = new TripEventsPresenter();

const pointsModel = new PointsModel();
const editingFormModel = new EditingFormModel();
const destinationsModel = new DestinationModel();

render(new FiltersView(), siteHeader.querySelector('.trip-controls__filters'));

tripPresenter.init(siteMain, pointsModel, editingFormModel, destinationsModel);
