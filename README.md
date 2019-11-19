# redux-core-reducers
A collection of re-usable and configurable reducers for redux applications.

This package exports a number of helper methods for creating simple redux reducers. It is quite a small library so you may find it helpful to read the source code to understand exactly what is happening under the hood.

## Installation

`yarn add @autotelic/redux-core-reducers`

## Usage

### createStandardReducer

Is a helper for constructing functions that are used to create reducers.

It accepts a state handler function with the signature:

```js
const stateHandler = (state, payload, meta, additionalArgs) => { /* return the modified state */ };
```

* `state`: Reducer state
* `payload`: Action payload
* `meta`: Action meta
* `AdditionalArgs`: Other arguments needed by the reducer

`createStandardReducer` when called with a stateHandler function, returns the following function that is used to create the other reducers. This method is used to construct the other createReducer functions in this library.

```js
function initialize(
  typeOrTypes,
  initialState = Immutable({}),
  additionalArgs,
) {
  const types = Array.isArray(typeOrTypes)
    ? typeOrTypes
    : [typeOrTypes];
  return function standardReducer(state = initialState, action) {
    const {
      type,
      payload,
      meta,
    } = action;

    if (types.includes(type)) {
      if (payload !== undefined) {
        // This is the state handler passed to createStandardReducer.
        return stateHandler(state, payload, meta, additionalArgs);
      }
      return initialState;
    }
    return state;
  };
}
```

#### Example Usage

```js
import { createStandardReducer } from '@autotelic/redux-core-reducers';

const defaultState = {};

const standardReducer = createStandardReducer(
  (state, payload) => payload,
)(
  'SOME_ACTION',
  defaultState,
);
```

### Core Reducers

These reducers use [seamless-immutable](https://github.com/rtfeldman/seamless-immutable) methods
in the stateHandlers for the below create reducer helpers.

Each of:

* createNameValueReducer
* createMergePayloadReducer
* createReplacePayloadReducer

are used in the same way, but perform different operations on the state of the reducer.

The first argument is an action type, or an array of action types that the reducer
should operate on.

The second argument is the default state for the reducer.

These are all constructed using `createStandardReducer`.

### Examples

#### createReplacePayloadReducer

Replaces an action payload with the existing state (uses seamless-immutable replace).

```js
import Immutable from 'seamless-immutable';
import { createReplacePayloadReducer } from '@autotelic/redux-core-reducers';

const defaultState = Immutable({});

const replacePayloadReducer = createReplacePayloadReducer('SOME_ACTION', defaultState);

const replacePayloadReducerMultipleActions = createReplacePayloadReducer(
  [
    'SOME_ACTION',
    'ANOTHER_ACTION,',
  ],
  defaultState,
);
```

#### createMergePayloadReducer

Merges an action payload with the existing state (uses seamless-immutable merge).

```js
import Immutable from 'seamless-immutable';
import { createMergePayloadReducer } from '@autotelic/redux-core-reducers';

const defaultState = Immutable({});

const mergePayloadReducer = createMergePayloadReducer('SOME_ACTION', defaultState);

const mergePayloadReducerMultipleActions = createMergePayloadReducer(
  [
    'SOME_ACTION',
    'ANOTHER_ACTION,',
  ],
  defaultState,
);
```

#### createMergePayloadReducer

Removes entries from a state object where the key matches the payload Payload may be an
Array of strings or a string to be compared against the state objects keys.
(uses seamless-immutable `without`).

```js
import Immutable from 'seamless-immutable';
import { createWithoutPayloadReducer } from '@autotelic/redux-core-reducers';

const defaultState = Immutable({});

const mergePayloadReducer = createWithoutPayloadReducer('SOME_ACTION', defaultState);

const mergePayloadReducerMultipleActions = createWithoutPayloadReducer(
  [
    'SOME_ACTION',
    'ANOTHER_ACTION,',
  ],
  defaultState,
);
```

#### createNameValueReducer

Creates a reducer that takes an action that has a payload containing name and value
keys and adds those values to the state.

```js
import Immutable from 'seamless-immutable';
import { createNameValueReducer } from '@autotelic/redux-core-reducers';

const defaultState = Immutable({});

const nameValuePayloadReducer = createNameValueReducer('SOME_ACTION', defaultState);

const nameValuePayloadReducerMultipleActions = createNameValueReducer(
  [
    'SOME_ACTION',
    'ANOTHER_ACTION,',
  ],
  defaultState,
);
```
