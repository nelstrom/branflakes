# Living with flaky tests

## What is a flaky test?

Well, here we have a very basic test suite with three tests.

This test should always pass.

This test should always fail and this test, it's pretty much a toss of the coin.

It should pass half the time, it should fail half the time.

So this is a flaky test.

Let's have a look at what that looks like when, when we run these.

So as expected, the passing test passes, the failing test fails and the flaky test this time it's failed.

Let's run it again this time, it's failed, it's passed.

Let's do a few more of those past, failed, failed, past failed.

It's a time cost to cost.

It's a coin toss.

So math dot random is always going to return a nu- a value between zero and one.

So half the times that's gonna be a passing assertion, half the times it's going to be a failing assertion.

So, don't use math dot random in your assertions and you won't have to worry about flaky tests.

There you go.

That's my talk.

Any questions?

No, OK.

There's, there's more to it than this.

Of course, randomness can be a source of, of flakiness.

but randomness can come in disguise, it's not always going to be as easy to spot as this.

So I want to show you some of the ways that randomness can be hiding in your code base.

Give you some techniques for isolating that randomness because it could be anywhere.

It's not necessarily going to be in your test suite, it could be in your application code.

## Strategy: make it fail, then make it pass

Now, I said in my abstract for this presentation, I said that tests should either pass or fail, not both.

And I stand by that.

A passing test is what we eventually want.

A failing test is instructive but a flaky test is bad.

We do not want to have flaky tests.

What I'd like to propose as a as a general working plan is to say if you find yourself in this state where there is some sort of randomness, there is some probability there is a temptation to, to hope to pray that your test is going to pass.

But if you've recognized that one of your tests is flaky.

No amount of praying, it's gonna get it to be green every time, what you should do instead is to force that test to fail every time a failing test is something you can fix.

So the goal really given, given this this expression here, Math dot Random is going to return something between zero and one.

So if we make this a bigger number like six, this is going to pass more often than it feels this is going to pass most of the time.

This is gonna pass all of the time.

What I'm saying is even if it's that, even if it's passing almost all of the time, it's still a flaky test.

And the, the, the rarer the failures are the harder the problem is to diagnose.

So don't wish, don't try and wish your way towards almost always passing instead, be methodical and make it always fail.

Because now you're back in the realm of determinism, you're back in the realm of predictability.

So this is my, my recommendation, my TLDR if you have a flaky test, try to make it fail every time and then you can work on fixing it.

So tests that pass are good.

Tests that fail are also good.

What we want to avoid is this middle ground.

I, when I drew this diagram, it made me think of, there's a scene in Indiana Jones and the Temple of Doom where they're all on this rope bridge across a canyon.

And Indiana Jones cuts the bridge and in the middle and it falls and some of the people fall one way, some of the people fall the other way.

A flaky test somehow feels like that to me is you're not on stable ground any time, any time that rope is cut, you might find yourself falling over to the to the pass side or you might find yourself falling over to the fail side, but neither one is good.

You still have a flaky test.

## Red, Green, Refactor

Now, before we start looking for sources of flakiness sources of randomness, I want to start by looking at testing best practices.

Now here suppose that we want to write a function that accepts a list and source that list.

Now we might test this by starting with a list which contains a bunch of objects.

Each of these has a name field and a position field.

So you can imagine you might you might be required to write a test or sorry, you might be required to write a function that would accept this as input and you could say sort it by name and give me the result or sort it by position and give me the result.

So here we've got our module, we've got one test case saying sort by name, we're going to call our function.

This is imported here, we'll have a look at the implementation in a moment we're passing in the original, we're passing in the field that we want to sort by.

And then in an assertion where we're, we're capturing the, the result of the function.

And just to slightly shorten this instead of comparing objects with names and positions.

We're, we're mapping this to as a sequence of tuples if you like.

So we still get to see the, the position and the name and we can check their order.

So in this test, we're sorting by name and we're checking that they are sorted by name in this test.

Very similar, but we're going to sort my position.

And again, we'll assert that they are sort of 1234, and, and leave a message if it, if it works.

So let's just have a look at what that test looks like can run that it's passing.

It's all green list is sorted alphabetically by name fields.

