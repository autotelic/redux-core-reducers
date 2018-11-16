/* @flow */

import { expect } from 'chai';
import Immutable from 'seamless-immutable';
import {
  nameValueHandler,
  replacePayloadHandler,
} from './handlers';

describe('handlers', () => {
  let state;
  let payload;
  let keys;

  beforeEach(() => {
    state = {};

    payload = {
      name: 'email',
      value: 'test@email.com',
      otherName: 'testName',
      otherValue: 'tests',
    };

    keys = {
      name: 'otherName',
      value: 'otherValue',
    };
  });

  describe('nameValueHandler', () => {
    it('uses the default keys to to update the state', () => {
      // Arrange
      const expected = Immutable({ email: 'test@email.com' });

      // Act
      const actual = nameValueHandler(state, payload);

      // Assert
      expect(expected).to.eql(actual);
    });

    it('uses the provided keys to to update the state if provided', () => {
      // Arrange
      const expected = Immutable({ testName: 'tests' });

      // Act
      const actual = nameValueHandler(state, payload, keys);

      // Assert
      expect(expected).to.eql(actual);
    });
  });

  describe('replacePayloadHandler', () => {
    const tests = [
      {
        desc: 'replaces the existing state with new keys',
        state: Immutable({ shouldBeRemoved: true }),
        payload: Immutable({ test: 'state' }),
        expected: { test: 'state' },
      },
      {
        desc: 'Does not update existing keys if the values is the same',
        state: Immutable({ test: 'state' }),
        payload: Immutable({ test: 'state' }),
        expected: { test: 'state' },
      },
    ];

    tests.forEach((t) => {
      it(t.desc, () => {
        // Act
        const actual = replacePayloadHandler(t.state, t.payload);

        // Assert
        expect(actual).to.eql(t.expected);
      });
    });
  });
});
