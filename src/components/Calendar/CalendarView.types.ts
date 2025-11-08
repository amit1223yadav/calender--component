export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO
  endDate: string; // ISO
  color?: string;
  category?: string;
}

export interface CalendarViewProps {
  events?: CalendarEvent[];
  onEventAdd?: (event: CalendarEvent) => void;
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete?: (id: string) => void;
  initialView?: 'month' | 'week';
  initialDate?: string;
}
