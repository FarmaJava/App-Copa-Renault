# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useJugadorInsert, useListPartidosPorDeporte, useListDivisionesPorDeporte, useListJugadoresPorEquipo, useListEquiposPorDivision, useListSponsors, useListProductosCantina, useListProductosCantinaDisponibles, useListProductoscantinaPorCategoria, useGetProductoCantina } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useJugadorInsert(jugadorInsertVars);

const { data, isPending, isSuccess, isError, error } = useListPartidosPorDeporte(listPartidosPorDeporteVars);

const { data, isPending, isSuccess, isError, error } = useListDivisionesPorDeporte(listDivisionesPorDeporteVars);

const { data, isPending, isSuccess, isError, error } = useListJugadoresPorEquipo(listJugadoresPorEquipoVars);

const { data, isPending, isSuccess, isError, error } = useListEquiposPorDivision(listEquiposPorDivisionVars);

const { data, isPending, isSuccess, isError, error } = useListSponsors();

const { data, isPending, isSuccess, isError, error } = useListProductosCantina();

const { data, isPending, isSuccess, isError, error } = useListProductosCantinaDisponibles();

const { data, isPending, isSuccess, isError, error } = useListProductoscantinaPorCategoria(listProductoscantinaPorCategoriaVars);

const { data, isPending, isSuccess, isError, error } = useGetProductoCantina(getProductoCantinaVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { jugadorInsert, listPartidosPorDeporte, listDivisionesPorDeporte, listJugadoresPorEquipo, listEquiposPorDivision, listSponsors, listProductosCantina, listProductosCantinaDisponibles, listProductoscantinaPorCategoria, getProductoCantina } from '@dataconnect/generated';


// Operation JugadorInsert:  For variables, look at type JugadorInsertVars in ../index.d.ts
const { data } = await JugadorInsert(dataConnect, jugadorInsertVars);

// Operation ListPartidosPorDeporte:  For variables, look at type ListPartidosPorDeporteVars in ../index.d.ts
const { data } = await ListPartidosPorDeporte(dataConnect, listPartidosPorDeporteVars);

// Operation ListDivisionesPorDeporte:  For variables, look at type ListDivisionesPorDeporteVars in ../index.d.ts
const { data } = await ListDivisionesPorDeporte(dataConnect, listDivisionesPorDeporteVars);

// Operation ListJugadoresPorEquipo:  For variables, look at type ListJugadoresPorEquipoVars in ../index.d.ts
const { data } = await ListJugadoresPorEquipo(dataConnect, listJugadoresPorEquipoVars);

// Operation ListEquiposPorDivision:  For variables, look at type ListEquiposPorDivisionVars in ../index.d.ts
const { data } = await ListEquiposPorDivision(dataConnect, listEquiposPorDivisionVars);

// Operation ListSponsors: 
const { data } = await ListSponsors(dataConnect);

// Operation ListProductosCantina: 
const { data } = await ListProductosCantina(dataConnect);

// Operation ListProductosCantinaDisponibles: 
const { data } = await ListProductosCantinaDisponibles(dataConnect);

// Operation ListProductoscantinaPorCategoria:  For variables, look at type ListProductoscantinaPorCategoriaVars in ../index.d.ts
const { data } = await ListProductoscantinaPorCategoria(dataConnect, listProductoscantinaPorCategoriaVars);

// Operation GetProductoCantina:  For variables, look at type GetProductoCantinaVars in ../index.d.ts
const { data } = await GetProductoCantina(dataConnect, getProductoCantinaVars);


```