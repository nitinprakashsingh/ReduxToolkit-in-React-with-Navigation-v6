 import { render, screen } from '@testing-library/react';
 import App from './App';

 test('renders learn react link', () => {
   render(<App />);
   const linkElement = screen.getByText(/learn react/i);
   expect(linkElement).toBeInTheDocument();
 });


// src/
// ├── app/                        ← app bootstrap (providers, global config)
// │    ├── App.tsx
// │    ├── Providers.tsx          // wrap all context providers here
// │    └── ErrorBoundary.tsx
// │
// ├── router/                     ← all routing, guards, layouts
// │    ├── index.tsx              // createBrowserRouter — single source of truth
// │    ├── guards/
// │    │    ├── AuthGuard.tsx     // redirect if not authed
// │    │    └── RoleGuard.tsx     // redirect if wrong role
// │    └── layouts/
// │         ├── RootLayout.tsx
// │         ├── AuthLayout.tsx    // login/signup wrapper
// │         └── DashboardLayout.tsx
// │
// ├── features/                   ← one folder per domain / business feature
// │    ├── auth/
// │    │    ├── pages/            // route-level components (was screens/)
// │    │    │    ├── LoginPage/
// │    │    │    │    ├── LoginPage.tsx
// │    │    │    │    ├── LoginPage.styles.ts
// │    │    │    │    └── LoginPage.test.tsx    ← tests co-located
// │    │    │    └── SignupPage/
// │    │    ├── components/       // private to this feature
// │    │    │    ├── AuthForm.tsx
// │    │    │    └── AuthInput.tsx
// │    │    ├── hooks/            // feature-specific hooks
// │    │    │    └── useAuthForm.ts
// │    │    ├── store/            // Redux slice + RTK Query
// │    │    │    ├── authSlice.ts
// │    │    │    └── authApi.ts
// │    │    ├── types/            // all types for this feature
// │    │    │    └── auth.types.ts
// │    │    ├── utils/            // helpers private to this feature
// │    │    │    └── authHelpers.ts
// │    │    └── index.ts          ← PUBLIC API — only export what's needed
// │    │
// │    ├── dashboard/
// │    │    └── index.ts
// │    │
// │    └── profile/
// │         └── index.ts
// │
// ├── components/                 ← shared UI component library
// │    ├── ui/                    // pure presentational (Button, Input, Modal)
// │    │    ├── Button/
// │    │    │    ├── Button.tsx
// │    │    │    ├── Button.types.ts
// │    │    │    └── Button.test.tsx
// │    │    ├── Input/
// │    │    ├── Modal/
// │    │    └── index.ts          // barrel for all UI components
// │    └── layout/               // layout components (Sidebar, Navbar, PageWrapper)
// │         ├── Navbar.tsx
// │         └── Sidebar.tsx
// │
// ├── hooks/                      ← shared custom hooks
// │    ├── useDebounce.ts
// │    ├── useLocalStorage.ts
// │    ├── useMediaQuery.ts
// │    └── useIntersectionObserver.ts
// │
// ├── store/                      ← Redux root store config
// │    ├── index.ts               // configureStore + persistor
// │    ├── rootReducer.ts         // combineReducers from all feature slices
// │    ├── middleware.ts
// │    └── types.ts               // RootState, AppDispatch, typed hooks
// │
// ├── lib/                        ← third-party library setup
// │    ├── axios.ts               // configured instance with auth interceptors
// │    ├── sentry.ts
// │    └── queryClient.ts
// │
// ├── services/                   ← business services (not feature-specific)
// │    ├── analytics.ts
// │    └── storage.ts
// │
// ├── utils/                      ← pure utility functions
// │    ├── format.ts
// │    ├── validation.ts
// │    └── cn.ts
// │
// ├── types/                      ← global shared TypeScript types
// │    ├── api.types.ts           // ApiResponse<T>, PaginatedResponse<T>
// │    ├── common.types.ts        // ID, Nullable<T>, etc.
// │    └── env.d.ts               // Vite/CRA env variable types
// │
// ├── constants/                  ← app-wide constants
// │    ├── routes.ts              // ROUTES.AUTH.LOGIN = '/auth/login'
// │    ├── queryKeys.ts           // RTK Query / React Query key factories
// │    └── config.ts              // API_URL, feature flags
// │
// └── assets/                     ← static assets
//      ├── images/
//      ├── icons/
//      └── fonts/