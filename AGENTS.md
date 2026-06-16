# Copa Renault App

React 19 + Vite 8 + Firebase (Auth, Data Connect / PostgreSQL). JS, not TS.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (must pass before commit) |
| `npm run preview` | Preview production build |

No test framework or typecheck — `npm test` / `npm run typecheck` don't exist.

## Routes (`src/App.jsx`)

| Path | Page | Description |
|---|---|---|
| `/` | `Login` | Firebase email/password sign-in |
| `/deportes` | `Deportes` | Main landing (after login) |
| `/deporte/:id` | `DeportePage` | Sport detail (id is index into hardcoded list) |
| `/registro` | `Registro` | **localStorage-based** registration (NOT Firebase Auth) |

## Architecture gotchas

- **Entry**: `src/main.jsx` mounts `<App>` inside `<StrictMode>` → `<BrowserRouter>` → `<AuthProvider>` (all three are there, not in App).
- **Auth**: `useAuth()` from `src/context/AuthContext.jsx` exposes `{ user, admin, loading, logout }`.
- **Admin mode**: user with email `admin@itr.com` gets `admin: true`. This enables inline-editing UI across pages.
- **Registro uses localStorage** (`usuarios` key), not `createUserWithEmailAndPassword`. Firebase Auth is only used for login.
- **react-router-dom** v7 (not v6). Routes use `<element>` prop syntax (but this project uses v6-style `<Route path>` children, so be aware the API surface has changed in v7).

## Firebase

- **Project**: `copa-renualt-app` (`.firebaserc`)
- **Auth config**: `src/firebase/config.js` (Firebase app init) → `src/firebase/auth.js` (getAuth)
- **Data Connect schema**: `dataconnect/schema/schema.gql` (12 tables)
- **Connector**: `dataconnect/example/connector.yaml` — generates JS SDK + React hooks to `src/dataconnect-generated/`. Regenerate with:
  ```
  firebase dataconnect:sdk:generate
  ```
- **Emulators**: configured in `firebase.json` (local PGlite data dir at `dataconnect/.dataconnect/pgliteData`)
- **Region**: `southamerica-east1`

## Generated code

`src/dataconnect-generated/` is **not** in `.gitignore` but may not exist until generated. Always confirm it exists before editing files under it; if missing, regenerate.

## Conventions

- Page styles are co-located CSS files (`src/pages/<Name>.css`), imported at the top of each page component.
- CSS variables in `src/index.css` with light/dark mode via `prefers-color-scheme`.
