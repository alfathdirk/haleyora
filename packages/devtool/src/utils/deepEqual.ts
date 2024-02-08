import assert from 'node:assert';

export function deepEqual(o1: object, o2: object) {
  try {
    assert.deepStrictEqual(o1, o2);
    return true;
  } catch (err) {
    return false;
  }
}
