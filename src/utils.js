import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { TIME } from './mock/const';

dayjs.extend(duration);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const convertEventDateIntoDay = (pointDate) => dayjs(pointDate).format('MMM D');

const convertEventDateIntoHour = (pointDate) => dayjs(pointDate).format('HH:mm');

const generateDates = () => {
  const startDate = dayjs();
  return {
    startDate: startDate,
    endDate: startDate.add(getRandomInteger(TIME.MINUTES / 2, TIME.HOURS * TIME.MINUTES * 2), 'minutes')
  };
};

const subtractDates = (startDate, endDate) => {
  const dateFrom = dayjs(startDate);
  const dateTo = dayjs(endDate);

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

const checkFavoriteOption = (isFavorite) => (isFavorite) ? 'event__favorite-btn--active' : '';

const capitalizeFirstLetter = (str) => str[0].toUpperCase() + str.slice(1);

export {
  getRandomInteger,
  convertEventDateIntoDay,
  convertEventDateIntoHour,
  generateDates,
  subtractDates,
  checkFavoriteOption,
  capitalizeFirstLetter
};
