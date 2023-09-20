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

Live code: Leaky state test

Slide: Qunit.config.reorder

Live code: open test-helper and set reorder=false

Slide: Qunit.config.seed

Live code: show test-helper stanza

Slide: sequence permutations

Live code: show leaky-state-test, then route one, two, three

Live code: change route three (fix the symptom)

Slide: test lifetimes and global state lifetime (failing test 3)
Slide: test lifetimes and global state lifetime - fix the symptom (passing test 3)
Slide: test lifetimes and global state lifetime - fix the cause (passing test 3)

Live code: undo the previous 'fix'. Use 'beforeEach()' to fix the cause.

Slide: Global state is not bad. (Global variables are)

Slide: ember-browser-services

Live code: (maybe show a diff? maybe pre-record this section?)

Slide: window service in Production is an alias to the browser's Window
Slide: window service in Test is a mock Window object

Live code: call `setupBrowserFakes()`

## Outro

Slide: diagram of original state (global variable outlives test timelines, test three fails)
Slide: skipping a test (global variable outlives test timelines, test three is skipped)
Slide: fixing a test (global variable outlives test timelines, test three passes)
Slide: fixing the root cause (mock window has same lifetime as tests, all tests pass)

Slide: git blame (angry men pointing the finger at each other)
Slide: fixing a problem

