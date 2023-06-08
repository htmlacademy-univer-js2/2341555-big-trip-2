import EventsModel from './model/events-model';
import MenuView from './view/menu-view.js';
import FilterView from './view/filter-view';
import { render, RenderPosition } from './framework/render';
import TripInfoView from './view/trip-info-view';
import RootPresenter from './presenter/root-presenter';
import AddFormView from './view/add-form-view';
import { generateFilter } from './mock/filter';

const headerElement = document.querySelector('.page-header');
const mainElement = document.querySelector('.page-main');

const tripMainElement = document.querySelector('.trip-main');
const navigationElement = headerElement.querySelector('.trip-controls__navigation');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const contentElement = mainElement.querySelector('.trip-events');
tripMainElement.querySelector('.trip-main__event-add-btn').addEventListener(
  'click',
  () => render(new AddFormView(), contentElement, RenderPosition.AFTERBEGIN)
);

const eventsModel = new EventsModel();
const routePresenter = new RootPresenter(contentElement, eventsModel);
const filters = generateFilter(eventsModel.events);

render(new MenuView(), navigationElement);
render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(filters), filtersElement);
routePresenter.init();
