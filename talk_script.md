Hello Railsconf! I’m so glad to connect with my rails brothers and sisters from all over the world. Thank you all for tuning in.

Last year we came together at what would be the start of this pandemic and the connections I made with folks helped sustain me since. I'm hopeful that next year we'll get to see each other in person. Until then I hope you all are healthy and safe.

A big thank you to the Railsconf program committee and planning team. I can only imagine how challenging it is to put a conference like this together, but it is so important to all of us who use Rails. This conference has been a much needed treat for me so thank you all for your dedication to this incredible community.

My name is Jesse Spevack. I use he/him pronouns. I am a Staff Engineer at Ibotta, a cash back for shopping app that wants to make every purchase rewarding. I’ve been at Ibotta for the past four years and it is the best job I’ve ever had. I've learned a ton during my time at Ibotta and they've always encouraged my growth. We have a great team, which is the best part of Ibotta. Everyone is not only sharp, but also and more importantly everyone is kind and giving. We are growing so please reach out if you are interested in learning more. I'd love to work with more folks from this community.

Before working at Ibotta I had a totally different career. I spent over ten years in K12 public education and made my way to coding by way of the Turing School of Software and Design. I’m a huge believer in that program and their mission to open up high fulfillment technical careers to a diverse group of people. There are a number of ways you can help support Turing. First, you can consider hiring one of the school's recent graduates who will undoubtedly bring immediate value to your team. Ibotta has hired over a dozen Turing grads and we are a far stronger company for it. You can also get involved by sharing your wisdom with current students as a mentor or by hosting job shadowing days. Finally, you can donate to Turing, which unlike many other code schools is entirely not for profit. Needless to say I'm so proud my developer origin story started at Turing.

I’m very excited to make my second speaking appearance at Railsconf. Last year I talked about some of the big mistakes I made and what I learned from them. This year I’m going to talk to you about Stimulus.

Before we begin, let’s get one thing out of the way. Stimulus is a toy javascript framework. It is not meant to build commercially viable web applications. So don’t even try. Of course I’m kidding. Basecamp’s Hey email app is what got me first interested in Stimulus and the promise of light weight client side code has me more or less hooked.

With that disclaimer out of the way, lets start with what is stimulus? Stimulus is a JavaScript framework that can help bring simple order to client side code in your Rails application. It is not in the React, Vue, or Angular category. I find it much Rails-y er in it's focus on server-side code, convention, and conceptual compression. Some of the syntax is new, but some of it is definitely Rails inspired.

We are going to use Stimulus to add a nice, professional, modern sheen to a simple dropdown menu. The example is contrived in the sense that I'm not showing you production code, I'm not concerning myself with testing, which I'm slightly ashamed about, and in the end our dropdown is not really going to solve any problems.

Our goal here is to use the drop down select html and javascript as a teaching tool. I hope that this will show you how easy it is to use Stimulus to add modern interaction to our html in Rails. I hope that you walk away with an exposure to the core concepts of Stimulus: the controller, lifecycle callbacks, actions, targets, values, and css classes. I also want to refactor our initial code together using some more advanced javascript to better encapsulate the responsibilities of our code.

Okay enough of me talking about Stimulus. I want to write some code with you to show you Stimulus. We are going to start with a brand new rails application that I've added Tailwind CSS to. Tailwind is a utility first css library that as someone with basically no design or css chops I really like.

The first thing we are going to do is generate a new demo controller. We'll use the generator to define a dropdown method. I know not restful, but hang with me here.

I like to set up my terminal with three panes, one for my commands, one to run rails server, and one to run the webpack dev server. You are going to really want the webpack dev server running because it allows us to see our changes on local host immediately as opposed to needing to compile after each change.

We can view our newly generated dropdown page and see the template html we get from Rails.

