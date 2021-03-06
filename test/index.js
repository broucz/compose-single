/* global describe it */

import { expect } from 'chai';
import compose from '../src';

describe('Compose', () => {
  it('should compose from right to left', () => {
    const double = x => x * 2;
    const square = x => x * x;
    expect(compose(square)(5)).to.equal(25);
    expect(compose(square, double)(5)).to.equal(100);
    expect(compose(double, square, double)(5)).to.equal(200);
  });

  it('should composes functions from right to left', () => {
    const a = next => x => next(`${x}a`);
    const b = next => x => next(`${x}b`);
    const c = next => x => next(`${x}c`);
    const final = x => x;

    expect(compose(a, b, c)(final)('')).to.equal('abc');
    expect(compose(b, c, a)(final)('')).to.equal('bca');
    expect(compose(c, a, b)(final)('')).to.equal('cab');
  });

  it('should accept to be seeded with multiple arguments', () => {
    const square = x => x * x;
    const add = (x, y) => x + y;
    expect(compose(square, add)(1, 2)).to.equal(9);
  });

  it('should returns the first given argument if given no functions', () => {
    expect(compose()(1, 2)).to.equal(1);
    expect(compose()(3)).to.equal(3);
    expect(compose()()).to.equal(undefined);
  });
});
