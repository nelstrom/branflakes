## What is a flaky test?



## How flaky tests on CI can mess with your team's workflow


## Strategy: skip the flaky test for now, create a ticket to come back and fix it later

> If a test is randomly failing, it is causing more chaos than, than it can earn by testing the thing.

> Flaky tests create chaos, not confidence

## Red, Green, Refactor

TODO: make the example as terse as possible. Check if it's still comprehensible.

> We want to be antagonistic.

> When we're writing tests, we want to be a difficult customer.


> Your tests are a safety net.

> They're there to catch you when you break stuff.

> You want to test your safety net.

Find an image of a tightrope walker with their safety net in frame?

https://flic.kr/p/pxsK89
https://flic.kr/p/pxsRDA


## Strategy: make it fail, then make it green

> A failing test is something you can fix

> The rarer the failures are, the harder the problem is to diagnose

> "Hope is not a strategy"



## Categories of flaky test: timing issues, leaky state, or both

Note: this section should come earlier. Ideally, after the 'skip failing tests on CI then fix later' section, and before "Red, Green, Refactor".

## Example: timing issues

Introduce the concept with an example:

```js
const now = new Date()
assert.equal(now, new Date())
```

Note: skip the whole 'flakeTime()' section. Instead, show using 'timeout()' to make the test pass (almost) every time (today!), then using timeout() to make the test fail every time.

Introduce the 'marble run' analogy sooner.

Use a diagram to visualize the steps in each 'timeline'. Visualize adding a delay to each timeline, then demonstrate it.

> If you think you found a solution for that flaky test, even seeing it, seeing the test pass doesn't give you confidence because it might just be that you're getting lucky.

Note: I don't feel any need to change the example here. I think it illustrates the point perfectly well. I just need to get to the point faster, and introduce the 'mental model' of the marble run sooner.

## Example: leaking state

Code example: could be improved? Setting global state is ok-ish for this demonstration. Setting the global state in a model hook feels a bit old-time Ember. Especially since the Router is slated for improvement. What if I change the example so that the global variable is changed when a component is mounted instead?

Expand on the concept of 'bad actors'. 

Describe a test suite as a community of individuals. We want to trust those individual tests to act responsibly, but occasionally we get 'bad actors'.

Use diagrams to explain the difference between `window` and `this.window`. The pattern we're using here is called 'dependency injection'.

When introducing ember-browser-services:

1. First: replace all occurrences of `window` with `this.window` (implementation AND tests)
2. Then: add `setupBrowserFakes(hooks, { window: true })`, which is where we actually switch out the real Window for a mock Window