Let's open our dropdown view in the demo directory and remove the template code. We'll replace it with some html I put together ahead of time using Tailwind UI, which is a premium html component library by the folks who made tailwind css. I told you before design is definitely not my area of expertise nor is it the subject of this talk. If anything, I hope this shows how accessible stimulus makes modern looking and feeling web apps to folks who spend most of their time behind asynchronous boundaries in backend systems.

Also I have this code up on github, which I invite you all to check out.

Now let's open the demo controller we just generated in the app controllers directory.

We are going to be building a dropdown menu where a user can choose a Railsconf keynote speaker. We'll add some data to our dropdown method in our controller. Typically in a real application this might be accomplished via database query or some other service request. Spelling here is always a challenge for me. Also I look forward to the feedback I undoubtedly get about my vim skills. Listen, maybe I like mashing lots of keys all the time. Did you ever consider that?

And we can view our page with our speaker by opening our browser to local host 3000 slash demo slash dropdown. This route was auto generated for us in our generate controller step.

We now have our static html page that is generated on the server side of our app. We'd like to use Stimulus to make this html actually do stuff.

Let's copy the boilerplate stimulus controller code we get in hello_controller.js. This automatically generated when I ran rails new and set my webpack option to stimulus. We'll call our new controller dropdown_controller. I like naming my controllers after components because it helps push me towards making re-useable controllers. So this isn't, for example, the select a keynote speaker controller.

A controller in stimulus is the basic organizational unit of the framework. Controllers are instances of javascript classes that we define and that get attached to chunks for our html. What I like about this is that we are getting some mandatory organizational structure for the javascript in our Rails application. To me this is a big step up from writing jquery in a bunch of random places, which I've definitely done. It's also not quite the lift needed to use React or Vue in our Rails app - which in a lot of cases is just overkill.

The controller is meant to govern the behavior of a chunk of html and so we need wire our controller to our html. This is important because where we tie our controller into our html will define our controller's scope. If we put our controller in our application layout, the controller would have every view we create in it's scope because every html element is nested within our application layout. In this case the drop down button and list of select items are the html we care about.

We will take the `div` that wraps these html tags and add a data attribute called `data controller`. We will set the value of this attribute to be "dropdown" the name of our new controller. And this is the first pattern that we'll see repeated again and again. We define a data attribute in html, assign it a value, and we get some functionality as a result.

Let's add a `console.log` in the `dropdown_controller.js` to show that our controller is properly connected to our html. In lieu of Test driven development I'll be self-consciously modeling console driven development. The important piece here is to be systematic and test all assumptions.

We can add our console log statement to one of the Stimulus lifecycle methods, `connect`, which is called anytime the controller is connected to the DOM.

Open the developer console in our web browser and we can see our message!

At this point our controller does not yet let users pick items. We can add a modern feel to this by styling the dropdown. We'll want the item that a user is mousing over to be highlighted. We'll also want the text of our button to change when the user selects an item. Finally, clicking the button or clicking on a speaker from our list should open or close the list of selectable items.

To achieve this, we have some Tailwind css classes that define styles we would like to apply to the various html elements on our page. We'll be liberally using javascript to add and remove classes throughout this code.

Stimulus lets us refer to CSS classes by logical naming. The goal here is to make our Stimulus controllers more re-useable by making the styling we apply dynamic and something that can be passed in to the controller as a set of parameters.

We do this by adding new data attributes to the html div with our data controller attribute. These attributes will be the data prefix followed by the name of the controller the styles should apply to. This is another pattern in Stimulus. We'll be defining more and more data attributes that are prefixed with data and our controller name as we continue.

After naming the controller we come up with a logical name for our class. I'm not doing a great job of this here. Highlighted vs unhighlighted might be a better choice, but sometimes I also like to not leap towards abstraction too quickly.

We end our data attribute with the word class and then assign a value that corresponds with the actual css class we'd like to be able to access in our controller by name.

Now we'll add these values to our static classes array. So again, abstraction might be really nice here. Instead of textPink, we might say highlighted text and then the color we choose could change on a controller by controller basis. I'm not doing that here though. So do as a I say not as I do, I guess!?

