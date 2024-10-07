# ekko

Ekko is experimental language with simple time travel.

```
process P do
  x := 3;
  y := 2 * x;
  loop 7 times do
    y := y + 1;
    print y;
  end
  back 3;
  if true then
    z := y ** 2;
  end
  send z to Q;
  print z;
  commit;
  y := 100;
  back 1;
  print y;
end
```

## Principles

Ekko programs are built from a collection of one or more **actors**, which can message each other and manipulate a global state.

An actor has a name and a history. Actors can move backwards and forwards throughout their own histories, until they **commit** their actions, at which time their actions are written to the global state and their history is erased.

An actor can only move throughout time in its own history. That is, even if an actor goes back in time, changes to the global state will be visible to the actor even in its own past. In other words, the global state has a fixed, unidirectional time. Messages that have been sent to other processes may not be retracted by the sender; however, a process may go back in time past the time it received a message, essentially undoing the receipt.

## Formal Definition

The syntax can be found in the src/ekko.ohm.

The semantics is written in docs/ekko.tex.
