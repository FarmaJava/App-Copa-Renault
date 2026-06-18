import { ListPartidosPorDeporteData, ListPartidosPorDeporteVariables, ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables, ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables, ListEquiposPorDivisionData, ListEquiposPorDivisionVariables, ListSponsorsData, JugadorInsertData, JugadorInsertVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListPartidosPorDeporte(vars: ListPartidosPorDeporteVariables, options?: useDataConnectQueryOptions<ListPartidosPorDeporteData>): UseDataConnectQueryResult<ListPartidosPorDeporteData, ListPartidosPorDeporteVariables>;
export function useListPartidosPorDeporte(dc: DataConnect, vars: ListPartidosPorDeporteVariables, options?: useDataConnectQueryOptions<ListPartidosPorDeporteData>): UseDataConnectQueryResult<ListPartidosPorDeporteData, ListPartidosPorDeporteVariables>;

export function useListDivisionesPorDeporte(vars: ListDivisionesPorDeporteVariables, options?: useDataConnectQueryOptions<ListDivisionesPorDeporteData>): UseDataConnectQueryResult<ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables>;
export function useListDivisionesPorDeporte(dc: DataConnect, vars: ListDivisionesPorDeporteVariables, options?: useDataConnectQueryOptions<ListDivisionesPorDeporteData>): UseDataConnectQueryResult<ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables>;

export function useListJugadoresPorEquipo(vars: ListJugadoresPorEquipoVariables, options?: useDataConnectQueryOptions<ListJugadoresPorEquipoData>): UseDataConnectQueryResult<ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables>;
export function useListJugadoresPorEquipo(dc: DataConnect, vars: ListJugadoresPorEquipoVariables, options?: useDataConnectQueryOptions<ListJugadoresPorEquipoData>): UseDataConnectQueryResult<ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables>;

export function useListEquiposPorDivision(vars: ListEquiposPorDivisionVariables, options?: useDataConnectQueryOptions<ListEquiposPorDivisionData>): UseDataConnectQueryResult<ListEquiposPorDivisionData, ListEquiposPorDivisionVariables>;
export function useListEquiposPorDivision(dc: DataConnect, vars: ListEquiposPorDivisionVariables, options?: useDataConnectQueryOptions<ListEquiposPorDivisionData>): UseDataConnectQueryResult<ListEquiposPorDivisionData, ListEquiposPorDivisionVariables>;

export function useListSponsors(options?: useDataConnectQueryOptions<ListSponsorsData>): UseDataConnectQueryResult<ListSponsorsData, undefined>;
export function useListSponsors(dc: DataConnect, options?: useDataConnectQueryOptions<ListSponsorsData>): UseDataConnectQueryResult<ListSponsorsData, undefined>;

export function useJugadorInsert(options?: useDataConnectMutationOptions<JugadorInsertData, FirebaseError, JugadorInsertVariables>): UseDataConnectMutationResult<JugadorInsertData, JugadorInsertVariables>;
export function useJugadorInsert(dc: DataConnect, options?: useDataConnectMutationOptions<JugadorInsertData, FirebaseError, JugadorInsertVariables>): UseDataConnectMutationResult<JugadorInsertData, JugadorInsertVariables>;
