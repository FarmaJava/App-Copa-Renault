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

export interface CreateProductoCantinaData {
  productoCantina_insert: ProductoCantina_Key;
}

export interface CreateProductoCantinaVariables {
  nombre: string;
  descripcion?: string | null;
  precio: number;
  categoria?: string | null;
  imagenUrl?: string | null;
}

export interface CreateUsuarioData {
  usuario_insert: Usuario_Key;
}

export interface CreateUsuarioVariables {
  nombre: string;
  email: string;
  tipoUsuario: string;
}

export interface DeleteProductoCantinaData {
  productoCantina_delete?: ProductoCantina_Key | null;
}

export interface DeleteProductoCantinaVariables {
  id: UUIDString;
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

export interface GetProductoCantinaData {
  productoCantina?: {
    id: UUIDString;
    nombre: string;
    descripcion?: string | null;
    precio: number;
    categoria?: string | null;
    disponible: boolean;
    imagenUrl?: string | null;
    fechaCreacion: TimestampString;
  } & ProductoCantina_Key;
}

export interface GetProductoCantinaVariables {
  id: UUIDString;
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

export interface ListProductosCantinaData {
  productoCantinas: ({
    id: UUIDString;
    nombre: string;
    descripcion?: string | null;
    precio: number;
    categoria?: string | null;
    disponible: boolean;
    imagenUrl?: string | null;
    fechaCreacion: TimestampString;
  } & ProductoCantina_Key)[];
}

export interface ListProductosCantinaDisponiblesData {
  productoCantinas: ({
    id: UUIDString;
    nombre: string;
    descripcion?: string | null;
    precio: number;
    categoria?: string | null;
    imagenUrl?: string | null;
  } & ProductoCantina_Key)[];
}

export interface ListProductoscantinaPorCategoriaData {
  productoCantinas: ({
    id: UUIDString;
    nombre: string;
    descripcion?: string | null;
    precio: number;
    disponible: boolean;
    imagenUrl?: string | null;
  } & ProductoCantina_Key)[];
}

export interface ListProductoscantinaPorCategoriaVariables {
  categoria: string;
}

export interface ListSponsorsData {
  sponsors: ({
    id: UUIDString;
    nombre: string;
    logoUrl: string;
    slogan?: string | null;
    sitioWeb?: string | null;
  } & Sponsor_Key)[];
}

export interface LogAccion_Key {
  id: UUIDString;
  __typename?: 'LogAccion_Key';
}

export interface Partido_Key {
  id: UUIDString;
  __typename?: 'Partido_Key';
}

export interface ProductoCantina_Key {
  id: UUIDString;
  __typename?: 'ProductoCantina_Key';
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

export interface UpdateProductoCantinaData {
  productoCantina_update?: ProductoCantina_Key | null;
}

export interface UpdateProductoCantinaVariables {
  id: UUIDString;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  categoria?: string | null;
  imagenUrl?: string | null;
  disponible: boolean;
}

export interface Usuario_Key {
  id: UUIDString;
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

interface ListSponsorsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSponsorsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSponsorsData, undefined>;
  operationName: string;
}
export const listSponsorsRef: ListSponsorsRef;

export function listSponsors(options?: ExecuteQueryOptions): QueryPromise<ListSponsorsData, undefined>;
export function listSponsors(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSponsorsData, undefined>;

interface ListProductosCantinaRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProductosCantinaData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProductosCantinaData, undefined>;
  operationName: string;
}
export const listProductosCantinaRef: ListProductosCantinaRef;

export function listProductosCantina(options?: ExecuteQueryOptions): QueryPromise<ListProductosCantinaData, undefined>;
export function listProductosCantina(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProductosCantinaData, undefined>;

interface ListProductosCantinaDisponiblesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProductosCantinaDisponiblesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProductosCantinaDisponiblesData, undefined>;
  operationName: string;
}
export const listProductosCantinaDisponiblesRef: ListProductosCantinaDisponiblesRef;

export function listProductosCantinaDisponibles(options?: ExecuteQueryOptions): QueryPromise<ListProductosCantinaDisponiblesData, undefined>;
export function listProductosCantinaDisponibles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProductosCantinaDisponiblesData, undefined>;

interface ListProductoscantinaPorCategoriaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProductoscantinaPorCategoriaVariables): QueryRef<ListProductoscantinaPorCategoriaData, ListProductoscantinaPorCategoriaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProductoscantinaPorCategoriaVariables): QueryRef<ListProductoscantinaPorCategoriaData, ListProductoscantinaPorCategoriaVariables>;
  operationName: string;
}
export const listProductoscantinaPorCategoriaRef: ListProductoscantinaPorCategoriaRef;

