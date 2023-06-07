import { filter } from '../utils';

export const generateFilter = (events) => Object.entries(filter).map(
  ([filterName, filteredEvents]) => ({
    name: filterName,
    count: filteredEvents(events).length,
  }),
);
