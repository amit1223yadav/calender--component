import { useState, useCallback } from 'react';

export const useCalendar = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [view, setView] = useState<'month'|'week'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const goNext = useCallback(() => {
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }, []);
  const goPrev = useCallback(() => {
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }, []);
  const goToday = useCallback(() => setCurrentDate(new Date()), []);
  const setViewTo = useCallback((v: 'month'|'week') => setView(v), []);
  return { currentDate, view, selectedDate, setSelectedDate, goNext, goPrev, goToday, setViewTo };
};