List is sorted numerically by position field.

Great.

Looks like we've got a green test suite.

Let's move on to the next the next ticket.

Actually, before we do that, let's just have a look at the implementation.

So I'm importing this list sort from a package is called util naive sort.

I wonder how naive it is.

Oh, there it is.

So what does this function do?

It receives something and then it returns it completely unchanged.

So I think there's some work to do on this implementation.

Now, where is the problem here?

Is there a problem with the implementation or is there a problem with the tests?

Well, it's books really, isn't it?

If we look here our original state, now we've written two tests.

One of the tests is sorting by name.

One of the tests is sorting by position and the objects that we're concerned with have only those two fields.

So there's really only two ways that this array could be sorted.

But there is actually a third way and this is slightly implicit, you have to look harder to, to see this.

And that is actually just the, the natural order that the array was created in.

And what we have here as, as an example is something where all three possible ways of sorting it are aligned.

So I've created this original thing.

If you sort it alphabetically, you're not going to change the array.

If you sort it by position, you're not going to change the array.

The, the order that they're declared in, in the first place before applying any sorting is already sorted according to all of these, all of these ways that we could sort it.

So what we have is entirely aligned and we, what we want to have instead is something where it's a skew.

Here, if we sort alphabetically name needs to be first, but here it's third.

If we sort by position, this one needs to be first, this one needs to be last, but it's appearing second.

So the three possible ways that we could sort this, the way that we declare it in the first place is unsorted.

It's not sorted by name, it's not sorted by position.

We want to be antagonistic.

When we're writing tests, we want to be a difficult customer we don't want to provide our the functions that we're testing.

We don't want to give them inputs that match our expectations for free.

Essentially what we have, what we have here.

[Go away.]

What we have here is a test that passes by fluke, not by, not by hard work, not by honest toil.

So let's let's have a look.

Now I have my hard boiled list sort.

So here we're going to use this original thing which is not aligned.

And we've got essentially the same the same things here.

Now, I'm just gonna make this import the original function.

Let's see, sort of hard boiled.

What we expect is for this to fail and we want to see our tests fail.

That's the point I want to make here, both of these tests are failing, right?

And we know why?

Because the, the original does actually need to be transformed.

So that when we sort by name, now we've got apple bear, orange pear that is that is, it's been transformed to produce the a at alphabetical sorting.

And here when we sort by position of, of course, it's ordered 1234 and the, the alphabetically it's now not ordered.

Now, if I change this to the list sort, here, here's our original naive list sort.

Here's an actual implementation which receives something as input, it copies it, it calls the sort function.

It has a comparison function.

very, very basic, I mean, it's really building on top of javascript primitives here, but it is adding that that functionality that lets you pass in an array and the field you want to sort it by.

If we change this, so that instead of using the naive sort, it uses the actual implementation.

Now we go from a failing test suite to a passing test suite in test driven design.

There's a principle that we're encouraged to follow, which is to say that first.

Well, let, let's do it.

In three words, it's red green reactor and it's very important to stress that red comes first.

You want to see your tests fail before you make them pass.

If you've never seen your test in its red state, then how can you trust when it's green that it is truly green?

This naive list sort which was doing no work at all.

by writing time by writing tests that we never saw in the red state, we could have missed, missed that.

There was functionality missing.

In fact, in this case, all of the functionality was missing.

~But there are nuances that, you know, this is a sledgehammer example.~

~I'm trying to make a point here.~

~There are, there are ways that you could be adding small, you know, smaller features to that list sort of function.~

~And that if you go and write the implementation or write the test, you don't see that test fail first, then how can you trust when it's green?~

So red, green reactor, that final step, we don't need to spend long on that.

But once you've got your functionality, once it's green and you know that you can trust your tests to turn red when you break stuff, then you have the freedom you can, when making your test is green, you can do the simplest thing that gets the test to pass.

And now that you know, the test will be read when it should be read and it will be green when it should be green.

You have the freedom to refactor your code that is to change the, the implementation without changing the behavior.

That's what refactoring is.

~So we don't need to spend long on that.~

~That's not the point of today.~

But I wanted to start with these testing, best practices.

