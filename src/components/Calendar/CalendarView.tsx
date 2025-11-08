import React, { useMemo, useState, Suspense, useEffect } from 'react';
import { CalendarViewProps, CalendarEvent } from './CalendarView.types';
import { useCalendar } from '@/hooks/useCalendar';
import { useEventManager } from '@/hooks/useEventManager';
import { format } from 'date-fns';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import EventModal from './EventModal';
import clsx from 'clsx';

const CalendarView: React.FC<CalendarViewProps> = ({ events: propsEvents = [], onEventAdd, onEventUpdate, onEventDelete, initialView='month', initialDate }) => {
  const initial = initialDate ? new Date(initialDate) : new Date();
  const { currentDate, view, setSelectedDate, setViewTo, goNext, goPrev, goToday } = useCalendar(initial);
  const { events, add, update, remove, setEvents } = useEventManager(propsEvents as CalendarEvent[]);

  // sync propsEvents if provided (simple)
  React.useEffect(()=> { if(propsEvents.length) setEvents(propsEvents); }, [propsEvents, setEvents]);

  React.useEffect(()=> { setViewTo(initialView); }, [initialView, setViewTo]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CalendarEvent | undefined>(undefined);
  const [dark, setDark] = useState(false);

  useEffect(()=> {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const grouped = useMemo(()=> {
    const m = new Map<string, CalendarEvent[]>();
    events.forEach(ev => {
      const key = ev.startDate.slice(0,10);
      const arr = m.get(key) ?? [];
      arr.push(ev);
      m.set(key, arr);
    });
    return m;
  }, [events]);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setEditing(undefined);
    setModalOpen(true);
  };
  const handleEventClick = (ev: CalendarEvent) => {
    setEditing(ev);
    setModalOpen(true);
  };
  const handleSave = (ev: Omit<CalendarEvent,'id'> & { id?: string }) => {
    if (editing?.id) {
      update(editing.id, ev);
      onEventUpdate?.(editing.id, ev);
    } else {
      const created = add(ev as any);
      onEventAdd?.(created);
    }
  };
  const handleDelete = (id?: string) => {
    if(!id) return;
    remove(id);
    onEventDelete?.(id);
  };

  // helper: sample events list for sidebar
  const upcoming = Array.from(events).slice(0,10);

  return (
    <div className="p-4 container">
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          <button onClick={goPrev} aria-label="Previous" className="px-3 py-1 border rounded bg-white dark:bg-[#071127]">Prev</button>
          <button onClick={goToday} aria-label="Today" className="px-3 py-1 border rounded bg-white dark:bg-[#071127]">Today</button>
          <button onClick={goNext} aria-label="Next" className="px-3 py-1 border rounded bg-white dark:bg-[#071127]">Next</button>
          <div className="ml-4 text-lg font-semibold">{format(currentDate,'MMMM yyyy')}</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:inline-flex items-center bg-neutral-50 border rounded-md p-1">
            <button onClick={()=>setViewTo('month')} className={clsx('px-3 py-1 rounded', view==='month' ? 'bg-primary-500 text-white' : '')} aria-pressed={view==='month'}>Month</button>
            <button onClick={()=>setViewTo('week')} className={clsx('px-3 py-1 rounded', view==='week' ? 'bg-primary-500 text-white' : '')} aria-pressed={view==='week'}>Week</button>
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={dark} onChange={()=>setDark(d=>!d)} />
            <span className="text-sm">Dark</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 card p-4">
          {view === 'month' && <MonthView date={currentDate} events={events} onDayClick={handleDayClick} onEventClick={handleEventClick} />}
          {view === 'week' && <WeekView date={currentDate} events={events} onEventClick={handleEventClick} onSlotDoubleClick={(d)=>{ setSelectedDate(d); setEditing(undefined); setModalOpen(true); }} />}
        </div>

        <aside className="hidden lg:block card p-4">
          <h3 className="text-sm font-semibold mb-2">Upcoming</h3>
          <div className="space-y-2">
            {upcoming.length === 0 && <div className="text-sm text-neutral-500">No events</div>}
            {upcoming.map(ev=>(
              <div key={ev.id} className="flex items-center gap-2 p-2 rounded hover:bg-neutral-50 cursor-pointer" onClick={()=>handleEventClick(ev)}>
                <div className="w-2 h-8 rounded" style={{background: ev.color}} />
                <div>
                  <div className="text-sm font-medium">{ev.title}</div>
                  <div className="text-xs text-neutral-500">{new Date(ev.startDate).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <Suspense fallback={null}>
        <EventModal open={modalOpen} initial={editing} onClose={()=>setModalOpen(false)} onSave={handleSave} onDelete={handleDelete} />
      </Suspense>
    </div>
  );
};

export default CalendarView;
