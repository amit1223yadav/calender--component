import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import CalendarView from './components/Calendar/CalendarView';

const root = createRoot(document.getElementById('root')!);
root.render(<CalendarView initialView="month" />);
