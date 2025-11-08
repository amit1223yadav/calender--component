import { startOfMonth, endOfMonth, startOfWeek, addDays, format, isSameDay, isSameMonth, isToday } from 'date-fns';

export const getCalendarGrid = (date: Date): Date[] => {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
  const grid: Date[] = [];
  for (let i = 0; i < 42; i++) {
    grid.push(addDays(start, i));
  }
  return grid;
};

export const fmt = (d: Date, pattern = 'yyyy-MM-dd') => format(d, pattern);

export { isSameDay, isSameMonth, isToday, format };
