import { ConnectorConfig, DataConnect, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

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
  id: string;
  __typename?: 'Usuario_Key';
}

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