Now we are ready to use a Stimulus action to define some behavior we'd like to see on our page.

An action is a connection between a controller method, an element on the page, and a DOM event listener. We'd like to change the style of the list items as the user's cursor hovers over them.

In this case the action will specify that the mouse enter dom event should be routed to the drop down controller and invoke the highlight list item function. I like this syntax a lot because it feels familiar to me from writing routes in Rails.

We have to define our highlight list item function. We'll add some console logging because this demo is nothing if not a demonstration of console driven development.

Every action in Stimulus sends the triggering event to the function specified in our data attribute. So we'll send the mouse enter event to our highlight list item function.

This event object includes a `target` object, which is the target or html element that dispatched the event. In this case the target is our list item that just had the cursor enter its boundaries.

Let's console log the inner text of the first child element of our list item. This should print out the name of the speaker mouse'ed over in our console.

And since we see this message as we cursor over our list of speakers, lets now write javascript to apply our desired style.

We want the background of the speaker to turn pink. Let's use this dot background pink class, which we get from our static classes array, which points back to the background pink data attribute in our html. And we'll add this class to the list item element, which is the target that dispatched the mouseenter event.

Now as our mouse enters a list item, the list item passes that mouse enter event to our stimulus controller and specifically the highlight list item function. This function, which we just defined, adds a css class to the list item just mouse'd over. The class is defined via data attribute in our html. 

Friends, we are writing stimulus. This is great.

Since this looks like it is working to me, let's do the same thing again for the font color and style. When we highlight we'll want the font to go from gray to white and from normal weight to semibold.

The text of the speaker's name is actually in a span nested within the list item, so to add some css classes to this span, we can call first element child on our list item.

As we move our mouse over our list, each item will get a pink background and the inner span text will turn white and bold. And if you aren't thrilled by this, then you are probably a lot better at javascript than I am.

At this point you are probably thinking, wow, Jesse you aren't that good at javascript. You've just made a perfectly good list of keynote speakers pink. Ok, well to that I'd say Rome was not built in a day. What if we turn our attention to un highlighting our list items when the mouse leaves their boundaries?

We can go back to our data action attribute in our list item and add a second action definition. We'll add that a mouseleave DOM event should be routed to our dropdown controller and invoke our un highlight list item function.

Our unhighlight list item function is going to be the inverse of our highlight list item function. Instead of adding these classes, we'll remove them.

And giving this a spin on our local host it seems like our list items are highlighting and unhighlighting appropriately and I am feeling more and more like a complete wizard. Let's see if I retain that confidence for the remainder of this talk.

Now let's handle the actual selection of a speaker in our our list. Ideally when the user clicks on a list item to select a speaker the list should vanish and the button text should change from select a speaker to the name of the speaker just selected.

We'll define another action using the data action attribute on our list item. The dom event that triggers this action will be a click event and we'll want the user's click on the list item to invoke the select item function in our dropdown controller.

We'll add some console logging in our new select item function to make sure things are wired up correctly. Our console shows that we are logging the name of the speaker we are clicking on.

Now let's work on taking the name we are logging and putting it in the select button.

To do this we'll introduce another piece of Stimulus: the target. A target allows us to reference important html elements in our controller. Just like an action, we'll create a target by adding a data target attribute to the html element we'd like to name. We'll use the attribute name data dropdown target to tell stimulus that this target should be accessible in our drop down controller. We'll use the value speaker to say that when we call the speaker target in our controller we, really mean this particular span in our html.

Now we will add the speaker target to our static targets array. This will allow us to reference this span by invoking this dot speaker target.

In our select item function, we can call the speaker target within the scope of the controller. We'll call text content and set that equal to the inner text of the target that dispatched the click event. Here the event is the click event, the target is the list item containing the name of the speaker just clicked. And the inner text is the speaker's name.

