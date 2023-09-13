To understand how wait for promise works.

I have to introduce a new concept.

Burgh has this notion of settled.

It is in a sense you can think of it as a kind of global derived state.

Now, any time something asynchronous is kicked into action.

If it interacts with Ember test waiters, they can say I'm doing something asynchronous.

So the the settled state for for my particular piece of asynchrony is currently false.

And then when that piece of a synchrony completes that particular piece of asynchrony, he sets its own piece of settled back to true.

And it might be that when you load the app, lots and lots of asynchronous actions all happen at once.

And some of these are managed by ember by the framework itself and everything that's managed by the framework fits in with Ember test waiters by default.

So you're not even aware that this is happening, but for every test waiter matched to each chunk of asynchronous code, there's a single flag that goes to false while something is happening and goes back to truth when it's completed.

And if you think of this big bag of test waiters.

At any one time, there might be several of them that are in a non settled state, but eventually one thing leads to another.

And eventually everything on the happy path, at least everything should end up in a state where it's settled and the global settled, this derived state indicates globally that nothing asynchronous is happening at the moment.

And in our tests, when we say a wait, visit three or a wait, click something or other, what we're waiting for there is settled.

We're waiting for this global concept of settled to to reach a settled state.

Now, javascript has really nice primitives for dealing with asynchrony.

We have promises and we have a sink a wheat which is effectively syntactic sugar on top of promises.

And essentially when you, when you declare something as an asynchronous function, you're telling javascript that this may take some time to complete.  

And the call site where the function is called can choose to either let the asynchronous stuff happen and just deal with it, it can't carry on or it can say wait until this is finished before you execute the next line of code.

So promises make it very easy to wait for stuff to happen at the coal site.

But the problem is here, we have essentially because we've kind of broken things into two timelines in the application timeline.

Generally, if you're kicking off an Ajax request or running an animation, something that takes time.

Your application code is initiating the asynchronous code.

And therefore you can easily add a weight to your code.

But in your test codes, you're generally doing things much more equivalent to what a user does.

You're visiting a page which triggers lots and lots of you can almost visualize like a promised tree.

But clicking the button isn't the call site.

And so what do you await?

What, what can you wait for?

Well, in Edinburgh, it's this concept of settled this global derived state.

And so when we wrap, wait for promise.

when we wrap the load inside of, wait for promise, we are hooking into this global deferred state.

And that means that a weight is now waiting on this thing to complete as well as all the other things to complete.
