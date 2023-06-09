import EventsModel from './model/events-model';
import MenuView from './view/menu-view.js';
import { render, RenderPosition } from './framework/render';
import TripInfoView from './view/trip-info-view';
import RootPresenter from './presenter/root-presenter';
import NewEventButtonView from './view/new-event-btn-view';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';

const headerElement = document.querySelector('.page-header');
const mainElement = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');
const navigationElement = headerElement.querySelector('.trip-controls__navigation');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const contentElement = mainElement.querySelector('.trip-events');

const filterModel = new FilterModel();
const eventsModel = new EventsModel();
const rootPresenter = new RootPresenter(contentElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, eventsModel);
const newEventButtonComponent = new NewEventButtonView();

const closeNewEventFormHandler = () => {
  newEventButtonComponent.element.disabled = false;
};

const openNewEventFormHandler = () => {
  rootPresenter.createEvent(closeNewEventFormHandler);
  newEventButtonComponent.element.disabled = true;
};

render(newEventButtonComponent, tripMainElement);
newEventButtonComponent.setClickHandler(openNewEventFormHandler);

filterPresenter.init();
rootPresenter.init();
render(new MenuView(), navigationElement);
render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
