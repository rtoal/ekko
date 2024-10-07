# ekko

Ekko is experimental language with simple time travel.

```
process P do
  x := 3;
  y := 2 * x;
  loop t times do
    y := y + 1;
    print y;
  end
  back 3;
  z := y ** 2;
  print z;
  commit;
  back 1;
  print y;
end
```

## Principles

Ekko programs are built from a collection of one or more **actors**, which can message each other and manipulate a global state.

An actor has a name and a history. Actors can move backwards and forwards throughout their own histories, until they **commit** their actions, at which time their actions are written to the global state and their history is erased.

An actor can only move throughout time in its own history. That is, even if an actor goes backwards, it will not see the global state as it was at the earlier point in time.

(Explain this better with a diagram.)

## Formal Definition

The syntax can be found in the Ohm file in this repository.

The semantics is published in this document.

## Future Work
