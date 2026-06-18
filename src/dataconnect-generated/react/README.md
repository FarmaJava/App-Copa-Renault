# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect-generated/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
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

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `example`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `example` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## ListPartidosPorDeporte
You can execute the `ListPartidosPorDeporte` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListPartidosPorDeporte(dc: DataConnect, vars: ListPartidosPorDeporteVariables, options?: useDataConnectQueryOptions<ListPartidosPorDeporteData>): UseDataConnectQueryResult<ListPartidosPorDeporteData, ListPartidosPorDeporteVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListPartidosPorDeporte(vars: ListPartidosPorDeporteVariables, options?: useDataConnectQueryOptions<ListPartidosPorDeporteData>): UseDataConnectQueryResult<ListPartidosPorDeporteData, ListPartidosPorDeporteVariables>;
```

### Variables
The `ListPartidosPorDeporte` Query requires an argument of type `ListPartidosPorDeporteVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListPartidosPorDeporteVariables {
  deporteId: UUIDString;
}
```
### Return Type
Recall that calling the `ListPartidosPorDeporte` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListPartidosPorDeporte` Query is of type `ListPartidosPorDeporteData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListPartidosPorDeporte`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListPartidosPorDeporteVariables } from '@dataconnect/generated';
import { useListPartidosPorDeporte } from '@dataconnect/generated/react'

