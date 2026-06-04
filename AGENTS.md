# Copa Renault App

React 19 + Vite 8 + Firebase (Auth, Data Connect / PostgreSQL).

## Stack

- **Language**: JavaScript (JSX) – no TypeScript
- **Build**: Vite 8 with `@vitejs/plugin-react`
- **Lint**: ESLint flat config (`eslint.config.js`), plugins for react-hooks & react-refresh
- **Testing**: none (no test framework or scripts)
- **Typecheck**: none

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

Run `lint` before committing.

## Firebase

- **Project**: `copa-renualt-app` (default in `.firebaserc`)
- **Auth**: `src/firebase/auth.js` wraps `firebase/auth` `getAuth` using config from `src/firebase/config.js`
- **Data Connect**: schema at `dataconnect/schema/schema.gql` (12 tables: Usuario, Deporte, Division, Equipo, Jugador, Arbitro, Partido, JugadorFavorito, Sponsor, SponsorUbicacion, Reglamento, LogAccion)
- **Connector**: `dataconnect/example/connector.yaml` generates JS SDK + React hooks to `src/dataconnect-generated/` – run `firebase dataconnect:sdk:generate` to (re)generate
- **Emulators**: configured in `firebase.json` for Data Connect (local PGlite data dir at `dataconnect/.dataconnect/pgliteData`)
- **Region**: `southamerica-east1`

## Architecture

- Entry: `src/main.jsx` → `src/App.jsx` → `<Routes>` with `BrowserRouter`
- **Routing**: `react-router-dom` defines routes for `/` (Login), `/deportes` (Deportes), and `/registro` (Registro)
- Each page in `src/pages/` has a co-located `*.css`
- CSS variables in `src/index.css` with light/dark mode via `prefers-color-scheme`

## Generated code

`dataconnect/example/connector.yaml` outputs to `src/dataconnect-generated/`. This directory is **not** in `.gitignore` but may not exist until generated. Before editing a file under it, confirm it exists; otherwise regenerate.
