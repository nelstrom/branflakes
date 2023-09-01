# Notes

What's missing?

1. Story about a flaky test on CI interfereing with deployment of a feature/bugfix
2. Practical advice: skip the flaky test for now, create a ticket to come back and fix it later.
3. Discuss how ember-test-waiters works (with reference to a marble run)
4. Categories of flaky test: leaking state, unmanaged asynchrony, or a combination of both
5. Ticking time bomb (image of bob-omb)
6. Obviously, don't use global variables. But global state is necessary sometimes (e.g. using local storage, session storage, an Ember service)
7. 



https://twitter.com/KentBeck/status/250733358307500032?lang=en
> for each desired change, make the change easy (warning: this may be hard), then make the easy change

To paraphrase:

> for each flaky test, make the test fail (warning: this may be hard), then make the test pass

## Outline of draft 01

1. What is a flaky test?
2. Strategy: make it fail, then make it green
3. Red, Green, Refactor
4. Example: timing issues
5. The fix: introduce a test-waiter
6. Randomizing your test suite with Qunit
6. Example: leaking state
7. The fix: constrain 'global state' to the lifetime of the test


## Proposed outline for next draft

1. What is a flaky test?
1. How flaky tests on CI can mess with your team's workflow
1. Strategy: skip the flaky test for now, create a ticket to come back and fix it later
1. Red, Green, Refactor
1. Strategy: make it fail, then make it green
1. Categories of flaky test: timing issues, leaky state, or both
1. Example: timing issues
1. The fix: introduce a test-waiter
  1. Visualise two tracks of a marble run as a 'race condition'
  2. Instead of relying on chance (natural order, refer back to the naive sorting test), we need to introduce a 'switch' that makes one track wait until the other has completed
  3. Show the fix
1. General advice for dealing with timing issues (maybe a missing 'await' keyword?)
1. Example: leaking state
1. The fix: constrain 'global state' to the lifetime of the test
  1. Show the fix
  2. Obviously 
1. Summary: remove non-determinism: make it fail (this may be hard)! Then make it pass.
