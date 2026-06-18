# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
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

No queries were generated for the `example` connector.

If you want to learn more about how to use queries in Data Connect, you can follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

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

