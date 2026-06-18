# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListPartidosPorDeporte*](#listpartidospordeporte)
  - [*ListDivisionesPorDeporte*](#listdivisionespordeporte)
  - [*ListJugadoresPorEquipo*](#listjugadoresporequipo)
  - [*ListEquiposPorDivision*](#listequipospordivision)
  - [*ListSponsors*](#listsponsors)
- [**Mutations**](#mutations)
  - [*JugadorInsert*](#jugadorinsert)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListPartidosPorDeporte
You can execute the `ListPartidosPorDeporte` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPartidosPorDeporte(vars: ListPartidosPorDeporteVariables, options?: ExecuteQueryOptions): QueryPromise<ListPartidosPorDeporteData, ListPartidosPorDeporteVariables>;

interface ListPartidosPorDeporteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPartidosPorDeporteVariables): QueryRef<ListPartidosPorDeporteData, ListPartidosPorDeporteVariables>;
}
export const listPartidosPorDeporteRef: ListPartidosPorDeporteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPartidosPorDeporte(dc: DataConnect, vars: ListPartidosPorDeporteVariables, options?: ExecuteQueryOptions): QueryPromise<ListPartidosPorDeporteData, ListPartidosPorDeporteVariables>;

interface ListPartidosPorDeporteRef {
  ...
  (dc: DataConnect, vars: ListPartidosPorDeporteVariables): QueryRef<ListPartidosPorDeporteData, ListPartidosPorDeporteVariables>;
}
export const listPartidosPorDeporteRef: ListPartidosPorDeporteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPartidosPorDeporteRef:
```typescript
const name = listPartidosPorDeporteRef.operationName;
console.log(name);
```

### Variables
The `ListPartidosPorDeporte` query requires an argument of type `ListPartidosPorDeporteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListPartidosPorDeporteVariables {
  deporteId: UUIDString;
}
```
### Return Type
Recall that executing the `ListPartidosPorDeporte` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPartidosPorDeporteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListPartidosPorDeporte`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPartidosPorDeporte, ListPartidosPorDeporteVariables } from '@dataconnect/generated';

// The `ListPartidosPorDeporte` query requires an argument of type `ListPartidosPorDeporteVariables`:
const listPartidosPorDeporteVars: ListPartidosPorDeporteVariables = {
  deporteId: ..., 
};

// Call the `listPartidosPorDeporte()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPartidosPorDeporte(listPartidosPorDeporteVars);
// Variables can be defined inline as well.
const { data } = await listPartidosPorDeporte({ deporteId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPartidosPorDeporte(dataConnect, listPartidosPorDeporteVars);

console.log(data.partidos);

// Or, you can use the `Promise` API.
listPartidosPorDeporte(listPartidosPorDeporteVars).then((response) => {
  const data = response.data;
  console.log(data.partidos);
});
```

### Using `ListPartidosPorDeporte`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPartidosPorDeporteRef, ListPartidosPorDeporteVariables } from '@dataconnect/generated';

// The `ListPartidosPorDeporte` query requires an argument of type `ListPartidosPorDeporteVariables`:
const listPartidosPorDeporteVars: ListPartidosPorDeporteVariables = {
  deporteId: ..., 
};

// Call the `listPartidosPorDeporteRef()` function to get a reference to the query.
const ref = listPartidosPorDeporteRef(listPartidosPorDeporteVars);
// Variables can be defined inline as well.
const ref = listPartidosPorDeporteRef({ deporteId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPartidosPorDeporteRef(dataConnect, listPartidosPorDeporteVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.partidos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.partidos);
});
```

## ListDivisionesPorDeporte
You can execute the `ListDivisionesPorDeporte` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listDivisionesPorDeporte(vars: ListDivisionesPorDeporteVariables, options?: ExecuteQueryOptions): QueryPromise<ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables>;

interface ListDivisionesPorDeporteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListDivisionesPorDeporteVariables): QueryRef<ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables>;
}
export const listDivisionesPorDeporteRef: ListDivisionesPorDeporteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listDivisionesPorDeporte(dc: DataConnect, vars: ListDivisionesPorDeporteVariables, options?: ExecuteQueryOptions): QueryPromise<ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables>;

interface ListDivisionesPorDeporteRef {
  ...
  (dc: DataConnect, vars: ListDivisionesPorDeporteVariables): QueryRef<ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables>;
}
export const listDivisionesPorDeporteRef: ListDivisionesPorDeporteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDivisionesPorDeporteRef:
```typescript
const name = listDivisionesPorDeporteRef.operationName;
console.log(name);
```

### Variables
The `ListDivisionesPorDeporte` query requires an argument of type `ListDivisionesPorDeporteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListDivisionesPorDeporteVariables {
  deporteId: UUIDString;
}
```
### Return Type
Recall that executing the `ListDivisionesPorDeporte` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDivisionesPorDeporteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListDivisionesPorDeporteData {
  divisions: ({
    id: UUIDString;
    nombre: string;
    nivel: string;
  } & Division_Key)[];
}
```
### Using `ListDivisionesPorDeporte`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listDivisionesPorDeporte, ListDivisionesPorDeporteVariables } from '@dataconnect/generated';

// The `ListDivisionesPorDeporte` query requires an argument of type `ListDivisionesPorDeporteVariables`:
const listDivisionesPorDeporteVars: ListDivisionesPorDeporteVariables = {
  deporteId: ..., 
};

// Call the `listDivisionesPorDeporte()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listDivisionesPorDeporte(listDivisionesPorDeporteVars);
// Variables can be defined inline as well.
const { data } = await listDivisionesPorDeporte({ deporteId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listDivisionesPorDeporte(dataConnect, listDivisionesPorDeporteVars);

console.log(data.divisions);

// Or, you can use the `Promise` API.
listDivisionesPorDeporte(listDivisionesPorDeporteVars).then((response) => {
  const data = response.data;
  console.log(data.divisions);
});
```

### Using `ListDivisionesPorDeporte`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDivisionesPorDeporteRef, ListDivisionesPorDeporteVariables } from '@dataconnect/generated';

// The `ListDivisionesPorDeporte` query requires an argument of type `ListDivisionesPorDeporteVariables`:
const listDivisionesPorDeporteVars: ListDivisionesPorDeporteVariables = {
  deporteId: ..., 
};

// Call the `listDivisionesPorDeporteRef()` function to get a reference to the query.
const ref = listDivisionesPorDeporteRef(listDivisionesPorDeporteVars);
// Variables can be defined inline as well.
const ref = listDivisionesPorDeporteRef({ deporteId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDivisionesPorDeporteRef(dataConnect, listDivisionesPorDeporteVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.divisions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.divisions);
});
```

## ListJugadoresPorEquipo
You can execute the `ListJugadoresPorEquipo` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listJugadoresPorEquipo(vars: ListJugadoresPorEquipoVariables, options?: ExecuteQueryOptions): QueryPromise<ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables>;

interface ListJugadoresPorEquipoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListJugadoresPorEquipoVariables): QueryRef<ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables>;
}
export const listJugadoresPorEquipoRef: ListJugadoresPorEquipoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listJugadoresPorEquipo(dc: DataConnect, vars: ListJugadoresPorEquipoVariables, options?: ExecuteQueryOptions): QueryPromise<ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables>;

interface ListJugadoresPorEquipoRef {
  ...
  (dc: DataConnect, vars: ListJugadoresPorEquipoVariables): QueryRef<ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables>;
}
export const listJugadoresPorEquipoRef: ListJugadoresPorEquipoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listJugadoresPorEquipoRef:
```typescript
const name = listJugadoresPorEquipoRef.operationName;
console.log(name);
```

### Variables
The `ListJugadoresPorEquipo` query requires an argument of type `ListJugadoresPorEquipoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListJugadoresPorEquipoVariables {
  equipoId: UUIDString;
}
```
### Return Type
Recall that executing the `ListJugadoresPorEquipo` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListJugadoresPorEquipoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListJugadoresPorEquipo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listJugadoresPorEquipo, ListJugadoresPorEquipoVariables } from '@dataconnect/generated';

// The `ListJugadoresPorEquipo` query requires an argument of type `ListJugadoresPorEquipoVariables`:
const listJugadoresPorEquipoVars: ListJugadoresPorEquipoVariables = {
  equipoId: ..., 
};

// Call the `listJugadoresPorEquipo()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listJugadoresPorEquipo(listJugadoresPorEquipoVars);
// Variables can be defined inline as well.
const { data } = await listJugadoresPorEquipo({ equipoId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listJugadoresPorEquipo(dataConnect, listJugadoresPorEquipoVars);

console.log(data.jugadors);

// Or, you can use the `Promise` API.
listJugadoresPorEquipo(listJugadoresPorEquipoVars).then((response) => {
  const data = response.data;
  console.log(data.jugadors);
});
```

### Using `ListJugadoresPorEquipo`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listJugadoresPorEquipoRef, ListJugadoresPorEquipoVariables } from '@dataconnect/generated';

// The `ListJugadoresPorEquipo` query requires an argument of type `ListJugadoresPorEquipoVariables`:
const listJugadoresPorEquipoVars: ListJugadoresPorEquipoVariables = {
  equipoId: ..., 
};

// Call the `listJugadoresPorEquipoRef()` function to get a reference to the query.
const ref = listJugadoresPorEquipoRef(listJugadoresPorEquipoVars);
// Variables can be defined inline as well.
const ref = listJugadoresPorEquipoRef({ equipoId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listJugadoresPorEquipoRef(dataConnect, listJugadoresPorEquipoVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jugadors);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jugadors);
});
```

## ListEquiposPorDivision
You can execute the `ListEquiposPorDivision` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listEquiposPorDivision(vars: ListEquiposPorDivisionVariables, options?: ExecuteQueryOptions): QueryPromise<ListEquiposPorDivisionData, ListEquiposPorDivisionVariables>;

interface ListEquiposPorDivisionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListEquiposPorDivisionVariables): QueryRef<ListEquiposPorDivisionData, ListEquiposPorDivisionVariables>;
}
export const listEquiposPorDivisionRef: ListEquiposPorDivisionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listEquiposPorDivision(dc: DataConnect, vars: ListEquiposPorDivisionVariables, options?: ExecuteQueryOptions): QueryPromise<ListEquiposPorDivisionData, ListEquiposPorDivisionVariables>;

interface ListEquiposPorDivisionRef {
  ...
  (dc: DataConnect, vars: ListEquiposPorDivisionVariables): QueryRef<ListEquiposPorDivisionData, ListEquiposPorDivisionVariables>;
}
export const listEquiposPorDivisionRef: ListEquiposPorDivisionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listEquiposPorDivisionRef:
```typescript
const name = listEquiposPorDivisionRef.operationName;
console.log(name);
```

### Variables
The `ListEquiposPorDivision` query requires an argument of type `ListEquiposPorDivisionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListEquiposPorDivisionVariables {
  divisionId: UUIDString;
}
```
### Return Type
Recall that executing the `ListEquiposPorDivision` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListEquiposPorDivisionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListEquiposPorDivisionData {
  equipos: ({
    id: UUIDString;
    nombre: string;
    ciudad?: string | null;
    logoUrl?: string | null;
  } & Equipo_Key)[];
}
```
### Using `ListEquiposPorDivision`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listEquiposPorDivision, ListEquiposPorDivisionVariables } from '@dataconnect/generated';

// The `ListEquiposPorDivision` query requires an argument of type `ListEquiposPorDivisionVariables`:
const listEquiposPorDivisionVars: ListEquiposPorDivisionVariables = {
  divisionId: ..., 
};

// Call the `listEquiposPorDivision()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listEquiposPorDivision(listEquiposPorDivisionVars);
// Variables can be defined inline as well.
const { data } = await listEquiposPorDivision({ divisionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listEquiposPorDivision(dataConnect, listEquiposPorDivisionVars);

console.log(data.equipos);

// Or, you can use the `Promise` API.
listEquiposPorDivision(listEquiposPorDivisionVars).then((response) => {
  const data = response.data;
  console.log(data.equipos);
});
```

### Using `ListEquiposPorDivision`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listEquiposPorDivisionRef, ListEquiposPorDivisionVariables } from '@dataconnect/generated';

// The `ListEquiposPorDivision` query requires an argument of type `ListEquiposPorDivisionVariables`:
const listEquiposPorDivisionVars: ListEquiposPorDivisionVariables = {
  divisionId: ..., 
};

// Call the `listEquiposPorDivisionRef()` function to get a reference to the query.
const ref = listEquiposPorDivisionRef(listEquiposPorDivisionVars);
// Variables can be defined inline as well.
const ref = listEquiposPorDivisionRef({ divisionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listEquiposPorDivisionRef(dataConnect, listEquiposPorDivisionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.equipos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.equipos);
});
```

## ListSponsors
You can execute the `ListSponsors` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listSponsors(options?: ExecuteQueryOptions): QueryPromise<ListSponsorsData, undefined>;

interface ListSponsorsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSponsorsData, undefined>;
}
export const listSponsorsRef: ListSponsorsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSponsors(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListSponsorsData, undefined>;

interface ListSponsorsRef {
  ...
  (dc: DataConnect): QueryRef<ListSponsorsData, undefined>;
}
export const listSponsorsRef: ListSponsorsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSponsorsRef:
```typescript
const name = listSponsorsRef.operationName;
console.log(name);
```

### Variables
The `ListSponsors` query has no variables.
### Return Type
Recall that executing the `ListSponsors` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSponsorsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSponsorsData {
  sponsors: ({
    id: UUIDString;
    nombre: string;
    logoUrl: string;
    slogan?: string | null;
    sitioWeb?: string | null;
  } & Sponsor_Key)[];
}
```
### Using `ListSponsors`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSponsors } from '@dataconnect/generated';


// Call the `listSponsors()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSponsors();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSponsors(dataConnect);

console.log(data.sponsors);

// Or, you can use the `Promise` API.
listSponsors().then((response) => {
  const data = response.data;
  console.log(data.sponsors);
});
```

### Using `ListSponsors`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSponsorsRef } from '@dataconnect/generated';


// Call the `listSponsorsRef()` function to get a reference to the query.
const ref = listSponsorsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSponsorsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.sponsors);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.sponsors);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## JugadorInsert
You can execute the `JugadorInsert` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
jugadorInsert(vars: JugadorInsertVariables): MutationPromise<JugadorInsertData, JugadorInsertVariables>;

interface JugadorInsertRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: JugadorInsertVariables): MutationRef<JugadorInsertData, JugadorInsertVariables>;
}
export const jugadorInsertRef: JugadorInsertRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
jugadorInsert(dc: DataConnect, vars: JugadorInsertVariables): MutationPromise<JugadorInsertData, JugadorInsertVariables>;

interface JugadorInsertRef {
  ...
  (dc: DataConnect, vars: JugadorInsertVariables): MutationRef<JugadorInsertData, JugadorInsertVariables>;
}
export const jugadorInsertRef: JugadorInsertRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the jugadorInsertRef:
```typescript
const name = jugadorInsertRef.operationName;
console.log(name);
```

### Variables
The `JugadorInsert` mutation requires an argument of type `JugadorInsertVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface JugadorInsertVariables {
  nombre: string;
  numeroCamiseta: number;
  posicion: string;
  fechaNacimiento: DateString;
  equipoId: UUIDString;
}
```
### Return Type
Recall that executing the `JugadorInsert` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `JugadorInsertData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface JugadorInsertData {
  jugador_insert: Jugador_Key;
}
```
### Using `JugadorInsert`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, jugadorInsert, JugadorInsertVariables } from '@dataconnect/generated';

// The `JugadorInsert` mutation requires an argument of type `JugadorInsertVariables`:
const jugadorInsertVars: JugadorInsertVariables = {
  nombre: ..., 
  numeroCamiseta: ..., 
  posicion: ..., 
  fechaNacimiento: ..., 
  equipoId: ..., 
};

// Call the `jugadorInsert()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await jugadorInsert(jugadorInsertVars);
// Variables can be defined inline as well.
const { data } = await jugadorInsert({ nombre: ..., numeroCamiseta: ..., posicion: ..., fechaNacimiento: ..., equipoId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await jugadorInsert(dataConnect, jugadorInsertVars);

console.log(data.jugador_insert);

// Or, you can use the `Promise` API.
jugadorInsert(jugadorInsertVars).then((response) => {
  const data = response.data;
  console.log(data.jugador_insert);
});
```

### Using `JugadorInsert`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, jugadorInsertRef, JugadorInsertVariables } from '@dataconnect/generated';

// The `JugadorInsert` mutation requires an argument of type `JugadorInsertVariables`:
const jugadorInsertVars: JugadorInsertVariables = {
  nombre: ..., 
  numeroCamiseta: ..., 
  posicion: ..., 
  fechaNacimiento: ..., 
  equipoId: ..., 
};

// Call the `jugadorInsertRef()` function to get a reference to the mutation.
const ref = jugadorInsertRef(jugadorInsertVars);
// Variables can be defined inline as well.
const ref = jugadorInsertRef({ nombre: ..., numeroCamiseta: ..., posicion: ..., fechaNacimiento: ..., equipoId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = jugadorInsertRef(dataConnect, jugadorInsertVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.jugador_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.jugador_insert);
});
```

