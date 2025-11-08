# 📅 Calendar Pro — Interactive Calendar View Component

A **modern, responsive, accessible** React calendar component featuring Month & Week views, event management, and beautiful design — built with **Vite + TailwindCSS + TypeScript**.

---

## 🚀 Live Storybook  
🔗 [**View Deployed Storybook**](YOUR_DEPLOYED_STORYBOOK_URL)

*(Coming soon — deploy via Chromatic / Vercel / Netlify)*

---

## ⚙️ Installation

```bash
npm install
npm run dev        # Start local dev server
npm run storybook  # Launch Storybook
🧩 Architecture Overview
python
Copy code
calendar-pro/
│
├── src/
│   ├── components/
│   │   └── Calendar/
│   │       ├── CalendarView.tsx         # Main calendar entry
│   │       ├── MonthView.tsx            # Month layout (6x7 grid)
│   │       ├── WeekView.tsx             # Week layout (timeline)
│   │       ├── CalendarCell.tsx         # Individual day cells
│   │       └── EventModal.tsx           # Create/Edit event modal
│   │
│   ├── hooks/                           # Custom hooks
│   │   ├── useCalendar.ts               # Date navigation
│   │   └── useEventManager.ts           # Event CRUD logic
│   │
│   ├── utils/                           # Utility helpers
│   │   ├── date.utils.ts                # Date functions (getCalendarGrid, etc.)
│   │   └── debounce.ts                  # Debounce utility
│   │
│   ├── styles/
│   │   └── globals.css                  # Tailwind base & theme tokens
│   │
│   └── main.tsx                         # App entry
│
├── .storybook/                          # Storybook configuration
├── postcss.config.cjs                   # Tailwind + Autoprefixer setup
├── tailwind.config.js                   # Tailwind theme tokens
├── vite.config.js                       # Vite configuration
└── tsconfig.json                        # TypeScript compiler settings
✨ Features
✅ Month / Week Views
→ Fully functional grid & timeline views with date navigation

✅ Event Management
→ Add, edit, delete events with color, category & time picker

✅ Responsive Layout
→ Adapts gracefully to mobile, tablet, and desktop screens

✅ Keyboard Accessibility
→ Arrow keys, Enter, and Tab for full control without a mouse

✅ Dark / Light Themes + Accent Picker
→ Auto-switch and customizable accent color

✅ Drag-to-Create Events (Week View)
→ Interactive timeline with visual ghost preview

✅ Search / Filter Bar
→ Debounced live filtering for event titles and descriptions

✅ Framer Motion Animations
→ Smooth transitions between months, weeks, and modals

📖 Storybook Stories
Story Name	Description
Default	Current month view with sample events
Empty State	Calendar with no events
Week View	Demonstration of hourly week timeline
With Many Events	Stress test with 20+ events
Interactive Demo	Fully functional event management
Mobile View	Responsive layout showcase
Accessibility	Keyboard navigation & focus states

🧰 Technologies Used
Stack	Description
⚛️ React 18 + TypeScript	Component-driven architecture
🎨 TailwindCSS 3.4	Utility-first responsive styling
🧠 Zustand	Lightweight global state for events
⏱ date-fns	Fast date manipulation utilities
🎞 Framer Motion	Elegant UI animations
🧱 Vite 5	Lightning-fast dev & build system
🧩 Storybook 7	Component documentation & testing

📦 Git Commit Guidelines
Follow the Conventional Commits format for clarity & consistency:

Type	Example
✨ feat:	feat: add month view grid rendering
🐛 fix:	fix: resolve date calculation bug
📝 docs:	docs: update storybook stories
🎨 style:	style: improve modal UI theme colors
🔧 chore:	chore: update dependencies

🌍 Storybook Deployment Options
You can deploy your Storybook using:

Platform	Description
🔮 Chromatic	One-click deployment with CI previews (recommended)
▲ Vercel	Free static hosting with automatic builds
🌐 Netlify	Easy drag-and-drop deployment for Storybook builds

📬 Contact
👤 Amit Yadav
📧 amityadav7206787698@gmail.com
📞 +91 72067 87699
🌎 Deployment URL: https://calender-component-2qke.vercel.app/
