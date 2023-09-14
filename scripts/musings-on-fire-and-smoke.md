All right.

So in the case of this, this test suite with three tests where one of them is flaky.

Yeah, there's kind of 3 strategies that we've touched on in this talk.

The first is to say, skip it.

Remember I said at the very start of the talk, if you're on a tight deadline, you have a hot bug fix or a feature that needs shipped by a certain deadline.

You don't want to put that urgent work on hold to go looking for the problems that's causing a test to be flaky.

So in that case, you can skip the test.

But remember I said you have to come back and fix it later, we've also seen one possible solution where we fix the symptom, not the cause we made the test pass, but we still had this issue of leaky state.

And then finally, we have the what I think is the best solution where we say we constrain the global state, we make sure that it it doesn't outlive the test.

Now, going back to this idea of skipping a test, the problem with skipping a test is that the problem is still there, the root cause is still there.

And I think a flaky test in this case, it shows us that there is smoke, but it's not necessarily the thing that's on fire.

It tells us there is a fire somewhere.

And so rather than looking at the flaky test and running, `git blame`, finding the name of the person who wrote that test and being cross with them.

, instead you should thank them because there is an underlying problem and that test has exposed it.

If you take away the flaky test, you've concealed the smoke, but the fire is still there.

And at some point another test, possibly a new test or possibly something will change in, in an existing test and suddenly you'll be seeing smoke again because that fire was still burning all along.

When you skip a test, you are temporarily concealing the smoke, but you need to come back and put out that fire.

You need to address the root cause not just treat the symptoms, ok?
