## What is a flaky test?

Live coding: demo pass, fail, flake

Slide: `Math.random()` with 🥸 disguise emoji

## Why are flaky tests bad?

Slide: A failing test on CI

Live coding: skipping a test

## A flaky test is holding CI to ransom


## Test your tests (Red, Green, Refactor)

Live coding: demo naive list sort
(Note: Need to revisit the tests)

Slide: Be a difficult customer

Live coding: demo actual list sort

Slide: red, green, refactor
Slide: slacklining across a river
Slide: slackliner tests their harness

## Strategy: make it fail, then make it green

Live code
Slide: 50% success rate vs 99% success rate - which is better?
Slide: 1% success rate vs 99% success rate - which would you rather debug?

Slide: Always fails

## Categories of flaky test: timing issues, leaky state, or both

Slide: timing issues, leaky state, both

## Example: timing issues

Slide: Section header

Live coding: here's a template with a code block

Slide: Highlight.js

Live coding: basic modifier, usage, test

Live coding: dynamic load

Slide: slow-motion video

Live coding: broken tests

Slide: marble run splitter video

Slide: marble run diagram (LHS to win)

Slide: aligned list
Slide: askew list

Slide: marble run diagram (RHS to win)

Live code: test + static modifier side by side
Slide: timeline for static modifier (pass)

Live code: test + dynamic modifier side by side
Slide: timeline for dynamic modifier (fail)

Live code: add a delay (500, 10, 50) to the test
Live code: add a delay to the modifier

Slide: marble run switch video
Slide: ember-test-waiters

Live code: wrap asynchrony in `waitForPromise()`

Live code: use LONG delay on modifier timeout
Live code: remove delay from timeout

## How does waitForPromise work - "Settled state"

Live code: explain `await visit()`

Slide: What happens when you `visit("/three")`?

Slide: static modifier timeline with 'settledness' (passing)

Slide: Global settled state: false
Slide: Global settled state: true

Slide: dynamic modifier (no waiter) timeline with 'settledness' (failing)
Slide: dynamic modifier (with waiter) timeline with 'settledness' (passing)

## Example: Leaky state
## Outro
