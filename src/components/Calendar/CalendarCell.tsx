import React, { useMemo, useCallback } from 'react';
import { CalendarEvent } from './CalendarView.types';
import { isSameMonth, isToday, format } from '@/utils/date.utils';
import clsx from 'clsx';

interface Props {
  date: Date;
  events: CalendarEvent[];
  currentMonth: number;
  onDayClick: (date: Date) => void;
  onEventClick: (ev: CalendarEvent) => void;
}

export const CalendarCell: React.FC<Props> = React.memo(({date, events, currentMonth, onDayClick, onEventClick}) => {
  const dayNumber = date.getDate();
  const isAdjMonth = date.getMonth() !== currentMonth;
  const today = isToday(date);
  const displayed = events.slice(0,3);
  const more = Math.max(0, events.length - 3);

  const handleDayClick = useCallback(() => onDayClick(date), [date, onDayClick]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${format(date,'MMMM d, yyyy')}. ${events.length} events.`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleDayClick(); }}
      onClick={handleDayClick}
      className={clsx(
        "day-cell p-3 rounded-xl border border-neutral-200 hover:shadow-md transition relative bg-white dark:bg-[#071127]",
        isAdjMonth && "bg-neutral-50 dark:bg-transparent/20 text-neutral-400"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={clsx("text-sm font-medium", today ? "sr-only" : "text-neutral-900 dark:text-[#e6eef8]")}>{dayNumber}</span>
        {today ? (
          <span className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">{dayNumber}</span>
        ) : (
          <span className="text-sm text-neutral-500 dark:text-[#9ca3af]">{/* spacer */}</span>
        )}
      </div>

      <div className="space-y-1 overflow-hidden">
        {displayed.map(ev => (
          <button
            key={ev.id}
            onClick={(e)=>{ e.stopPropagation(); onEventClick(ev); }}
            onKeyDown={(e)=>{ e.stopPropagation(); if(e.key==='Enter') onEventClick(ev); }}
            className="flex items-center gap-2 text-xs px-2 py-1 rounded-md truncate w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 event-badge"
            style={{ backgroundColor: ev.color ?? undefined }}
            title={`${ev.title} — ${new Date(ev.startDate).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`}
          >
            <span className="w-2 h-2 rounded-full" style={{backgroundColor: ev.color ?? '#0ea5e9'}} />
            <span className="truncate">{ev.title}</span>
          </button>
        ))}
        {more > 0 && (
          <button className="text-xs text-primary-600 hover:underline" onClick={(e)=>{ e.stopPropagation(); onDayClick(date); }}>
            +{more} more
          </button>
        )}
      </div>
    </div>
  );
});
CalendarCell.displayName = 'CalendarCell';
