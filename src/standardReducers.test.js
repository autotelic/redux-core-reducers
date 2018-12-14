/* @flow */

import { expect } from 'chai';
import sinon from 'sinon';
import Immutable from 'seamless-immutable';

import { createStandardReducer } from './standardReducers';

describe('standard reducers', () => {
  const typeValues = [
    'VALID_1',
    'VALID_2',
    'VALID_3',
  ];

  const invalidTypeArr = [
    'INVALID_1',
    'INVALID_2',
    'INVALID_3',
  ];

  describe('createNameValueReducer', () => {
    let singleAction;
    let providedState;
    let spy;
    let standardReducer;

    beforeEach(() => {
      spy = sinon.spy();
      providedState = Immutable({ email: 'test@email.com' });
      singleAction = {
        type: 'VALID_1',
        payload: {
          name: 'email',
          value: 'should@update.com',
        },
        meta: { async: true },
      };
      standardReducer = createStandardReducer(spy);
    });

    describe('Should match the provided action types and return the correct value', () => {
      it('matches an array of action types and calls the handler', () => {
        // Arrange
        const multipleActionReducer = standardReducer(typeValues);

        // Act
        multipleActionReducer(providedState, singleAction);

        // Assert
        expect(spy.called);
      });

      it('matches a single action type and calls the handler', () => {
        // Arrange
        const singleActionReducer = standardReducer('VALID_1');

        // Act
        singleActionReducer(providedState, singleAction);

        // Assert
        expect(spy.called);
      });

      it('returns the state if the action does not match the single type', () => {
        // Arrange
        const singleActionReducer = standardReducer('INVALID_2');

        // Act
        const actual = singleActionReducer(providedState, singleAction);

        // Assert
        expect(actual).to.deep.equal(providedState);
      });

      it('returns the state if the action does not match one of the types', () => {
        // Arrange
        const multipleActionReducer = standardReducer(invalidTypeArr);

        // Act
        const actual = multipleActionReducer(providedState, singleAction);

        // Assert
        expect(actual).to.deep.equal(providedState);
      });

      it('calls the handler with the state, action payload, meta and additionalArgs', () => {
        // Arrange
        const additionalArgs = { arg1: 1, arg2: 2 };
        // Arrange
        const singleActionReducer = standardReducer('VALID_1', additionalArgs);

        // Act
        singleActionReducer(providedState, singleAction);

        // Assert
        expect(spy.calledWithExactly(
          providedState,
          singleAction.payload,
          singleAction.meta,
          additionalArgs,
        ));
      });

      it('returns the initial state when receiveing an undefined payload', () => {
        // Arrange
        const defaultState = Immutable({ is: 'this state' });
        const singleActionReducer = standardReducer(typeValues, defaultState);
        const action = {
          type: 'VALID_1',
          payload: undefined,
        };

        // Act
        const actual = singleActionReducer(Immutable({ not: 'this state' }), action);

        // Assert
        expect(actual).to.deep.equal(defaultState);
      });
    });
  });
});
