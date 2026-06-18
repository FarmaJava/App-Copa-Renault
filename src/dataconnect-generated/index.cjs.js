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
