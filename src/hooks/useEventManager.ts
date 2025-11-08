import { useState, useCallback } from 'react';
import { CalendarEvent } from '@/components/Calendar/CalendarView.types';
import { v4 as uuidv4 } from 'uuid';

export const useEventManager = (initial: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initial);
  const add = useCallback((ev: Omit<CalendarEvent,'id'>) => {
    const newEv: CalendarEvent = { ...ev, id: uuidv4() };
    setEvents(e => [newEv, ...e]);
    return newEv;
  }, []);
  const update = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents(e => e.map(ev => ev.id === id ? { ...ev, ...updates } : ev));
  }, []);
  const remove = useCallback((id: string) => {
    setEvents(e => e.filter(ev => ev.id !== id));
  }, []);
  return { events, add, update, remove, setEvents };
};