You want to see your tests fail so that, you know, you can trust your tests.

Your tests are a safety net.

They're there to catch you when you break stuff.

You want to test your safety net.

## Example: unmanaged asynchrony (timing issues)

In this template, we've got a code block.

And let me show you in, in the browser.

This is what it looks like.

The first thing I'm thinking when I look at this is, wouldn't it be nice to have a bit of syntax highlighting and there's lots of good libraries out there that, that can do this.

I've chosen Highlight.Js and I've chosen to create a modifier for this.

Now it's an app modifiers.

It's in a file called `highlighter-eager`.

You, you'll see why in a moment we're going to go through several variations of this modifier.

So this is the really basic version, it imports the, the library that it needs.

And then when the, when the modifier is called, it calls highlight element passing in the element that the modifier was called on.

So if we go over here and we say this, this is the pre tag and we want to do this inside of element space and we'll say highlighter eager.

Now if we have a look, there we go, we've got the syntax highlighting and let's just inspect this.

So we've gone from a pre which I had declared the ID and a class of javascript.

That's a hint to tell her which which, which language to use.

So the class has been retained and the ID has been retained, but it's added to this highlight Js tag and then language dash javascript.

And as you can see what was just bare text inside is a bunch of spans being added there to, to have the, the coloring.

So it works.

And if we wanted to write a test for that, it could look something like this we're gonna visit that route.

And here I'm just saying, I'm just looking up that element by ID and asserting that it has the hljs class.

Remember that's not a class that I've added myself.

It's a class that's added when the modifier kicks in.

So there we have hljs and let's see that test running here it is.

So that passes great.

This isn't a Flicky test.

Let's make it into a flaky test for, for the purposes of demonstration.

Now, this isn't entirely contrived.

I hope what I want to suggest.

Now, here we have we have a static import.

And at the moment, the way this project is set up, it means that highlight Js is always going to be included in the bundle, but actually, it's only needed at the moment, it's only needed on, on one of these one of the three routes that I've declared.

So we could use embroider route splitting and so on.

But there's another feature we could use, which is just a, a dynamic import.

So if we open highlighter lazy, what we're doing here is instead of declaring the import statically at the top of the file, we're using the import feature of, of javascript to dynamically load.

And by using this version of the modifier, we're going to we're only going to include highlight Js in the bundle when it's needed.

So hence the, the naming, this is the lazy version.

This is the Eager version, the eager lazy designation there that's referring to when the dependency is loaded.

In Eager is loaded up front.

Everyone always gets it.

Whether they use it or not in lazy, it's loaded only when needed.

So let's change this from eager to lazy.

That's all we have to do.

We're just switching from one modifier to another and let's see what this looks like.

Now, I don't know if you can tell, I don't know if the screen refresh rate is good enough here, but there's a moment there where I see like a flash of Uns styled text as it were.

It's not changing font or anything, but it is momentarily it's black and then the color pops in and that wasn't the case before I'll just switch back to eager and here.

Yeah, I don't know if you could see it before, but there is no flash of Uns style content.

So let's switch back to lazy.

So the benefit here, let me just show you the benefit.

Actually, if we go to the network tab, if I start on this route here, Notice these are the Java script scripts that are loaded and as I navigate around, nothing changes.

But when I click on three, the the route that uses loader, it loads two more chunks.

These are lazily loaded by by wet pack or whatever.

I'm not sure how that works actually.

And just to, to sort of prove that something has changed here.

If I go back to eager here and let's start again on route one.

So these are the scripts that are loaded, go to script two, go to page three.

Nothing is loaded here.

So, so there is actually it's, it's not that easy to, to detect, but there is a change.

If we, we use the, the lazy version, then we, we load those scripts on demand and that way we can keep our bundle size smaller.

So there's a valid reason why you might want to make this change.

I hope I'm selling this to you.

But let's see what happens to our test.

Our test is broken. Yeah.

So we've made an improvement in terms of performance, but we've broken our tests.

So what are we going to do about this?

Well, what we have here is a timing issue previously, we could depend on our, our dependencies being loaded synchronously, but now they're loaded asynchronously.

And it looks as though our test.

