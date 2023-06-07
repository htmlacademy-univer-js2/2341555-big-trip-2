import EventsModel from './model/events-model';
import MenuView from './view/menu-view.js';
import FilterView from './view/filter-view';
import { render, RenderPosition } from './framework/render';
import TripInfoView from './view/trip-info-view';
import RootPresenter from './presenter/root-presenter';
import AddFormView from './view/add-form-view';

const headerElement = document.querySelector('.page-header');
const mainElement = document.querySelector('.page-main');

const tripMainElement = document.querySelector('.trip-main');
const navigation = headerElement.querySelector('.trip-controls__navigation');
const filters = headerElement.querySelector('.trip-controls__filters');
const content = mainElement.querySelector('.trip-events');
tripMainElement.querySelector('.trip-main__event-add-btn')
  .addEventListener('click', () => render(new AddFormView(), content, RenderPosition.AFTERBEGIN));

const routePresenter = new RootPresenter();
const eventsModel = new EventsModel();

render(new MenuView(), navigation);
render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filters);
routePresenter.init(content, eventsModel);
