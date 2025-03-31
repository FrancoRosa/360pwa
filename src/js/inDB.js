const key = "events";

const getEvents = () => JSON.parse(window.localStorage.getItem(key)) || {};
const saveEvents = (events) =>
  window.localStorage.setItem(key, JSON.stringify(events));

export const addEvent = ({ date, start, end, speeds, detections }) => {
  const events = getEvents();
  if (!(date in events)) {
    events[date] = [];
  }
  events[date].push({ start, end, speeds, detections });
  saveEvents(events);
};
export const getDayEvents = (date) => {
  const events = getEvents();
  return events[date] || [];
};
