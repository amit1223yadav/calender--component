import { CalendarEvent } from '@/components/Calendar/CalendarView.types';

export const groupEventsByDay = (events: CalendarEvent[]) => {
  const map = new Map<string, CalendarEvent[]>();
  events.forEach(ev => {
    const day = ev.startDate.slice(0,10);
    const arr = map.get(day) ?? [];
    arr.push(ev);
    map.set(day, arr);
  });
  return map;
};
