import { describe, it } from "node:test"
import { deepEqual, throws, rejects } from "node:assert/strict"

describe("The compiler", () => {
  it("is alive", () => {
    deepEqual(1, 1)
  })
})
