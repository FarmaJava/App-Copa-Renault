import { getAuth } from "firebase/auth";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ── Helper: hace fetch con el token de Firebase en el header ─────────────────
async function apiFetch(path, options = {}) {
  const auth = getAuth();
  const user = auth.currentUser;

  const headers = { "Content-Type": "application/json", ...options.headers };

  // Si hay usuario logueado, agrega el token automáticamente
  if (user) {
    const token = await user.getIdToken();
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || `Error ${res.status}`);
  }

  return res.json();
}

// ════════════════════════════════════════════════════════════════════════════
// SPONSORS
// ════════════════════════════════════════════════════════════════════════════

/** Reemplaza: listSponsors() */
export async function listSponsors() {
  const data = await apiFetch("/sponsors/");
  return { data };
}

// ════════════════════════════════════════════════════════════════════════════
// CANTINA
// ════════════════════════════════════════════════════════════════════════════

/** Reemplaza: listProductosCantinaDisponibles() */
export async function listProductosCantinaDisponibles() {
  const data = await apiFetch("/cantina/productos");
  return { data };
}

/** Reemplaza: createProductoCantina({ nombre, descripcion, precio, categoria, imagenUrl }) */
export async function createProductoCantina(input) {
  const data = await apiFetch("/cantina/productos", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return { data };
}

/** Reemplaza: updateProductoCantina({ id, nombre, descripcion, precio, categoria, imagenUrl, disponible }) */
export async function updateProductoCantina({ id, ...rest }) {
  const data = await apiFetch(`/cantina/productos/${id}`, {
    method: "PUT",
    body: JSON.stringify(rest),
  });
  return { data };
}

/** Reemplaza: deleteProductoCantina({ id }) */
export async function deleteProductoCantina({ id }) {
  const data = await apiFetch(`/cantina/productos/${id}`, {
    method: "DELETE",
  });
  return { data };
}

// ════════════════════════════════════════════════════════════════════════════
// DEPORTES — partidos, divisiones, equipos, jugadores
// ════════════════════════════════════════════════════════════════════════════

/** Reemplaza: listPartidosPorDeporte({ deporteId }) */
export async function listPartidosPorDeporte({ deporteId }) {
  const data = await apiFetch(`/deportes/${deporteId}/partidos`);
  return { data };
}

/** Reemplaza: listDivisionesPorDeporte({ deporteId }) */
export async function listDivisionesPorDeporte({ deporteId }) {
  const data = await apiFetch(`/deportes/${deporteId}/divisiones`);
  return { data };
}

/** Reemplaza: listEquiposPorDivision({ divisionId }) */
export async function listEquiposPorDivision({ divisionId }) {
  const data = await apiFetch(`/deportes/divisiones/${divisionId}/equipos`);
  return { data };
}

/** Reemplaza: listJugadoresPorEquipo({ equipoId }) */
export async function listJugadoresPorEquipo({ equipoId }) {
  const data = await apiFetch(`/deportes/equipos/${equipoId}/jugadores`);
  return { data };
}

// ════════════════════════════════════════════════════════════════════════════
// AUTH — registro en PostgreSQL post-Firebase
// ════════════════════════════════════════════════════════════════════════════

/** Llama al backend para guardar el usuario en PostgreSQL luego del registro */
export async function registrarUsuarioEnDB(nombre) {
  const data = await apiFetch("/auth/registro", {
    method: "POST",
    body: JSON.stringify({ nombre }),
  });
  return { data };
}
