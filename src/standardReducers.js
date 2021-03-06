/* @flow */

import Immutable from 'seamless-immutable';
import {
  nameValueHandler,
  mergePayloadHandler,
  replacePayloadHandler,
  withoutPayloadHander,
} from './handlers';

type ActionType = Array<string> | string;

type Action = {
  +type: string,
  +payload: any,
};

/**
 * Generic create reducer that accepts a stateHandler function that will
 * process and update the state.
 *
 * @param  {Function} stateHandler  Function that receives the current state and
 * and action payload. Must return a seamless-immutable object.
 *
 * @return {Function} Generic reducer function. Receives action type (string) or types (array)
 * and an initial state.
 */
export const createStandardReducer = (stateHandler: ({}, {}, {}, any) => {}) => (
  function initialize(
    typeOrTypes: ActionType,
    initialState: {} = Immutable({}),
    additionalArgs?: {},
  ) {
    const types = Array.isArray(typeOrTypes)
      ? typeOrTypes
      : [typeOrTypes];
    return function standardReducer(state: {} = initialState, action: Action) {
      const {
        type,
        payload,
        meta,
      } = action;

      if (types.includes(type)) {
        if (payload !== undefined) {
          return stateHandler(state, payload, meta, additionalArgs);
        }
        return initialState;
      }
      return state;
    };
  }
);

/**
 * Creates a reducer that takes an action that has a payload containing
 * name and value keys and adds those values to the state.
 *
 * @param  {Array | String} typeOrTypes  The action(s) that the reducer will operate on.
 *
 * @param  {Object} initialState  The intitial state shape.
 *
 * @param  {Object} keys  Optional replacement keys that the reducer should expect the action
 * to have.
 *
 * @return {Function} nameValueReducer  The configured name/value reducer.
 */
export const createNameValueReducer = createStandardReducer(nameValueHandler);

/**
 * Creates a reducer that merges a payload with the state.
 *
 * @param  {Array | String} typeOrTypes  The action(s) that the reducer will operate on.
 *
 * @param  {Object} initialState  The intitial state shape.
 *
 * @return {Function} mergePayloadReducer  The configured merge payload reducer.
 */
export const createMergePayloadReducer = createStandardReducer(mergePayloadHandler);

/**
 * Creates a reducer that replaces the state with a payload.
 *
 * @param  {Array | String} typeOrTypes  The action(s) that the reducer will operate on.
 *
 * @param  {Object} initialState  The intitial state shape.
 *
 * @return {Function} replacePayloadReducer  The configured replace payload reducer.
 */
export const createReplacePayloadReducer = createStandardReducer(replacePayloadHandler);

/**
 * Creates a reducer that removes entries from a state object where the keys match the value
 * of the payload. Payload may be an Array of strings or a string.
 *
 * @param  {Array | String} typeOrTypes  The action(s) that the reducer will operate on.
 *
 * @param  {Object} initialState  The intitial state shape.
 *
 * @return {Function} withoutPayloadReducer  The configured replace payload reducer.
 */
export const createWithoutPayloadReducer = createStandardReducer(withoutPayloadHander);
