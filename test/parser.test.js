import { describe, it } from "node:test"
import { deepEqual, throws, rejects } from "node:assert/strict"
import assert from "node:assert/strict"
import parse from "../src/parser.js"

const syntaxChecks = [
  ["short if", "if true { print(1); }"],
  ["longer if", "if true { print(1); } else { print(1); }"],
  ["even longer if", "if true { print(1); } else if false { print(1);}"],
  ["while with empty block", "while true {}"],
  ["while with one statement block", "while true { x = 1; }"],
  ["repeat with long block", "repeat 2 { print(1);\nprint(2);print(3); }"],
  ["all numeric literal forms", "print(8 * 89.123);"],
  ["complex expressions", "print(83 * ((((-((((13 / 21)))))))) + 1 - 0);"],
  ["all unary operators", "print (-3); print (!false);"],
  ["all binary operators", "print x && y || z * 1 / 2 ** 3 + 4 < 5;"],
  ["all arithmetic operators", "x = (!3) * 2 + 4 - (-7.3) * 8 ** 13 / 1;"],
  ["all relational operators", "x = 1<(2<=(3==(4!=(5 >= (6>7)))));"],
  ["all logical operators", "x = true && false || (!false);"],
  ["end of program inside comment", "print(0); // yay"],
  ["comments with no text are ok", "print(1);//\nprint(0);//"],
  ["non-Latin letters in identifiers", "コンパイラ = 100;"],
]

const syntaxErrors = [
  ["non-letter in an identifier", "actor P { ab😭c = 2; }", /Expected "="/],
  // ["malformed number", "x= 2.", /Line 1, col 6/],
  // ["missing semicolon", "x = 3 y = 1", /Line 1, col 7/],
  // ["a missing right operand", "print(5 -", /Line 1, col 10/],
  // ["a non-operator", "print(7 * ((2 _ 3)", /Line 1, col 15/],
  // ["an expression starting with a )", "x = );", /Line 1, col 5/],
  // ["a statement starting with expression", "x * 5;", /Line 1, col 3/],
  // ["an illegal statement on line 2", "print(5);\nx * 5;", /Line 2, col 3/],
  // ["a statement starting with a )", "print(5);\n) * 5", /Line 2, col 1/],
  // ["an expression starting with a *", "x = * 71;", /Line 1, col 5/],
]

describe("The parser", () => {
  for (const [scenario, source] of syntaxChecks) {
    it(`properly specifies ${scenario}`, () => {
      assert(parse(`actor P {\n${source}\n}`).succeeded())
    })
  }
  for (const [scenario, source, errorMessagePattern] of syntaxErrors) {
    it(`does not permit ${scenario}`, () => {
      assert.throws(() => parse(source), errorMessagePattern)
    })
  }
})
