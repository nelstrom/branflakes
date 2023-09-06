## What is a flaky test?

Here we have a basic test suite with three tests.

This test should always pass. This test should always fail. And this test, is pretty much a toss of the coin: It should pass half the time, it should fail half the time. This is a flaky test.

Let's see what this looks like in the test runner. As expected, the passing test passes, the failing test fails and the flaky test does both!

(Run suite again and again to demonstrate)

My advice is: don't use `Math.random` in your assertions, because it creates flaky tests.

There you go. That's my talk. Any questions? No?

Ok, there's more to it than that. The point I want to make here is that randomness can produce unpredictable results. That's bad, obviously! But randomness can come in disguise, and it's not always going to be as easy to spot as this.   

## Why are flaky tests bad?

Picture the scene: you've got a feature to ship. You've got a deadline. You're working hard. It's going to be a close thing, but you're going to get it done in time if all goes to plan...

You've got good test coverage for what you're working on. You push your changes. You watch CI, ready to merge when green.  

...boom!

There's a test failing on CI and it's blocking you from shipping your feature. Upon closer inspection, you realise that the test that's failing seems to be completely unrelated to the feature you've been working on.

What's going on?

Bad luck! Your test suite contains a flaky test. It's been sleeping until now, unnoticed, but it's chosen this moment -- the worst possible timing -- to wake up and cause havoc.

## A flaky test is holding CI to ransom

What do you do in this scenario?

Fixing a flaky test can be hard. You don't want to be side-tracked into working on this right now. You've got a feature to ship!

Here's what to do: find the flaky test and skip it for now. Create a ticket in Jira. Come back and fix it at a later date. Then get back to your critical path and get that feature shipped.

But here's the important part: you do need to make time to come back later and investigate why the test was failing. Approach it with a cool head. Treat it as a puzzle. A three-pipe problem.

We write tests so as to give ourselves a safety harness. A good test suite should give you confidence. It should give you the freedom to move fast, knowing that if you've broken something, the test suite will let you know. 

(Later, in 'Red, Green, Refactor', we'll stress that you should test your safety harness)

If you've got a test that's flaking out on you, it's creating chaos, not confidence. That test is not entitled to be run on CI. It's got to earn your trust. It's got to earn it's place in the test suite.

## Test your tests (Red, Green, Refactor)

Before we dive deep into the things that can cause tests to be flaky, I want to start by looking at testing best practices.

Suppose we need to create a function that takes a list of objects, and returns them sorted by a field that we can specify as an argument. The function signature might look like this:

```js
sortByField(list, field)
```

We might test this function by starting with a list of objects like this, each with a `'name'` field and a `'position'` field.

We could have a test case that asks for the list sorted by `'name'`, then checks that the result is indeed sorted by name.

We could have another test case that asks for the list sorted by `'position'`, then checks that the result is ordered by position.

Let's run those tests... we're all green. Great! Let's move on to the next ticket...

Actually, before we do that, let's just have a look at the implementation. Here we're importing this `sortByField` function from a package is called `naive-sort`. I wonder how naive it is?

```js
export function listSort(original) {
  return original;
}
```

Oh! What does this function do? It receives something as input, then it returns it completely unchanged. I think there's some work to do on this implementation!

Now, where is the problem here? Is there a problem with the implementation? Or is there a problem with the tests?

It's both! But if I had to blame one or the other, I'd say the tests are most at fault. They should have caught this issue sooner.

Let's take a closer look at our original list from the tests. Each object has two fields, so we can either sort by `'name'` or by `'position'`.

If you sort it alphabetically, you get the same order.

If you sort it by position, you get the same order.

There's actually another way of sorting this list, but it's kind-of implicit and you have to look a bit harder to see it. I'm talking about the 'natural order' that it was constructed in. And here, all three modes of ordering are aligned.

For our implementation code, we're making life much too easy! When we're writing tests, we want to be a difficult customer.

(Show an image of a restaurant order where the customer has made a thousand small requests. Waiter says "Worst. Customers.Ever")

We want to be antagonistic.

So let's change our original list so that every possible mode of ordering is out of alignment. Everything is askew. That's better!

Now the tests fail. We've exposed the shortcomings of our implementation. And that's our cue to go and do it properly this time.

Here's an implementation that actually works. It's just a thin layer of functionality on top of existing JS primitives. Nothing of particular interest here.

And now the tests pass.

In test-driven design (TDD), we're encouraged to follow a cycle:

1. red
2. green
3. refactor

1. Start by writing a test. Watch that test fail.

2. Then write the smallest amount of code necessary to make the test pass. Watch the test pass.

3. Then, optionally, refactor your implementation, preserving the same behaviour. Keep the test passing.

Return to step one, either writing another test, or modifying an existing test so as to refine the requirements.

It's important to stress that red comes first. You want to see your tests fail before you make them pass. If you've never seen your test in its red state, then how can you trust when it's green that it is truly green?

Your tests are a safety harness. They're there to catch you when you break stuff. You want to test your safety harness.

I don't want to be a total purist here. You're not always going to write the test first. You're not always going to see red before green. But you can correct this oversight by intentionally breaking your implementation. If the test goes red, yo u can trust it. You've tested your tests.

## Strategy: make it fail, then make it green

A test should pass or fail. Not both!

A passing test is what we want, eventually.

To get a passing test, first, we must start with a failing test. Remember: red, green, refactor. Red comes first! There's nothing wrong with a failing test. A failing test is instructive. It's part of the process.

A flaky test is bad. We don't want flaky tests.

If you've recognized that one of your tests is flaky, there's a temptation to hope that it's going to pass . It used to pass. Why can't it just pass again now. For me. Please?

🥺

We can expect this flaky test to have a 50% success rate.

Here's a test with a 99% success rate.

Which is better?

An almost 100% success rate is so close... and yet so far away. It's still a flaky test. It's going to blow up on CI at the worst possible moment.

Here's a test with a 1% success rate.

Which one would you prefer to debug? The test that fails 1% of the time, or the one that fails 99% of the time?

The rarer the failure, the harder it is to find the root cause.

Instead of hoping for your flaky test to pass, here's my advice: be methodical, and try to find a way to make your flaky test fail every time. Now you're back in the realm of determinism.

1. Flaky (non-deterministic)
2. Red (deterministic)
3. Green (deterministic)

1. Having identified that a test is flaky
2. Start by trying to make it fail every time
3. Then make it pass every time
