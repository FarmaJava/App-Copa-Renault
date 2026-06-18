import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Arbitro_Key {
  id: UUIDString;
  __typename?: 'Arbitro_Key';
}

export interface Deporte_Key {
  id: UUIDString;
  __typename?: 'Deporte_Key';
}

export interface Division_Key {
  id: UUIDString;
  __typename?: 'Division_Key';
}

export interface Equipo_Key {
  id: UUIDString;
  __typename?: 'Equipo_Key';
}

export interface JugadorFavorito_Key {
  id: UUIDString;
  __typename?: 'JugadorFavorito_Key';
}

export interface JugadorInsertData {
  jugador_insert: Jugador_Key;
}

export interface JugadorInsertVariables {
  nombre: string;
  numeroCamiseta: number;
  posicion: string;
  fechaNacimiento: DateString;
  equipoId: UUIDString;
}

export interface Jugador_Key {
  id: UUIDString;
  __typename?: 'Jugador_Key';
}

export interface ListDivisionesPorDeporteData {
  divisions: ({
    id: UUIDString;
    nombre: string;
    nivel: string;
  } & Division_Key)[];
}

export interface ListDivisionesPorDeporteVariables {
  deporteId: UUIDString;
}

export interface ListEquiposPorDivisionData {
  equipos: ({
    id: UUIDString;
    nombre: string;
    ciudad?: string | null;
    logoUrl?: string | null;
  } & Equipo_Key)[];
}

export interface ListEquiposPorDivisionVariables {
  divisionId: UUIDString;
}

export interface ListJugadoresPorEquipoData {
  jugadors: ({
    id: UUIDString;
    nombre: string;
    numeroCamiseta?: number | null;
    posicion?: string | null;
    fechaNacimiento?: DateString | null;
    fotoUrl?: string | null;
  } & Jugador_Key)[];
}

export interface ListJugadoresPorEquipoVariables {
  equipoId: UUIDString;
}

export interface ListPartidosPorDeporteData {
  partidos: ({
    id: UUIDString;
    fechaPartido: DateString;
    horaPartido: string;
    ubicacion?: string | null;
    estado: string;
    resultadoLocal?: number | null;
    resultadoVisitante?: number | null;
    equipoLocal: {
      id: UUIDString;
      nombre: string;
    } & Equipo_Key;
      equipoVisitante: {
        id: UUIDString;
        nombre: string;
      } & Equipo_Key;
        arbitro: {
          id: UUIDString;
          nombre: string;
        } & Arbitro_Key;
          division: {
            id: UUIDString;
            nombre: string;
            nivel: string;
          } & Division_Key;
  } & Partido_Key)[];
}

export interface ListPartidosPorDeporteVariables {
  deporteId: UUIDString;
}

export interface LogAccion_Key {
  id: UUIDString;
  __typename?: 'LogAccion_Key';
}

export interface Partido_Key {
  id: UUIDString;
  __typename?: 'Partido_Key';
}

export interface Reglamento_Key {
  id: UUIDString;
  __typename?: 'Reglamento_Key';
}

export interface SponsorUbicacion_Key {
  id: UUIDString;
  __typename?: 'SponsorUbicacion_Key';
}

export interface Sponsor_Key {
  id: UUIDString;
  __typename?: 'Sponsor_Key';
}

export interface Usuario_Key {
  id: UUIDString;
  __typename?: 'Usuario_Key';
}

interface ListPartidosPorDeporteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPartidosPorDeporteVariables): QueryRef<ListPartidosPorDeporteData, ListPartidosPorDeporteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListPartidosPorDeporteVariables): QueryRef<ListPartidosPorDeporteData, ListPartidosPorDeporteVariables>;
  operationName: string;
}
export const listPartidosPorDeporteRef: ListPartidosPorDeporteRef;

export function listPartidosPorDeporte(vars: ListPartidosPorDeporteVariables, options?: ExecuteQueryOptions): QueryPromise<ListPartidosPorDeporteData, ListPartidosPorDeporteVariables>;
export function listPartidosPorDeporte(dc: DataConnect, vars: ListPartidosPorDeporteVariables, options?: ExecuteQueryOptions): QueryPromise<ListPartidosPorDeporteData, ListPartidosPorDeporteVariables>;

interface ListDivisionesPorDeporteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListDivisionesPorDeporteVariables): QueryRef<ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListDivisionesPorDeporteVariables): QueryRef<ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables>;
  operationName: string;
}
export const listDivisionesPorDeporteRef: ListDivisionesPorDeporteRef;

export function listDivisionesPorDeporte(vars: ListDivisionesPorDeporteVariables, options?: ExecuteQueryOptions): QueryPromise<ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables>;
export function listDivisionesPorDeporte(dc: DataConnect, vars: ListDivisionesPorDeporteVariables, options?: ExecuteQueryOptions): QueryPromise<ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables>;

interface ListJugadoresPorEquipoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListJugadoresPorEquipoVariables): QueryRef<ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListJugadoresPorEquipoVariables): QueryRef<ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables>;
  operationName: string;
}
export const listJugadoresPorEquipoRef: ListJugadoresPorEquipoRef;

export function listJugadoresPorEquipo(vars: ListJugadoresPorEquipoVariables, options?: ExecuteQueryOptions): QueryPromise<ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables>;
export function listJugadoresPorEquipo(dc: DataConnect, vars: ListJugadoresPorEquipoVariables, options?: ExecuteQueryOptions): QueryPromise<ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables>;

interface ListEquiposPorDivisionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListEquiposPorDivisionVariables): QueryRef<ListEquiposPorDivisionData, ListEquiposPorDivisionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListEquiposPorDivisionVariables): QueryRef<ListEquiposPorDivisionData, ListEquiposPorDivisionVariables>;
  operationName: string;
}
export const listEquiposPorDivisionRef: ListEquiposPorDivisionRef;

export function listEquiposPorDivision(vars: ListEquiposPorDivisionVariables, options?: ExecuteQueryOptions): QueryPromise<ListEquiposPorDivisionData, ListEquiposPorDivisionVariables>;
export function listEquiposPorDivision(dc: DataConnect, vars: ListEquiposPorDivisionVariables, options?: ExecuteQueryOptions): QueryPromise<ListEquiposPorDivisionData, ListEquiposPorDivisionVariables>;

interface JugadorInsertRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: JugadorInsertVariables): MutationRef<JugadorInsertData, JugadorInsertVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: JugadorInsertVariables): MutationRef<JugadorInsertData, JugadorInsertVariables>;
  operationName: string;
}
export const jugadorInsertRef: JugadorInsertRef;

export function jugadorInsert(vars: JugadorInsertVariables): MutationPromise<JugadorInsertData, JugadorInsertVariables>;
export function jugadorInsert(dc: DataConnect, vars: JugadorInsertVariables): MutationPromise<JugadorInsertData, JugadorInsertVariables>;