When we click on a list item, the text of the button will update to the list item that was clicked.

Now that we have a selection, we need to hide the dropdown list. To do so we'll add another target in our html to help us more easily reference elements from our html in our controller. Let's add a data dropdown target attribute with the value list to our unordered list. This will let us call call this dot list target in our drop down controller and get this entire unordered list.

We have to remember to add list to our static targets array in our controller.

Now in our select item function we can hide our list target by adding this dot hidden class to it.

Now when we select a speaker, the drop down disappears. But what if the user wants to change their selection? With our current implementation we can get rid of the list, but we can't get it back.

We can fix this by adding a click action to our button so that clicking the button will either show or hide the list of options. Stimulus gives certain elements, like buttons, their own default event short hands.

Because we are dealing with an html button, stimulus assumes we are going to want a click event. Therefore we do not have to specify click in our data action attribute. Someone in stimulus headquarters is really looking out for us.

Instead our data action attribute needs the controller name and the function to call. The click DOM event is assumed.

Now we'll add a toggle list function that can toggle the hidden class on our list target. So each time the button is clicked we'll either add or remove the hidden class from our drop down list, which will make it look like it has expanded or collapsed.

I notice that the functionality of our toggle list function is repeated in our select item function. So we can refactor and DRY up our code.

We can also add a call to this dot toggle list to our connect function so that when the controller class is first instantiated upon our page getting loaded, the dropdown will be hidden. We want the user to have to click to open the dropdown.

Now our list mostly works. But maybe you are wondering what to do about these check marks next to the text in our list items. Ideally, when the user opens up the list options drop down by clicking the button, and a speaker is already selected we'd see a check mark next to the speakers name because we are fancy like that.

We'll repeat the pattern we've been using. We'll add a data target attribute and then we'll toggle our hidden class on the check svg icon.

First, our data target attribute will go on the span that wraps our svg check icon. The target name will be check. Because honesty is a good policy when naming data targets in stimulus.

Now we need a way to hide all the check marks because when the page first loads, the user will not have had the chance to select a speaker. To do so we are going to do something a little different, but it builds off our past experience with the target concept.

In the past, we used a singular data target, like this.selectTarget to get the text inside the button. Our page has many check targets, one per keynote speaker. With stimulus all we have to do is pluralize targets and we'll get an array of our targets. So instead of this dot check target we'll do this dot check targetS plural. We'll iterate over the list of check targets.

We are trying to hide these checks, so lets console log the spans containing the checks to make sure we are grabbing what we actually want.

That looks right to me so for each check target we will add the this dot hidden class.

Now we can call hide checks in our connect function so when the page first loads all the check marks become invisible to the user.

Our goal here is to show check marks when a user selects a speaker. So we need to go into our select item function which is called when a user clicks on a list item.

We have to loop over all of check targets. For each check target, we need to inspect the check target's sibling, which is the span containing the speaker's name. 

If the check target's sibling text equals the text of the selected item, then we know we should show the check. Because this is the selected item.

If the check target's sibling text does not equal the text of the selected item, then we know we should hide the check because this is one of the other speaker options.

And to clarify we know the text of the elected item because we get it off of the click DOM event.

And because we love our work we will also have to turn our check marks white when we mouse over them. Because we are nothing if not crafts people. 

Let's go into our highlight list item function. Here we'll add a check that says if the check is not hidden, meaning if this is the selected speaker, then replace our pink check with a white check. That way it will show up nicely in our pink highlight when the user mouses over the list item.

And we will do the exact opposite in our unhighlight function. If the check is not hidden, then we want to make it pink instead of white.

So lets take stock of where we are at. We accomplished our goal of adding some nice looking styles to our dropdown. We introduced a few of the main concepts in stimulus: the controller, the action, the target, life cycle events and the css class.

We could imagine our select item method including a post request that sends the selected speaker to a database, but we are not going to do that in this talk.

