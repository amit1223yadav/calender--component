import React from 'react';
import { format, addDays, startOfWeek, addHours, startOfDay } from 'date-fns';
import { CalendarEvent } from './CalendarView.types';

interface Props {
  date: Date;
  events: CalendarEvent[];
  onEventClick: (ev: CalendarEvent)=>void;
  onSlotDoubleClick?: (start: Date)=>void;
}

export const WeekView: React.FC<Props> = ({date, events, onEventClick, onSlotDoubleClick}) => {
  const weekStart = startOfWeek(date, {weekStartsOn:0});
  const days = Array.from({length:7}).map((_,i)=> addDays(weekStart, i));
  const hours = Array.from({length:24}).map((_,h)=>h);

  return (
    <div className="w-full overflow-auto">
      <div className="grid grid-cols-8">
        <div className="col-span-1"></div>
        {days.map(d=> <div key={d.toISOString()} className="text-sm font-semibold text-center py-2 border-b text-neutral-700 dark:text-[#e6eef8]">{format(d,'EEE dd')}</div>)}
      </div>
      <div className="grid grid-cols-8">
        <div className="col-span-1">
          {hours.map(h=> <div key={h} className="h-12 text-xs text-right pr-2 border-b text-neutral-500 dark:text-[#9ca3af]">{String(h).padStart(2,'0')}:00</div>)}
        </div>
        {days.map(day=>{
          return <div key={day.toISOString()} className="col-span-1 border-l relative min-h-[24rem]">
            {hours.map(h=> {
              const slot = new Date(day); slot.setHours(h,0,0,0);
              return <div key={h} onDoubleClick={()=>onSlotDoubleClick?.(slot)} className="h-12 border-b"></div>;
            })}
          </div>;
        })}
      </div>
    </div>
  );
};
