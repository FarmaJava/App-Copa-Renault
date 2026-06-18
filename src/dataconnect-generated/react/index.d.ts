import { JugadorInsertData, JugadorInsertVariables } from '../';
import { UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useJugadorInsert(options?: useDataConnectMutationOptions<JugadorInsertData, FirebaseError, JugadorInsertVariables>): UseDataConnectMutationResult<JugadorInsertData, JugadorInsertVariables>;
export function useJugadorInsert(dc: DataConnect, options?: useDataConnectMutationOptions<JugadorInsertData, FirebaseError, JugadorInsertVariables>): UseDataConnectMutationResult<JugadorInsertData, JugadorInsertVariables>;
