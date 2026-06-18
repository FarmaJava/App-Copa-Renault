const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'copa-renualt-app-service',
  location: 'southamerica-east1'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const jugadorInsertRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'JugadorInsert', inputVars);
}
jugadorInsertRef.operationName = 'JugadorInsert';
exports.jugadorInsertRef = jugadorInsertRef;

exports.jugadorInsert = function jugadorInsert(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(jugadorInsertRef(dcInstance, inputVars));
}
;

const listPartidosPorDeporteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPartidosPorDeporte', inputVars);
}
listPartidosPorDeporteRef.operationName = 'ListPartidosPorDeporte';
exports.listPartidosPorDeporteRef = listPartidosPorDeporteRef;

exports.listPartidosPorDeporte = function listPartidosPorDeporte(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listPartidosPorDeporteRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listDivisionesPorDeporteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListDivisionesPorDeporte', inputVars);
}
listDivisionesPorDeporteRef.operationName = 'ListDivisionesPorDeporte';
exports.listDivisionesPorDeporteRef = listDivisionesPorDeporteRef;

exports.listDivisionesPorDeporte = function listDivisionesPorDeporte(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listDivisionesPorDeporteRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listJugadoresPorEquipoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListJugadoresPorEquipo', inputVars);
}
listJugadoresPorEquipoRef.operationName = 'ListJugadoresPorEquipo';
exports.listJugadoresPorEquipoRef = listJugadoresPorEquipoRef;

exports.listJugadoresPorEquipo = function listJugadoresPorEquipo(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listJugadoresPorEquipoRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listEquiposPorDivisionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListEquiposPorDivision', inputVars);
}
listEquiposPorDivisionRef.operationName = 'ListEquiposPorDivision';
exports.listEquiposPorDivisionRef = listEquiposPorDivisionRef;

exports.listEquiposPorDivision = function listEquiposPorDivision(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listEquiposPorDivisionRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listSponsorsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSponsors');
}
listSponsorsRef.operationName = 'ListSponsors';
exports.listSponsorsRef = listSponsorsRef;

exports.listSponsors = function listSponsors(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listSponsorsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listProductosCantinaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProductosCantina');
}
listProductosCantinaRef.operationName = 'ListProductosCantina';
exports.listProductosCantinaRef = listProductosCantinaRef;

exports.listProductosCantina = function listProductosCantina(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listProductosCantinaRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listProductosCantinaDisponiblesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProductosCantinaDisponibles');
}
listProductosCantinaDisponiblesRef.operationName = 'ListProductosCantinaDisponibles';
exports.listProductosCantinaDisponiblesRef = listProductosCantinaDisponiblesRef;

exports.listProductosCantinaDisponibles = function listProductosCantinaDisponibles(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listProductosCantinaDisponiblesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listProductoscantinaPorCategoriaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProductoscantinaPorCategoria', inputVars);
}
listProductoscantinaPorCategoriaRef.operationName = 'ListProductoscantinaPorCategoria';
exports.listProductoscantinaPorCategoriaRef = listProductoscantinaPorCategoriaRef;

exports.listProductoscantinaPorCategoria = function listProductoscantinaPorCategoria(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listProductoscantinaPorCategoriaRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getProductoCantinaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProductoCantina', inputVars);
}
getProductoCantinaRef.operationName = 'GetProductoCantina';
exports.getProductoCantinaRef = getProductoCantinaRef;

exports.getProductoCantina = function getProductoCantina(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getProductoCantinaRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createProductoCantinaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProductoCantina', inputVars);
}
createProductoCantinaRef.operationName = 'CreateProductoCantina';
exports.createProductoCantinaRef = createProductoCantinaRef;

exports.createProductoCantina = function createProductoCantina(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createProductoCantinaRef(dcInstance, inputVars));
}
;

const updateProductoCantinaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProductoCantina', inputVars);
}
updateProductoCantinaRef.operationName = 'UpdateProductoCantina';
exports.updateProductoCantinaRef = updateProductoCantinaRef;

exports.updateProductoCantina = function updateProductoCantina(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateProductoCantinaRef(dcInstance, inputVars));
}
;

const deleteProductoCantinaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteProductoCantina', inputVars);
}
deleteProductoCantinaRef.operationName = 'DeleteProductoCantina';
exports.deleteProductoCantinaRef = deleteProductoCantinaRef;

exports.deleteProductoCantina = function deleteProductoCantina(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteProductoCantinaRef(dcInstance, inputVars));
}
;

const createUsuarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUsuario', inputVars);
}
createUsuarioRef.operationName = 'CreateUsuario';
exports.createUsuarioRef = createUsuarioRef;

exports.createUsuario = function createUsuario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createUsuarioRef(dcInstance, inputVars));
}
;
