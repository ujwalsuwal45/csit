# Project Structure Guide

Your CSIT Hub project has been refactored into a clean, modular structure. Here's the breakdown:

## 📁 Folder Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.tsx              # Top navigation bar
│   ├── Breadcrumb.tsx          # Navigation breadcrumb
│   ├── HomeView.tsx            # Home page with semester selection
│   ├── SemesterView.tsx        # View all subjects in a semester
│   ├── SubjectView.tsx         # View all question years for a subject
│   ├── QuestionsView.tsx       # Display questions for a year
│   ├── QuestionCard.tsx        # Individual question display
│   ├── SubjectGrid.tsx         # Grid of subject cards
│   ├── YearGrid.tsx            # Grid of year/question set cards
│   └── MCQPlaceholder.tsx      # MCQ coming soon placeholder
│
├── hooks/               # Custom React hooks
│   └── useAppData.ts           # Data fetching and memoization hooks
│
├── constants/           # Application constants
│   └── courses.ts              # Course names, semesters, colors
│
├── types/               # TypeScript type definitions
│   └── index.ts                # App interfaces and types
│
├── utils/               # Helper functions
│   └── formatters.ts           # Text formatting utilities
│
├── App.tsx              # Main App component (now clean and compact)
├── main.tsx             # Entry point
├── data.json            # Course questions database
└── index.css            # Global styles
```

## 🎯 Key Benefits

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components like `Breadcrumb`, `SubjectGrid`, `YearGrid` are reusable across views
- **Maintainability**: Easy to find and update specific features
- **Scalability**: Easy to add new components or features
- **Type Safety**: Centralized type definitions in the `types/` folder
- **Constants**: All magic strings and values in one place

## 🧩 Component Breakdown

| Component | Purpose | Props |
|-----------|---------|-------|
| `Navbar` | Top navigation bar | `isDarkMode`, `onHomeClick`, `onMCQClick` |
| `Breadcrumb` | Navigation trail | `items` array with labels and callbacks |
| `SubjectGrid` | Displays subject cards | `subjects`, `selectedSem`, `data`, `onSubjectClick` |
| `YearGrid` | Displays year/question set cards | `years`, `selectedSem`, `selectedSub`, `data`, `onYearClick` |
| `QuestionCard` | Single question display | `question`, `index` |
| `SemesterView` | Semester subjects view | State and callbacks |
| `SubjectView` | Subject years view | State and callbacks |
| `QuestionsView` | Questions display | State and callbacks |

## 🚀 App State Flow

```
App.tsx (State Management)
    ↓
    ├→ HomeView (No selection)
    ├→ SemesterView (Semester selected)
    │   ↓
    │   └→ SubjectView (Subject selected)
    │       ↓
    │       └→ QuestionsView (Year selected)
    └→ MCQPlaceholder (MCQ mode)
```

## 📝 Adding New Features

**To add a new component:**
1. Create it in `src/components/`
2. Define types in `src/types/index.ts` if needed
3. Import and use in parent components

**To add new courses:**
1. Update `COURSE_NAMES` in `src/constants/courses.ts`
2. Add questions to `src/data.json`

**To add helpers:**
1. Create functions in `src/utils/` with clear purposes
2. Export and import where needed

## 🔧 Build & Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Original App Size vs Refactored

- **Before**: App.tsx = 353 lines (monolithic)
- **After**: App.tsx = ~120 lines (clean & focused) + modular components

All functionality preserved, better organized! 🎉
