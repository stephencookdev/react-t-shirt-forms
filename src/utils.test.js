import { deepEquals } from "./utils";

describe("deepEquals", () => {
  it("should match basic values", () => {
    expect(deepEquals(1, 1)).toBe(true);
  });

  it("should not match mismatching basic values", () => {
    expect(deepEquals(1, 2)).toBe(false);
  });

  it("should not match mismatching types", () => {
    expect(deepEquals([], {})).toBe(false);
  });

  it("should match out of order arrays", () => {
    expect(deepEquals([1, 2, 3], [2, 3, 1])).toBe(true);
  });

  it("should match empty arrays", () => {
    expect(deepEquals([], [])).toBe(true);
  });

  it("should not match mismatching arrays", () => {
    expect(deepEquals([1, 2], [1])).toBe(false);
  });

  it("should match out of order objects", () => {
    expect(deepEquals({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
  });

  it("should match objects with complex values", () => {
    expect(deepEquals({ a: [1, 2], b: [3, 4] }, { a: [1, 2], b: [3, 4] })).toBe(
      true
    );
  });

  it("should not match mismatching objects", () => {
    expect(deepEquals({ a: 1, b: 2 }, { a: 1 })).toBe(false);
  });
});