If we go to our test here, I'm gonna make a, a bold claim here that this assertion is running before highlight has had a chance to do its thing.

Now, I could test this hunch if I was to say a wait time out.

That's not, that's not helpful.

I actually have, I have a function by this name, time out and let's just say I spell it, let's say we just wait 500 milliseconds.

Now we've made our test pass but we made it slow.

So that's not great.

So my, my hunch was that this assertion was failing because when we, when we visit the page, it takes a moment for highlight Js to initialize and to change to change the dom and just by waiting a little bit, we can give highlight Js time to do its thing.

This is not a good solution because I've arbitrarily chosen a number that's high enough: 500.

I could maybe get away with a smaller number.

Let's try 10 and see.

That fails.

Let's try 50.

50 worked.

50 worked today. But it might not work tomorrow!

Whatever number you choose, there's always a risk that it works today, but not tomorrow.

That is a source of randomness.

A source of flakiness.

It's something that might hurt you later.

Now let me show you this `timeout` function.

So this is returning a promise.

It uses the native set time out future.

you pass in a delay and it resolves when that period has elapsed.

I've also got this method here which calls time out, but it does a little bit of adds a little bit of randomness to decide how much of a delay you want it to have.

So let me switch this instead of using time out, let's switch to `flakeTime`.

And here, I'm gonna give it a label of `'test'`, `'probability': 0.5`.

So this means that half of the time when this runs, it's not going to add a delay at all.

And the other half of the time it's going to add a 30 second, sorry 300 millisecond delay.

So we're introducing a bit of randomness intentionally here.

Now, I also have a version of the highlighter modifier which also uses flake time.

And again, this has got this 0.5% probability.

So if we run this test now, oh dear.

So I'm gonna run this a few times and I'm also going to bring up the console test delayed.

Oh yes.

There's one more change I need to make here, which is we're gonna use `lazy-`...What was it called... `-variable-delay`.

So we're using this modifier which as well as doing the asynchronous import, it just adds in a random delay of possibly 300 milliseconds or possibly nothing.

Now, let's see what our test does.

So here, the import was not delayed and the test was delayed and we have a passing test.

Let's run it again this time, the import was delayed by 300 milliseconds and the test was not delayed and we have a failing test.

So by adding this randomness, we're now simulating what it would be like for this test to be flaky again, we're seeing that, ok, there is actually a chance the way I've built this, there is a chance that both of them don't have a delay or both of them do have a delay.

but yeah, in general, the, the intention here is to intentionally make this into a flaky test.

So there it's failing, failing, passing, failing, passing, failing, failing, failing, failing, failing, I could do this all day.

This is so fun.

This is slightly contrived.

I admit I'm intentionally making a feeling a Flaky test.

Now, let's take our variable delay and we're going to give this a probability of 1 which is to say, always, always flake out and this one, we're gonna give a probability of zero.

So this is never gonna wait.

And what I'm hoping, let's bring this up again.

So import was delayed by 300 test was not delayed.

We have a fail test, failing test, failing test, failing test.

It fails every time now, ok?

And this puts us on a footing where we can actually diagnose this problem and fix it.

If we're in a position where every time you run the test, it might pass, it might fail.

If you think you found a solution for that flaky test, even seeing it, seeing the test pass doesn't give you confidence because it might just be that you're getting lucky.

But now we know that this test is failing every time and if we can make a change, not a change to these arbitrary delays, but a change to our actual implementation code.

If we can introduce that change and see this pass every time, then we know we've eliminated the the source of randomness, the source of flakiness in our, in our application and in our tests.

## The fix: introduce a test-waiter

I think it's time to actually look for the solution now.

So here is our highlighter lazy variable delay.

Let me just close these other ones which we don't need anymore.

Let's look at the actual highlighter.

And what we're using here is something from Ember test waiters called wait for promise.

And if I just compare these side by side here, we're just, the load function is asynchronous.

So of weighting that and here we've wrapped this call to a function inside of wait for promise and this signals to Ember's test suite that something asynchronous is happening.

So let's go back to three and we're gonna change from highlighter lazy variable delay.

We're just going to switch to highlight and now this is the proper the the implementation that I want to use.

It still has this source of flakiness and let's see what happens.

