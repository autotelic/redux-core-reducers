/* @flow */

import Immutable from 'seamless-immutable';
import get from 'lodash.get';

/* State handler that sets name / value pairs. */
export const nameValueHandler = (state: {}, payload: {}, meta: {}, keys?: {}) => {
  const nameKey = get(keys, ['name'], 'name');
  const valueKey = get(keys, ['value'], 'value');
  return Immutable.set(state, payload[nameKey], payload[valueKey]);
};

/* State handler that merges a state with a payload. */
export const mergePayloadHandler = (state: {}, payload: {}) => Immutable.merge(state, payload);

/* State handler that replaces state with a payload */
export const replacePayloadHandler = (state: {}, payload: {}) => (
  Immutable.replace(state, payload, { deep: true })
);

export const withoutPayloadHander = (state: {}, payload: Array<string> | string) => (
  Immutable.without(state, payload)
);
