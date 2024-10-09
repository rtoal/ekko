# ekko

Ekko is an experimental language with simple time travel.

```
actor P [x, y, z] {
  x := 3;            // (x←3)
  y := 2 * x;        // (x←3)(y←6)
  loop 3 times {
    y := y + 1;
    print y;
  }                  // (x←3)(y←6)(y←7)(↑7)(y←8)(↑8)(y←9)(↑9)
  back 3;            // (x←3)(y←6)(y←7)(↑7)(y←8)
  if true {
    z := y ** 2;
  }                  // (x←3)(y←6)(y←7)(↑7)(y←8)(z←64)
  send z to Q;       // history not effected
  print z;           // (x←3)(y←6)(y←7)(↑7)(y←8)(z←64)(↑64)
  commit;            // history is cleared now
  y := 100;          // (y←100)
  back 1;            // history effectively cleared
  print y;           // (↑nil)
}                    // all work since last commit lost

actor Q [a] {
  print 5;                // (↑5)
  receive a else abort;   // if received, history is (↑5)(a←64)
  commit;                 // clears history
}
```

## Principles

Ekko programs are built from a collection of one or more **actors**, which can message each other and write to a global stream (via `print` statements).

An actor has a name and a history. Actors can move backwards and forwards throughout their own histories, until they **commit** their actions, at which time their actions are written to the global stream and their history is erased.

An actor can only move throughout time in its own (currently linear) history. That is, even if an actor goes back in time, changes to the global stream will _not_ be undone even when viewed from an actor in its own past. In other words, the global state has a fixed, unidirectional time. Messages that have been sent to other actors may not be retracted by the sender; however, a actor may go back in time past the point at which it received a message, essentially undoing the receipt.

## Formal Definition

The syntax can be found in src/ekko.ohm.

The semantics can be found in docs/ekko.tex.

## Future Work

Currently actors have a single timeline, and moving backwards undoes uncommitted effects. We would like to keep those around, supporting parallel timelines that actors can move between.
