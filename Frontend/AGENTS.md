# Copa Renault App

React 19 + Vite 8 + Firebase (Auth, Data Connect / PostgreSQL). JS, not TS.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (must pass before commit) |
| `npm run preview` | Preview production build |

No `test` or `typecheck` scripts exist. ESLint uses flat config (`eslint.config.js`).

## Routes (`src/App.jsx`)

| Path | Page | Description |
|---|---|---|
| `/` | `Login` | Firebase email/password sign-in |
| `/deportes` | `Deportes` | Main landing (after login) |
| `/deporte/:id` | `DeportePage` | Sport detail (id is index into hardcoded list) |
| `/registro` | `Registro` | **localStorage-based** registration (NOT Firebase Auth) |

## Key facts

- **Entry**: `src/main.jsx` mounts `<App>` inside `<StrictMode>` → `<BrowserRouter>` → `<AuthProvider>`.
- **Auth**: `useAuth()` from `src/context/AuthContext.jsx` exposes `{ user, admin, loading, logout }`.
- **Admin mode**: user `admin@itr.com` gets `admin: true`. Press **Ctrl+;** to temporarily toggle off (`adminOverride` in `AuthContext`).
- **Registration is local-only**: `/registro` saves to `localStorage` key `usuarios` (no `createUserWithEmailAndPassword`). Login only authenticates via Firebase Auth — local registrants cannot sign in.
- **react-router-dom** is v7 but uses v6-compatible `<BrowserRouter>` / `<Routes>` / `<Route element>` pattern. Keep using this pattern when adding routes.

## Firebase & Data Connect

- **Project**: `copa-renualt-app` (`.firebaserc`)
- **Auth config**: `src/firebase/config.js` → `src/firebase/auth.js`
- **Schema**: `dataconnect/schema/schema.gql` — 12 tables.
- **Connector**: `dataconnect/example/connector.yaml` — generates React hooks + JS SDK to `src/dataconnect-generated/`. Regenerate with:
  ```
  firebase dataconnect:sdk:generate
  ```
- **Emulators**: only dataconnect emulator configured in `firebase.json` (no auth/firestore emulators). Local PGlite data at `dataconnect/.dataconnect/pgliteData`.
- **Region**: `southamerica-east1`

## Generated code

`src/dataconnect-generated/` does **not** exist until generated. It is not gitignored. Confirm it exists before editing; if missing, regenerate.

## Conventions

- Page styles are co-located CSS files (`src/pages/<Name>.css`), imported at the top of each page component.
- CSS variables in `src/index.css` with light/dark mode via `prefers-color-scheme`.
- All UI text is in Spanish.
