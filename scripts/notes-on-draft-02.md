## What is a flaky test?



## How flaky tests on CI can mess with your team's workflow


## Strategy: skip the flaky test for now, create a ticket to come back and fix it later

A flaky test is holding CI to ransom.

'Ransom' and 'Random' differ by only one letter. d/s

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

Note: Ember's 'settled' state is a kind of global state. If you squint at the solution, it's almost as though the timing problem was a kind of leaking state...

https://javascript.info/modules-dynamic-imports

> Although `import()` looks like a function call, it’s a special syntax that just happens to use parentheses (similar to `super()`).

> So we can’t copy `import` to a variable or use `call`/`apply` with it. It’s not a function.

Marble run splitter example:
https://youtu.be/7wnP6lzkzl0?si=U_YDLkxafduP0Hix&t=37

Marble run gate example:
https://youtu.be/OL_E7q3NU0I?si=BtUCckFdtdOnDTyP&t=15

Marble run kit parts:
https://isaacstreasures.com/cdn/shop/products/image_6cc00152-74cf-42b7-9b3b-b477100c63b3_1024x1024@2x.jpg?v=1644589323


## Example: leaking state

Code example: could be improved? Setting global state is ok-ish for this demonstration. Setting the global state in a model hook feels a bit old-time Ember. Especially since the Router is slated for improvement. What if I change the example so that the global variable is changed when a component is mounted instead?

Expand on the concept of 'bad actors'. 

Describe a test suite as a community of individuals. We want to trust those individual tests to act responsibly, but occasionally we get 'bad actors'.

Use diagrams to explain the difference between `window` and `this.window`. The pattern we're using here is called 'dependency injection'.

When introducing ember-browser-services:

1. First: replace all occurrences of `window` with `this.window` (implementation AND tests)
2. Then: add `setupBrowserFakes(hooks, { window: true })`, which is where we actually switch out the real Window for a mock Window

Note: The issue with global state outliving the test is kind of a timing issue. Is it fair to say that issues with leaky state are ALSO issues with timing? Maybe there's only one category of flaky test after all!

Permutations:

| # | First | Second | Third | Result |
| 1 | One | Two | Three | Fail |
| 2 | One | Three | Two | Pass |
| 3 | Two | One | Three | Pass |
| 4 | Two | Three | One | Fail |
| 5 | Three | One | Two | Pass |
| 6 | Three | Two | One | Pass |


Permutations:

| # | First | Second | Third | Result |
| 1 | One | Two | Three | Fail |
| 2 | One | Three | Two | Fail |
| 3 | Two | One | Three | Fail |
| 4 | Two | Three | One | Fail |
| 5 | Three | One | Two | Pass |
| 6 | Three | Two | One | Pass |

I changed the example so that test three checks that the global variable is `undefined`. This has a few implications:

1. that test now fails when run after one or two (it fails more often)
2. that test passes when run in isolation
3. one possible fix: in route three model hook, set the global variable to `undefined` - that makes the test pass, but it doesn't solve the underlying issue (it treats the symtom, not the cause)
4. before introducing ember-browser-services, demonstrate fixing the root cause using `beforeEach`

Idea: start this section by looking at the test runner, instead of by looking at the code.

If you `git blame` you can find out who wrote the test. But don't blame that name. The flaky test is the canary in the coalmine. It tells you that there is a problem, but that flaky test itself is not necessarily the cause of the problem.

## Outro

Randomness is a fickle friend. It can be the cause of flakiness. But also: running your tests in a randomized order can help you to expose issues with leaky state.
