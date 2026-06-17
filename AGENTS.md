# Copa Renault App

React 19 + Vite 8 + Firebase (Auth, Data Connect / PostgreSQL). JS, not TS.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (must pass before commit) |
| `npm run preview` | Preview production build |

No `test` or `typecheck` scripts exist. No CI workflows (no `.github/`).
ESLint uses flat config (`eslint.config.js`), not legacy `.eslintrc`.

## Routes (`src/App.jsx`)

| Path | Page | Description |
|---|---|---|
| `/` | `Login` | Firebase email/password sign-in |
| `/deportes` | `Deportes` | Main landing (after login) |
| `/deporte/:id` | `DeportePage` | Sport detail (id is index into hardcoded list) |
| `/registro` | `Registro` | **localStorage-based** registration (NOT Firebase Auth) |

## Key facts

- **Entry**: `src/main.jsx` mounts `<App>` inside `<StrictMode>` → `<BrowserRouter>` → `<AuthProvider>` (not in App itself).
- **Auth**: `useAuth()` from `src/context/AuthContext.jsx` exposes `{ user, admin, loading, logout }`.
- **Admin mode**: user with `admin@itr.com` email gets `admin: true`. Enables inline-editing UI. Press **Ctrl+;** to temporarily toggle admin off (`adminOverride` in `AuthContext`).
- **Registration is disconnected from login**: `/registro` saves to `localStorage` key `usuarios` (no `createUserWithEmailAndPassword`). `/` only authenticates via Firebase Auth — local registrants cannot sign in.
- **react-router-dom** is v7 but the app uses the v6-compatible `<BrowserRouter>` / `<Routes>` / `<Route element>` pattern (not `createBrowserRouter`). Keep using this pattern when adding routes.

## Firebase

- **Project**: `copa-renualt-app` (`.firebaserc`)
- **Auth config**: `src/firebase/config.js` → `src/firebase/auth.js`
- **Data Connect schema**: `dataconnect/schema/schema.gql` (12 tables)
- **Connector**: `dataconnect/example/connector.yaml` — generates JS SDK + React hooks to `src/dataconnect-generated/`. Regenerate with:
  ```
  firebase dataconnect:sdk:generate
  ```
- **Emulators**: configured in `firebase.json` (local PGlite data at `dataconnect/.dataconnect/pgliteData`)
- **Region**: `southamerica-east1`

## Generated code

`src/dataconnect-generated/` is **not** gitignored but does not exist until generated. Confirm it exists before editing files under it; if missing, regenerate.

## Conventions

- Page styles are co-located CSS files (`src/pages/<Name>.css`), imported at the top of each page component.
- CSS variables in `src/index.css` with light/dark mode via `prefers-color-scheme`.
