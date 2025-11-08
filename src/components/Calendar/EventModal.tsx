import React, { useEffect, useState, useRef } from 'react';
import { CalendarEvent } from './CalendarView.types';

interface Props {
  open: boolean;
  initial?: Partial<CalendarEvent> & { startDate?: string };
  onClose: ()=>void;
  onSave: (ev: Omit<CalendarEvent,'id'> & { id?: string })=>void;
  onDelete?: (id: string)=>void;
}

const PRESET_COLORS = ['#0ea5e9','#f97316','#34d399','#f43f5e','#a78bfa','#fde68a'];

const EventModal: React.FC<Props> = ({open, initial, onClose, onSave, onDelete}) => {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [start, setStart] = useState(initial?.startDate ?? new Date().toISOString().slice(0,16));
  const [end, setEnd] = useState(initial?.endDate ?? new Date(Date.now()+1000*60*60).toISOString().slice(0,16));
  const [color, setColor] = useState(initial?.color ?? PRESET_COLORS[0]);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=> {
    setTitle(initial?.title ?? '');
    setDescription(initial?.description ?? '');
    setStart(initial?.startDate ?? new Date().toISOString().slice(0,16));
    setEnd(initial?.endDate ?? new Date(Date.now()+1000*60*60).toISOString().slice(0,16));
    setColor(initial?.color ?? PRESET_COLORS[0]);
  }, [initial, open]);

  useEffect(()=> {
    if(open) {
      const prev = document.activeElement as HTMLElement | null;
      dialogRef.current?.focus();
      return () => prev?.focus();
    }
  }, [open]);

  if(!open) return null;
  const save = () => {
    if (!title.trim()) return alert('Title required');
    if (new Date(end) <= new Date(start)) return alert('End must be after start');
    onSave({
      title: title.trim(),
      description: description.trim(),
      startDate: new Date(start).toISOString(),
      endDate: new Date(end).toISOString(),
      color,
      category: initial?.category
    });
    onClose();
  };
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div ref={dialogRef} tabIndex={-1} className="relative bg-white dark:bg-[#071127] rounded-xl p-4 w-full max-w-md shadow-lg">
        <h2 id="modal-title" className="text-lg font-semibold mb-2 text-neutral-900 dark:text-[#e6eef8]">{initial?.id ? 'Edit Event' : 'Create Event'}</h2>
        <label className="block text-sm text-neutral-700 dark:text-[#e6eef8]">Title <span className="text-red-500">*</span></label>
        <input value={title} onChange={e=>setTitle(e.target.value)} maxLength={100} className="w-full border p-2 rounded mb-2 bg-white dark:bg-[#071127] text-neutral-900 dark:text-[#e6eef8]" />
        <label className="block text-sm text-neutral-700 dark:text-[#e6eef8]">Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} maxLength={500} className="w-full border p-2 rounded mb-2 bg-white dark:bg-[#071127] text-neutral-900 dark:text-[#e6eef8]" />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm text-neutral-700 dark:text-[#e6eef8]">Start</label>
            <input type="datetime-local" value={start} onChange={e=>setStart(e.target.value)} className="w-full border p-2 rounded mb-2 bg-white dark:bg-[#071127] text-neutral-900 dark:text-[#e6eef8]" />
          </div>
          <div>
            <label className="block text-sm text-neutral-700 dark:text-[#e6eef8]">End</label>
            <input type="datetime-local" value={end} onChange={e=>setEnd(e.target.value)} className="w-full border p-2 rounded mb-2 bg-white dark:bg-[#071127] text-neutral-900 dark:text-[#e6eef8]" />
          </div>
        </div>

        <label className="block text-sm text-neutral-700 dark:text-[#e6eef8]">Color</label>
        <div className="flex gap-2 mb-4">
          {PRESET_COLORS.map(c=>(
            <button key={c} onClick={()=>setColor(c)} aria-label={`choose color ${c}`} style={{background:c}} className={`w-8 h-8 rounded ${color===c ? 'ring-2 ring-offset-1 ring-primary-500' : ''}`} />
          ))}
        </div>

        <div className="flex justify-end gap-2">
          {initial?.id && <button onClick={() => { if(initial.id && onDelete) onDelete(initial.id); onClose(); }} className="px-3 py-1 rounded border text-sm">Delete</button>}
          <button onClick={onClose} className="px-3 py-1 rounded border text-sm">Cancel</button>
          <button onClick={save} className="px-3 py-1 rounded bg-primary-500 text-white text-sm">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