So notice sometimes it's, it's not being delayed, sometimes it is being delayed, but it passes anyway.

Let's switch this again because it was in a different file that I did this switch this to 100% probability it's always going to be delayed.

Doesn't matter, it still passes.

And in fact, let's just, let's just make this a really long delay.

We're gonna make it wait for three seconds.

So we're waiting, we're waiting, we're waiting, but it passes.

Yeah, I feel confident now that I can remove this source of randomness, I feel confident that this is a fix.

I can take away that sort of randomness and, feel confident that this is no longer a flaky test.

## Randomizing your test suite with Qunit

I've got a, a test module here with tests named Do re mi so fa la ti ~do, oh Sorry, there's, there's only one do~.

Now I just want to demonstrate because this is, this is a sort of known order from from in music.

The order that these tests run matches the order that they've been declared in the in the module, the test module.

So if I refresh this, you can't even see that anything's happening really just it's rerunning the tests in the same order every single time.

Now Qunit has a feature a configuration option called `seed`.

And this lets you run the tests in a seeded random order.

Let me just demonstrate, I can actually interact with this via query params here.

So if I just add a query param and call it seed with, with nothing else there, look at that Ti came first. it's completely randomized.

And if I refresh this, it runs in a different order again, each time I refresh the order that the test cases are run in changes.

Now simply the presence of the seed configuration option like seed true, randomizes things.

The other thing you can do though is you can set it to a value.

And here, I'm just going to choose.

"Drew was ere", Drew was where Drew was here.

It can be any arbitrary value, but this is, it's random in the sense, it's not the same order that they were declared in the file.

But now if I refresh this, it's the same every time, right?

As long as we're using the same seed, we get the same random order.

Now, actually, there's something you can do.

I, I don't know if you know, there's all these check boxes along here.

This one here you may not have seen before randomized when checked tests run in random order.

Let's try that.

There we go.

See, that's added the seed.

I can take it off, it's removed the, the query param, add it, remove it.

This is really easy to do.

I'm just going to show you how I did that test helper.

So here we're adding to the Qunit URL config the seat.

This is the, the feature that already exists in Qunit label is the label and then we've got a tool tip as well.

And it's as simple as that.

You can, you can make your test run in a random order just by checking that.

But there's something else I've done here, which is that you can actually check the seat and we can log it.

So here, look, each time I refresh this, the seed changes, it's a random value.

Now, if I wanted to reproduce one of these, I could copy that and I could stick it out.

Whoops, I messed that up, stick it there.

But the other thing is I've actually included a clickable link here.

So let's get rid of that again.

In fact, I'll just remove that, randomize it again.

Just refresh a couple of times.

Let's say this particular order is interesting to us.

Just click that link and now it's going to run in the order every time until I remove that seed query para.

So that's, that's useful if you want to randomize the order that your tests run in.

## Example: leaking state

We're going to have a look now at an example where leaking state between tests can cause a, a test to fail under some circumstances and pass under others.

And classically global variables are a thing you want to avoid.

And here I'm deliberately flouting that advice for the sake of making a demonstration.

So here I've got three routes, I've got route one which in its model hook.

When this, when this route loads, it sets my global variable to the string.

Hello.

And likewise in route number two, it it changes it to a different string.

In route number three, it doesn't actually interact with that with that global variable.

Now, here we're assigning this on the window object.

And in the browser, if I, if I visit, well, let's, let's just see if I, if I visit route one and check my, my global variable.

There it is.

It's set to the string.

Hello.

Now, if I go to route two, it now says hi.

In fact, instead of running this again and again, what I'm going to do here is I'm going to set up a live expression for my global variable.

So this is going to update any time the variable updates.

So there as I navigate to route one that changes to hello, navigate to route two, it changes to hi.

When I navigate to route three, it doesn't change, it stays whatever it was ok.

No, I suppose we were to write some tests against this.

We say visit route one and check that the global variable has the value.

Hello, visit route two, check that it has the value high and then suppose we visit route three and we check that the value is hello.

Now remember in route three, we don't actually change this variable.

So there's there's something wrong with this test or there's something wrong with the implementation.