Instead lets look at our code. Does it bring us joy? It's kind of confusing if I'm being honest. At least it has been kind of confusing to try to explain it out loud to you all, and to me that's a code smell. 

Specifically we loop over our checks in a few places which I don't love. And there are probably ways we could dry out our code a bit.

But I think all of this points to a larger refactor that I'd like to do with you all. I think our drop down controller knows too much, has too many different responsibilities and is just not well encapsulated.

I'd like to propose that we break our drop down controller in two. We'll keep the logic for opening and closing our list and setting the selected speaker in the dropdown controller.

We'll add a new controller that we'll call list item controller that will handle anything that is specific to a list item in our drop down menu. So this would include highlighting and understanding whether or not the list item is a selected list item.

Lets copy our hello controller to get our Stimulus controller boilerplate.

Now lets find our list item element. The `div` that wraps our list item is going to be where I declare my list item controller. We'll use the data controller attribute and set it equal to list item. And that will tell stimulus that everything within this div tag should be within the scope of our list item controller. That includes the list item, the text of the list item, and the span holding the check svg icon.

Lets add a console log to our connect function to make sure we've connected our controller correctly.

Now lets add some targets to make it easy to reference the important pieces of our list item in our list item controller. First we will add a data list item target attribute to the list item. We'll set that equal to to item. We'll add a data list item target attribute equal to check on our span holding our svg check icon. And we'll also add a data list item target to our span that contains our speaker name and we'll set that equal to text.

We'll add each of these targets to our static targets array.

Now we will move the classes that we defined on the dropdown controller to our list item controller. The dropdown controller will still need the hidden class because it will be concerned with toggling our entire drop down list.

We can now add these classes to the static classes array.

Currently our list items have three defined data actions. There is a click action that will call the select item function and then mouse enter and mouse leave actions that will call the highlight and unhighlight functions. All of these functions are defined in the drop down controller.

We no longer want our list items to report to the drop down controller. Instead we'd like our click event to trigger a select function in our list item controller. We'd like the mouse enter and leave events to trigger highlight and unhighilight functions in our list item controller.

Now lets add some console logging to make sure all of this is working.

Next step is to move our highlighting functionality over from the dropdown controller to our new list item controller. And I'm really excited for the difference I think you are going to see. 

Because we defined the elements we care about as targets, we can reference them more directly instead of needing to get at them by way of first or last element child.

First we'll add a pink background to our list item. Next we'll add the white bold font to our span text, that contains the speaker name. Finally we will apply the same white color to our check.

And this reads a lot nicer to me. Do this to the item, and this to the text. And this to the check.

We'll do the opposite for our unhighlight.

For select we are going to reach for the last piece of Stimulus that we have yet to cover, the value.

Our goal here is for each list item to govern itself rather than rely on the drop down controller to orchestrate all of them. This will be nice because iterating over lists is annoying. Dealing with one thing is simpler.

We want each list item to have a state, either selected or not selected. We are going to use the stimulus value to store this state. To do so we'll follow the pattern of adding data attributes to our html. In this case we are going to add the attribute to the div where we defined our list item controller.

We'll add a data list item is selected value attribute and set it equal to false. So the list item controller now has a value or state called is selected. It is initially set to false.

Stimulus supports all sorts of value data types. We just need to specify the data type of our new is selected value in our static values object in our list item controller. We'll specify that this is selected value is a boolean because the list item can either be is Selected true or is Selected false. It can be selected or not.

Now our select function becomes a lot simpler to write. Instead of messing with the list item text, we will update our is selected value. When a list item is clicked on, set the is selected value to be true.

These values in stimulus also come with some additional powers. We can use call back functions that get triggered whenever any of our values get changed. In this case we get a free is selected value changed function call whenever we change the is selected value.

Lets add some console logging there to see how that works.

When a list item is clicked on it should change from is selected false to is selected true.

