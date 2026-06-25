j# AuthContext — cómo funciona y cómo se conecta con las páginas

## ¿Qué es React Context?

React Context es un mecanismo para compartir datos entre componentes sin tener que pasarlos manualmente por props. En esta app se usa un solo contexto: `AuthContext`, que envuelve toda la aplicación desde `main.jsx`:

```jsx
<BrowserRouter>
  <AuthProvider>   ← expone { user, admin, loading, logout } a todos los hijos
    <App />
  </AuthProvider>
</BrowserRouter>
```

## ¿Qué expone AuthContext?

**`src/context/AuthContext.jsx`**

```js
{ user, admin, loading, logout }
```

- **`user`** — el objeto de Firebase Auth (o `null` si no hay sesión).
- **`admin`** — `true` solo si `user.email === "admin@itr.com"` y no está activo `adminOverride`.
- **`loading`** — `true` mientras Firebase verifica si hay sesión activa. Mientras carga, no renderiza los hijos (ver línea 39: `{!loading && children}`).
- **`logout`** — función que llama a `signOut(auth)` de Firebase.

## Lógica interna paso a paso

1. **Al montar `AuthProvider`** → se suscribe a `onAuthStateChanged` de Firebase. Cada vez que cambia el estado de autenticación (inicio/cierre de sesión, recarga de página), Firebase notifica y se actualiza `user`.

2. **Admin automático** — si el email del usuario logueado es `admin@itr.com`, la variable `admin` se vuelve `true`. Esto se usa en todas las páginas para mostrar botones de edición, modales, etc.

3. **Admin override (Ctrl+;)** — el hook `useEffect` registra un listener de teclado. Si el usuario logueado es admin y presiona `Ctrl+;`, se togglea `adminOverride`. Mientras `adminOverride` sea `true`, la variable `admin` es `false` aunque el usuario sea admin@itr.com. Sirve para probar la vista de usuario normal.

## Cómo lo consumen las páginas

Cada página importa `useAuth` del contexto:

```jsx
import { useAuth } from "../context/AuthContext";

function Deportes() {
  const { admin } = useAuth();
  // ...
  return (
    <div className={"deportes-page" + (admin ? " admin-mode" : "")}>
      {admin && <button>+ Agregar sponsor</button>}
```

- **`Login.jsx`** — no usa `useAuth` (usa `signInWithEmailAndPassword` directamente). Redirige a `/deportes` tras loguear.
- **`Registro.jsx`** — no usa `useAuth` porque registra en localStorage, no en Firebase Auth.
- **`Deportes.jsx`** — usa `admin` para mostrar modales (sponsors, productos) y edición inline.
- **`DeportePage.jsx`** — usa `admin` para editar campeón, categorías y partidos.
- **`Favoritos.jsx`** — solo muestra el badge "Admin" si corresponde.

## Flujo general de la app

```
/main.jsx
  BrowserRouter
    AuthProvider
      App.jsx  (Routes)
        /  →  Login         (Firebase Auth email/password)
        /deportes  →  Deportes   (página principal, elige deporte)
        /deporte/:id  →  DeportePage  (detalle: campeón, categorías, partidos)
        /deporte/:id/favoritos  →  Favoritos  (equipos y jugadores fav)
        /registro  →  Registro   (solo localStorage, no Firebase)
```

## Estado local vs estado global

- **Global (Context)**: solo la sesión del usuario (`user`, `admin`).
- **Local (useState en cada página)**: todo lo demás — banners, deportes, sponsors, productos, partidos, categorías, favoritos. No hay base de datos conectada aún; los datos se inicializan hardcodeados o vacíos. El admin los edita en la misma sesión pero los cambios se pierden al recargar (no persisten).
