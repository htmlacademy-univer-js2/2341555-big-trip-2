import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FILTER_TYPES, TIME } from './mock/const';

dayjs.extend(duration);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const convertEventDateIntoDay = (date) => dayjs(date).format('MMM D');
const convertEventDateIntoHour = (date) => dayjs(date).format('HH:mm');
const convertEventDateForEditForm = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const generateDates = () => {
  const startDate = dayjs();
  return {
    startDate: startDate,
    endDate: startDate.add(getRandomInteger(TIME.MINUTES / 2, TIME.HOURS * TIME.MINUTES * 2), 'minutes')
  };
};

const subtractDates = (dateFrom, dateTo) => {
  const diffInTotalMinutes = Math.ceil(dateTo.diff(dateFrom, 'minute', true));
  const diffInHours = Math.floor(diffInTotalMinutes / TIME.MINUTES) % TIME.HOURS;
  const diffInDays = Math.floor(diffInTotalMinutes / (TIME.MINUTES * TIME.HOURS));

  if ((diffInDays === 0) && (diffInHours === 0)) {
    return dayjs.duration(diffInTotalMinutes, 'minutes').format('mm[M]');
  } else if (diffInDays === 0) {
    return dayjs.duration(diffInTotalMinutes, 'minutes').format('HH[H] mm[M]');
  }
  return dayjs.duration(diffInTotalMinutes, 'minutes').format('DD[D] HH[H] mm[M]');
};

const checkDatesRelativeToCurrent = (dateFrom, dateTo) => dateFrom.isBefore(dayjs()) && dateTo.isAfter(dayjs());
const isEventPlanned = (dateFrom, dateTo) => dateFrom.isAfter(dayjs()) || checkDatesRelativeToCurrent(dateFrom, dateTo);
const isEventPassed = (dateFrom, dateTo) => dateTo.isBefore(dayjs()) || checkDatesRelativeToCurrent(dateFrom, dateTo);
const checkFavoriteOption = (isFavorite) => (isFavorite) ? 'event__favorite-btn--active' : '';
const capitalizeFirstLetter = (str) => str[0].toUpperCase() + str.slice(1);

const filter = {
  [FILTER_TYPES.EVERYTHING]: (events) => events.map((event) => event),
  [FILTER_TYPES.FUTURE]: (events) => events.filter((event) => isEventPlanned(event.startDate, event.endDate)),
  [FILTER_TYPES.PAST]: (events) => events.filter((event) => isEventPassed(event.startDate, event.endDate))
};

const update = (items, updatedItem) =>
  items.map((item) => {
    if (item.id === updatedItem.id) {
      return updatedItem;
    }
    return item;
  });

export {
  getRandomInteger,
  convertEventDateIntoDay,
  convertEventDateIntoHour,
  convertEventDateForEditForm,
  generateDates,
  subtractDates,
  isEventPlanned,
  isEventPassed,
  checkFavoriteOption,
  capitalizeFirstLetter,
  filter,
  update
};