But in any case, if we have a look at these, these tests here, I am running just the the global variable module.

So let's run that.

And ok, this is interesting.

So visit route one passes, visit route two passes, visit route three is failing.

And if I rerun this again, it passes, let's run it again.

Fails, passes, fails, passes.

Ok, so clearly this looks flaky.

Now there's, there's an interesting thing going on here.

The, the order that these tests are declared in is visit route one, visit route two, visit route three.

And the tests run in that order has this feature which is enabled by default to rerun previously failed tests out of order before all other tests.

It's a really useful feature.

I suppose you have 100 tests and let's say they're not flaky tests.

And the test case that you're working on is number 100.

And if you have to sit and wait for 99 passing tests before seeing the one that you're interested in, that's, you know, that slows down your feedback cycle.

This feature here says that if test number 100 fails, then the next time you run the test suite, it's going to be the first one that runs.

So you get a quicker feedback cycle.

However, in this case here, we've got some kind of flakiness that seems to depend on the order that these tests are running.

And so when, when three fails, the next time it gets run first and somehow that causes it to pass, run it again because three passed last time, it's now no longer reordered.

So, really what we want is for this test to be failing every time.

And so we can actually, although this is enabled by default, we can turn this off.

And the way we can do it is by opening the just help her.

And it's just AAA setting that you can set on Qunit dot config reorder, set it to false.

And now if we run this again, each time I run it, they always run 123 in that order.

And now we can see this test fails every time.

And when the test fails every time that is better than having a flaky test.

This is something we can we can diagnose.

and let's try randomizing it as well.

So here 321, it's three passes 132, it passes 312, it passes 312 again, 321.

Here we have one where it fails and we could keep doing this again and again and again, the pattern that emerges is that any time three runs immediately after 23 fails.

So what we have here is no non atomic tests.

And although three is kind of the, the smoking gun here, three looks like it's the test that's failing.

But really this is kind of the, the canary in the coal mine.

It's not, it's the first thing to expire.

but it doesn't necessarily mean that the problem is with this test, the fact that these two tests have this inter relatedness, it might be that fixing, this actually means making a change to test two or it might mean making a chest change to test three or it might be make the tests are fine, but something in the implementation needs to change.

It could be that you need to change both of these tests.

In any case, don't see the flaky test as necessarily being the thing that's at fault.

It's a bad actor and in this case, test two is also a bad actor.

## The fix: constrain 'global state' to the lifetime of the test

I hope that this is illustrated why global variables are bad and why you shouldn't use them.

But nevertheless, there is a, there is a way to fix this which would be to say, instead of interacting with the window object, which is a global, a global piece of state.

What we could do is we could say that within each test, we're going to provide a mock version of the window object and that mock version will only its lifetime will be constrained within the lifetime of the test.

There's an add on from CrowdStrike which makes this really easy.

And that is called Ember browser services.

I'll show you how, how we could use it here.

Now, there's two sides to this.

We need to make changes to our implementation and we need to make changes to our test.

Let's start by changing the implementation.

So we're gonna have to inject a service from Ember browser services and instead of directly accessing window in this context, which is going to give us the global window object, we're going to say this dot window.

Now the way the ember browser services works, Essentially this dot window is going to be an alias to window in in normal conditions.

But this gives us the flexibility that we can say in certain contexts.

For example, in the testing context instead of this dot window giving you the window, we're gonna make this dot window return a mock window and we can control the the lifetime of that window.

So here I need to make the same change in right two.

Yeah.

So any time that you're interacting with a window, you want to be actually interacting with this dot window.

And in route three, we don't actually interact with the window.

So we don't need to make any changes there.

And there's quite a few changes I need to make here.

So I've actually got a a test that's already set up here.

Now we need to call set up browser fakes window true.

That means we are mocking the window in this context.

And let me just change my test from global variable to mocked global variable.

And the other thing is that inside of each test, we're going to say that the window is the one provided by and Barroso Cyrus.

So when we say window dot my global variable, instead of using the real window, we're using the fake window that has been set up by this hook.

And let's run this.

And we're still randomizing the order here.

Remember previously, if three ran immediately after two, it would fail, keep going until we hit that case.

There it is 123 and it's passing.
