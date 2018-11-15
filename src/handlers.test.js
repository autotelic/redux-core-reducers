/* @flow */

import { expect } from 'chai';
import Immutable from 'seamless-immutable';
import { nameValueHandler } from './handlers';

describe('handlers', () => {
  let state;
  let payload;
  let keys;

  beforeEach(() => {
    state = {};

    payload = {
      name: 'email',
      value: 'test@email.com',
      otherName: 'password',
      otherValue: 'top-secret',
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
      const expected = Immutable({ password: 'top-secret' });

      // Act
      const actual = nameValueHandler(state, payload, keys);

      // Assert
      expect(expected).to.eql(actual);
    });
  });
});