export function listProductoscantinaPorCategoria(vars: ListProductoscantinaPorCategoriaVariables, options?: ExecuteQueryOptions): QueryPromise<ListProductoscantinaPorCategoriaData, ListProductoscantinaPorCategoriaVariables>;
export function listProductoscantinaPorCategoria(dc: DataConnect, vars: ListProductoscantinaPorCategoriaVariables, options?: ExecuteQueryOptions): QueryPromise<ListProductoscantinaPorCategoriaData, ListProductoscantinaPorCategoriaVariables>;

interface GetProductoCantinaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductoCantinaVariables): QueryRef<GetProductoCantinaData, GetProductoCantinaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProductoCantinaVariables): QueryRef<GetProductoCantinaData, GetProductoCantinaVariables>;
  operationName: string;
}
export const getProductoCantinaRef: GetProductoCantinaRef;

export function getProductoCantina(vars: GetProductoCantinaVariables, options?: ExecuteQueryOptions): QueryPromise<GetProductoCantinaData, GetProductoCantinaVariables>;
export function getProductoCantina(dc: DataConnect, vars: GetProductoCantinaVariables, options?: ExecuteQueryOptions): QueryPromise<GetProductoCantinaData, GetProductoCantinaVariables>;

interface CreateProductoCantinaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProductoCantinaVariables): MutationRef<CreateProductoCantinaData, CreateProductoCantinaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProductoCantinaVariables): MutationRef<CreateProductoCantinaData, CreateProductoCantinaVariables>;
  operationName: string;
}
export const createProductoCantinaRef: CreateProductoCantinaRef;

export function createProductoCantina(vars: CreateProductoCantinaVariables): MutationPromise<CreateProductoCantinaData, CreateProductoCantinaVariables>;
export function createProductoCantina(dc: DataConnect, vars: CreateProductoCantinaVariables): MutationPromise<CreateProductoCantinaData, CreateProductoCantinaVariables>;

interface UpdateProductoCantinaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProductoCantinaVariables): MutationRef<UpdateProductoCantinaData, UpdateProductoCantinaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProductoCantinaVariables): MutationRef<UpdateProductoCantinaData, UpdateProductoCantinaVariables>;
  operationName: string;
}
export const updateProductoCantinaRef: UpdateProductoCantinaRef;

export function updateProductoCantina(vars: UpdateProductoCantinaVariables): MutationPromise<UpdateProductoCantinaData, UpdateProductoCantinaVariables>;
export function updateProductoCantina(dc: DataConnect, vars: UpdateProductoCantinaVariables): MutationPromise<UpdateProductoCantinaData, UpdateProductoCantinaVariables>;

interface DeleteProductoCantinaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProductoCantinaVariables): MutationRef<DeleteProductoCantinaData, DeleteProductoCantinaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProductoCantinaVariables): MutationRef<DeleteProductoCantinaData, DeleteProductoCantinaVariables>;
  operationName: string;
}
export const deleteProductoCantinaRef: DeleteProductoCantinaRef;

export function deleteProductoCantina(vars: DeleteProductoCantinaVariables): MutationPromise<DeleteProductoCantinaData, DeleteProductoCantinaVariables>;
export function deleteProductoCantina(dc: DataConnect, vars: DeleteProductoCantinaVariables): MutationPromise<DeleteProductoCantinaData, DeleteProductoCantinaVariables>;

interface CreateUsuarioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUsuarioVariables): MutationRef<CreateUsuarioData, CreateUsuarioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUsuarioVariables): MutationRef<CreateUsuarioData, CreateUsuarioVariables>;
  operationName: string;
}
export const createUsuarioRef: CreateUsuarioRef;

export function createUsuario(vars: CreateUsuarioVariables): MutationPromise<CreateUsuarioData, CreateUsuarioVariables>;
export function createUsuario(dc: DataConnect, vars: CreateUsuarioVariables): MutationPromise<CreateUsuarioData, CreateUsuarioVariables>;

