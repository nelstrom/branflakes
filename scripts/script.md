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

## Categories of flaky test: timing issues, leaky state, or both

The reasons for a test being flaky can fall into two categories: timing issues, or leaky state.

There's a third category: all of the above!


We're going to look at one example of a test that is flaky because of a timing issue. And one example of a test that's flaky because of leaky state.

In each case, we'll use the same methodology: we'll find a way to turn the flaky test into a failing test, then we'll find a way to make the test pass.

## Example: timing issues

### Simple modifier with static imports

In this template, we've got a code block. Here's how it looks when rendered in the Browser.

The first thing I'm thinking when I look at this is: can we have syntax highlighting please?

There's loads of open source libraries out there that we could use. I've chosen highlight.js.

To integrate it, I've created a modifier. The modifier recieves an element as an argument, then applies syntax highlighting to the element.

We can use the modifier by calling it in the 'element-space' of the element where we want to apply syntax highlighting. And here's how it looks in the Browser now. It works!

Let's take a look at the markup: you can see that some classes have been added to the original element, and the content within has been enhanced with span elements and their corresponding styles.

And if we wanted to test that functionality, it might look something like this:

1. we're gonna visit that route
2. then we'll look up the element by `id` and assert that it has the class applied by highlight.js

Let's run the test... and it passes.

Is it flaky? We can't know for sure, but... let's hope not!

### Simple modifier with dynamic imports

The way that we've implemented this modifier has one notable downside: we've inflated our bundle by adding the highlight.js library. Our users have to pay that tax, even if they never visit a page that uses this functionality.

Here's an alternative implementation of the modifier, which uses a dynamic import.

I want to show you the before and after, so you can see the difference. There's two things I want to draw your attention to:

1. the `JS` documents loaded in the Network panel
2. the highlighted text itself

First, we'll use the original modifier with the static imports. If I load the app's homepage, it loads a bunch of scripts. When I navigate to the route that uses the syntax highlighting functionality, we see highlighted text. No extra scripts are loaded.

Next, we'll switch to the modifier with the dynamic imports. Again, I'll load the app's homepage, and it loads a bunch of scripts. Watch when I navigate to the route with the syntax highlighting. We get a couple of new scripts appearing in the network tab. So we're loading the library on demand, only paying the cost when we actually need it.

There's another thing to note here. I'll do a slow-motion replay... notice that there's a flash of unhighlighted text? It takes a moment to fetch the highlight.js library and to initialize it. It's barely noticable unless I slow down time.

From a performance point of view, this is an improvement

But... we've broken our tests!

### Marble runs

To understand what's going on here, I find it helpful to visualize a marble run.

(show a picture of a marble run)

In this example, we have a splitter at the top. Drop in your first marble, the splitter will send it to the left. Drop in a second marble, the splitter will send it to the right. Then left again, right again, and so on. From there onwards, each marble is on its own track. It's own timeline. Each marble is independent. It's going to roll with gravity until it reaches the end of its track.

Suppose that the two marble paths differ slightly in length. Lets say the left track is shorter, and the right track is a bit longer. If we set two marbles in motion at the same time, the splitter sends one to the left, and the other to the right. Intuitively, you expect the one on the left to finish first. It's got the shorter track.

And your intuition is right! The first time, at least. 

But the beauty of marble runs is that there's always a little bit of randomness. Repeat the experiment 10 times, and maybe you'll find that one of those runs defies your expectations.

Can you see where I'm going with this?

Remember when we were talking about red, green, refactor, I showed you an example of a test where our original list was already sorted? The natural order, the order in which our list was declared, gave us a passing test, even before we had implemented the functionality.

I'd like to draw an analogy here: the 'natural order' is for the marble on the shortest track to finish first.

With the list sorting example, we then switched things up so that the order in which our list was declared wasn't sorted to begin with. That made our test fail, and forced us to do the actual work of implementing the functionality.

In our marble run, we can adjust the length of the tracks so as to influence the probabilities of which marble finishes first.


### Visualising

Ok, enough playing with marbles! Let's get back to the code.

If we place our test code and our modifier side by side, and squint a bit... you can almost imagine that we have a marble run with two seperate tracks. Let's call them two independant 'timelines'.

First, let's consider our original modifier with the static imports:

1. the 'Test timeline' kicks things off by visiting the route
2. that kicks off the 'App timeline', which loads the route, and renders the template, causing the modifier code to run
3. in the 'Test timeline', after waiting a bit, we make an assertion about the state of the DOM. It passes.

Now let's consider our new modifier with the dynamic imports:

1. again, the 'Test timeline' kicks things off by visiting the route
2. that kicks off the 'App timeline', which loads the route, and renders the template, causing the modifier code to run. We have some asynchrony in this timeline, which means it takes a bit longer than before.
3. in the 'Test timeline', after waiting a bit, we make an assertion about the state of the DOM. It fails.

One way of looking at this is to say: if we could just make the 'Test timeline' wait a bit longer, we'd have a passing test. Let's try that!

We'll add a delay of 500 milliseconds. Run the test... and it passes!

I wonder if we could use a smaller delay? Let's try 10 milliseconds... That fails!

50 milliseconds? It passes!

I don't recommend doing this. For a start: it makes your tests run slower, and we don't want that. But also: 50 milliseconds may work today, but it might not work tomorrow. All we've done is alter the probability of this test passing. It's still a flaky test. Ship this to CI, and you have a ticking time bomb... 

We can't leave this to chance.

Let's adapt our strategy here. Putting a delay in the test increases the chances of our test passing. Instead, let's put a delay in the modifier, so as to increase our chances of the test failing. For practical purposes, this test now fails every time.

> So suppose that we, we introduce some kind of switch that says, OK, both marbles are going to do their own thing, but one of the marbles is gonna reach a gate, it's gonna stop and that gate is going to open when the other marble reaches its completion.
