import React from 'react';
import CalendarView from './CalendarView';
import type { Meta, StoryObj } from '@storybook/react';
import { CalendarEvent } from './CalendarView.types';

const meta: Meta<typeof CalendarView> = {
  title: 'Components/Calendar/CalendarView',
  component: CalendarView,
};
export default meta;

const sample: CalendarEvent[] = [
  { id: '1', title: 'Team Standup', startDate: new Date().toISOString(), endDate: new Date(Date.now()+3600000).toISOString(), color:'#0ea5e9'},
  { id: '2', title: 'Design Review', startDate: new Date().toISOString(), endDate: new Date(Date.now()+7200000).toISOString(), color:'#f97316'},
];

type Story = StoryObj<typeof CalendarView>;

export const Default: Story = {
  args: { events: sample }
};

export const EmptyState: Story = {
  args: { events: [] }
};

export const WithManyEvents: Story = {
  args: { events: Array.from({length:22}).map((_,i)=>({ id: String(i+100), title: `Event ${i+1}`, startDate: new Date().toISOString(), endDate: new Date(Date.now()+3600000).toISOString(), color: i%2? '#34d399':'#a78bfa'})) }
};

export const InteractiveDemo: Story = {
  args: { events: sample }
};

export const WeekView: Story = {
  args: { events: sample, initialView: 'week' }
};