export default function ListPartidosPorDeporteComponent() {
  // The `useListPartidosPorDeporte` Query hook requires an argument of type `ListPartidosPorDeporteVariables`:
  const listPartidosPorDeporteVars: ListPartidosPorDeporteVariables = {
    deporteId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListPartidosPorDeporte(listPartidosPorDeporteVars);
  // Variables can be defined inline as well.
  const query = useListPartidosPorDeporte({ deporteId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListPartidosPorDeporte(dataConnect, listPartidosPorDeporteVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListPartidosPorDeporte(listPartidosPorDeporteVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListPartidosPorDeporte(dataConnect, listPartidosPorDeporteVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.partidos);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListDivisionesPorDeporte
You can execute the `ListDivisionesPorDeporte` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListDivisionesPorDeporte(dc: DataConnect, vars: ListDivisionesPorDeporteVariables, options?: useDataConnectQueryOptions<ListDivisionesPorDeporteData>): UseDataConnectQueryResult<ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListDivisionesPorDeporte(vars: ListDivisionesPorDeporteVariables, options?: useDataConnectQueryOptions<ListDivisionesPorDeporteData>): UseDataConnectQueryResult<ListDivisionesPorDeporteData, ListDivisionesPorDeporteVariables>;
```

### Variables
The `ListDivisionesPorDeporte` Query requires an argument of type `ListDivisionesPorDeporteVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListDivisionesPorDeporteVariables {
  deporteId: UUIDString;
}
```
### Return Type
Recall that calling the `ListDivisionesPorDeporte` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListDivisionesPorDeporte` Query is of type `ListDivisionesPorDeporteData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListDivisionesPorDeporteData {
  divisions: ({
    id: UUIDString;
    nombre: string;
    nivel: string;
  } & Division_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListDivisionesPorDeporte`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListDivisionesPorDeporteVariables } from '@dataconnect/generated';
import { useListDivisionesPorDeporte } from '@dataconnect/generated/react'

export default function ListDivisionesPorDeporteComponent() {
  // The `useListDivisionesPorDeporte` Query hook requires an argument of type `ListDivisionesPorDeporteVariables`:
  const listDivisionesPorDeporteVars: ListDivisionesPorDeporteVariables = {
    deporteId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListDivisionesPorDeporte(listDivisionesPorDeporteVars);
  // Variables can be defined inline as well.
  const query = useListDivisionesPorDeporte({ deporteId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListDivisionesPorDeporte(dataConnect, listDivisionesPorDeporteVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListDivisionesPorDeporte(listDivisionesPorDeporteVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListDivisionesPorDeporte(dataConnect, listDivisionesPorDeporteVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.divisions);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListJugadoresPorEquipo
You can execute the `ListJugadoresPorEquipo` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListJugadoresPorEquipo(dc: DataConnect, vars: ListJugadoresPorEquipoVariables, options?: useDataConnectQueryOptions<ListJugadoresPorEquipoData>): UseDataConnectQueryResult<ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListJugadoresPorEquipo(vars: ListJugadoresPorEquipoVariables, options?: useDataConnectQueryOptions<ListJugadoresPorEquipoData>): UseDataConnectQueryResult<ListJugadoresPorEquipoData, ListJugadoresPorEquipoVariables>;
```

### Variables
The `ListJugadoresPorEquipo` Query requires an argument of type `ListJugadoresPorEquipoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListJugadoresPorEquipoVariables {
  equipoId: UUIDString;
}
```
### Return Type
Recall that calling the `ListJugadoresPorEquipo` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListJugadoresPorEquipo` Query is of type `ListJugadoresPorEquipoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListJugadoresPorEquipo`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListJugadoresPorEquipoVariables } from '@dataconnect/generated';
import { useListJugadoresPorEquipo } from '@dataconnect/generated/react'

export default function ListJugadoresPorEquipoComponent() {
  // The `useListJugadoresPorEquipo` Query hook requires an argument of type `ListJugadoresPorEquipoVariables`:
  const listJugadoresPorEquipoVars: ListJugadoresPorEquipoVariables = {
    equipoId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListJugadoresPorEquipo(listJugadoresPorEquipoVars);
  // Variables can be defined inline as well.
  const query = useListJugadoresPorEquipo({ equipoId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListJugadoresPorEquipo(dataConnect, listJugadoresPorEquipoVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListJugadoresPorEquipo(listJugadoresPorEquipoVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListJugadoresPorEquipo(dataConnect, listJugadoresPorEquipoVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.jugadors);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListEquiposPorDivision
You can execute the `ListEquiposPorDivision` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListEquiposPorDivision(dc: DataConnect, vars: ListEquiposPorDivisionVariables, options?: useDataConnectQueryOptions<ListEquiposPorDivisionData>): UseDataConnectQueryResult<ListEquiposPorDivisionData, ListEquiposPorDivisionVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListEquiposPorDivision(vars: ListEquiposPorDivisionVariables, options?: useDataConnectQueryOptions<ListEquiposPorDivisionData>): UseDataConnectQueryResult<ListEquiposPorDivisionData, ListEquiposPorDivisionVariables>;
```

### Variables
The `ListEquiposPorDivision` Query requires an argument of type `ListEquiposPorDivisionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListEquiposPorDivisionVariables {
  divisionId: UUIDString;
}
```
### Return Type
Recall that calling the `ListEquiposPorDivision` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListEquiposPorDivision` Query is of type `ListEquiposPorDivisionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListEquiposPorDivisionData {
  equipos: ({
    id: UUIDString;
    nombre: string;
    ciudad?: string | null;
    logoUrl?: string | null;
  } & Equipo_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListEquiposPorDivision`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListEquiposPorDivisionVariables } from '@dataconnect/generated';
import { useListEquiposPorDivision } from '@dataconnect/generated/react'

export default function ListEquiposPorDivisionComponent() {
  // The `useListEquiposPorDivision` Query hook requires an argument of type `ListEquiposPorDivisionVariables`:
  const listEquiposPorDivisionVars: ListEquiposPorDivisionVariables = {
    divisionId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListEquiposPorDivision(listEquiposPorDivisionVars);
  // Variables can be defined inline as well.
  const query = useListEquiposPorDivision({ divisionId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListEquiposPorDivision(dataConnect, listEquiposPorDivisionVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListEquiposPorDivision(listEquiposPorDivisionVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListEquiposPorDivision(dataConnect, listEquiposPorDivisionVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.equipos);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListSponsors
You can execute the `ListSponsors` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListSponsors(dc: DataConnect, options?: useDataConnectQueryOptions<ListSponsorsData>): UseDataConnectQueryResult<ListSponsorsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListSponsors(options?: useDataConnectQueryOptions<ListSponsorsData>): UseDataConnectQueryResult<ListSponsorsData, undefined>;
```

### Variables
The `ListSponsors` Query has no variables.
### Return Type
Recall that calling the `ListSponsors` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListSponsors` Query is of type `ListSponsorsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListSponsors`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListSponsors } from '@dataconnect/generated/react'

export default function ListSponsorsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListSponsors();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListSponsors(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListSponsors(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListSponsors(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.sponsors);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `example` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## JugadorInsert
You can execute the `JugadorInsert` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useJugadorInsert(options?: useDataConnectMutationOptions<JugadorInsertData, FirebaseError, JugadorInsertVariables>): UseDataConnectMutationResult<JugadorInsertData, JugadorInsertVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useJugadorInsert(dc: DataConnect, options?: useDataConnectMutationOptions<JugadorInsertData, FirebaseError, JugadorInsertVariables>): UseDataConnectMutationResult<JugadorInsertData, JugadorInsertVariables>;
```

### Variables
The `JugadorInsert` Mutation requires an argument of type `JugadorInsertVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface JugadorInsertVariables {
  nombre: string;
  numeroCamiseta: number;
  posicion: string;
  fechaNacimiento: DateString;
  equipoId: UUIDString;
}
```
### Return Type
Recall that calling the `JugadorInsert` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `JugadorInsert` Mutation is of type `JugadorInsertData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface JugadorInsertData {
  jugador_insert: Jugador_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `JugadorInsert`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, JugadorInsertVariables } from '@dataconnect/generated';
import { useJugadorInsert } from '@dataconnect/generated/react'

export default function JugadorInsertComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useJugadorInsert();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useJugadorInsert(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useJugadorInsert(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useJugadorInsert(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useJugadorInsert` Mutation requires an argument of type `JugadorInsertVariables`:
  const jugadorInsertVars: JugadorInsertVariables = {
    nombre: ..., 
    numeroCamiseta: ..., 
    posicion: ..., 
    fechaNacimiento: ..., 
    equipoId: ..., 
  };
  mutation.mutate(jugadorInsertVars);
  // Variables can be defined inline as well.
  mutation.mutate({ nombre: ..., numeroCamiseta: ..., posicion: ..., fechaNacimiento: ..., equipoId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(jugadorInsertVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.jugador_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

