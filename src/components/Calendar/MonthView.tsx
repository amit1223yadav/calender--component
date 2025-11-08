import React, { useMemo } from 'react';
import { getCalendarGrid, format } from '@/utils/date.utils';
import { CalendarEvent } from './CalendarView.types';
import { CalendarCell } from './CalendarCell';

interface Props {
  date: Date;
  events: CalendarEvent[];
  onDayClick: (d: Date) => void;
  onEventClick: (ev: CalendarEvent) => void;
}

const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export const MonthView: React.FC<Props> = ({date, events, onDayClick, onEventClick}) => {
  const grid = useMemo(()=> getCalendarGrid(date), [date]);
  const map = useMemo(()=>{
    const m = new Map<string, CalendarEvent[]>();
    events.forEach(ev=>{
      const day = ev.startDate.slice(0,10);
      const arr = m.get(day) ?? [];
      arr.push(ev);
      m.set(day, arr);
    });
    return m;
  }, [events]);

  const currentMonth = date.getMonth();

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-2 weekday-header sticky top-0 bg-transparent z-10 mb-2">
        {weekdays.map(d=> <div key={d} className="text-sm font-semibold text-neutral-700 dark:text-[#e6eef8] text-center py-2">{d}</div>)}
      </div>

      <div className="grid month-grid grid-cols-7 gap-3">
        {grid.map(d=>{
          const key = d.toISOString().slice(0,10);
          const dayEvents = map.get(key) ?? [];
          return <CalendarCell key={key} date={d} events={dayEvents} currentMonth={currentMonth} onDayClick={onDayClick} onEventClick={onEventClick} />;
        })}
      </div>
    </div>
  );
};