When the list item is in an is selected true state, because it has been clicked on, we'll want to show the check mark. We just need to remove the hidden class from our check target. Since we are only dealing with one list item, there is only one check target to worry about. We don't have to worry ourselves with a for loop anymore.

Also, importantly the is changed callbacks are called when the controller is first instantiated. I guess that is saying that the value of is selected has been initially set. This works in our favor because the call back function we just wrote will automatically hide the checks on every list item not selected. This is way better than what we were doing on our drop down controller where we had to write a special hide all the checks function.

So pretty quickly we got our list item styles working on a list item by list item basis. But now we need to somehow create a line of communication between our sibling list item controllers.

When our page loads, we get one list item controller per list item on the page. It would be really nice if one list item controller could announce to all of its siblings that it has been selected. As far as I know there isn't a not clicked event, but we can make our own custom events.

I really like this pattern because it creates a barrier between caller and callee. We are going to try to get one list item, upon being clicked, to shout "Hey, I've been selected!" and the rest of the list items need to hear that event and make sure that they set their own is selected value to be false.

To define a custom event we'll create a detail object with a value key. We'll assign the inner text of the text target on our list item to be the value. In other words, the detail of our event is the name of the speaker that was just clicked.

Then we'll make our custom event and we'll call that event a list item selected event. We'll call window dispatch event and pass in the event we just created to get published.

In our html we now want all of our other list items to listen for this list item selected event.

To do so, we'll add a new data action. We'll say that when we register a list item selected event we should call the deselect method in the list item controller.

And then we can define this deselect function with a console log to make sure we haven't gotten too lost.

We will log the value of the selected item that has just dispatched the event along with the value of the item that received the event. So we want to log both the list item that called out, hey I was selected, as well as the sibling list item that now needs to understand that it is not selected.

Also we have to remove the event from the parameters in the select event because we go on to define an event const a few lines down. That would be a whoopsie.

So those items appear to be logging correctly.

When these two values are the same it means that the list item that announced, I'm selected, is also the list item that received the event. We are in a classic echo situation. So in this case we can just drop the event. But, when the selected speaker on the event is different than the speaker name on the text item we know we have to update our is selected state to be false because one of the sibling list items just told it was selected.

Whenever we update a value we trigger the change call back. So here setting is selected to be false will call the is selected changed function. This will also then go on to uncheck the list item, which is exactly what we want!

At this point our list items are more or less autonomous. They are much more encapsulated than in our initial implementation and we no longer have to loop over any lists. This is an improvement.

Now all that is left to do is clean up our drop down controller. We still need the drop down controller to hide and show our list, but we can delete the select item, set check, hide check, highlight and unhighlight functions.

Before when we clicked on the list item we toggled the hidden class on our list. Now we'd prefer to use the list item selected event. Lets add a data action to our button that listens for that custom list item selected event. When that event occurs we'd like to trigger the set selected function in the drop down controller.

That set selected function now has to take the name of the speaker from the list item selected event and put it in our speaker target. This will change the text of our button from select speaker to whichever speaker is selected.

In our connect function we want to make sure we are hiding the list when the page loads.

And now we have a refactored rails conf speaker drop down.

This was a quite a journey and I appreciate you all for sticking with me.

We covered quite a bit of ground. We looked at how to create a stimulus controller. We used actions to call functions in our controllers when specified dom events are fired. We used targets to find important elements in our html. We used values to store state. And we used css classes to apply styles. We also used our own custom events to communicate between our stimulus controllers which enabled us to better encapsulate our code.

I hope you are walking away with an increased interest in Stimulus, maybe a few new tools in your Stimulus repertoire, and maybe not total disgust with my vs code proficiency.

I'll be answering questions in the stimulating events discord channel. I'm happy to talk about Stimulus, Ibotta and Turing. 

I'm sending love to all my rails conf brothers and sisters and I hope all of us will get to see each other in person at next year's rails conf.

Thank you again for joining me and enjoy the rest of this amazing conference.

