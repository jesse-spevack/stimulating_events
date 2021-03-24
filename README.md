# Stimulating Events
This repository contains code and documentation for Jesse Spevack's Railsconf 2021 talk "Stimulating Events".

## Setup
This section includes step by step instructions on how to set up a new Rails app with Stimulus and Tailwind css. Tailwind css setup can be found in more detail [here](https://web-crunch.com/posts/how-to-install-tailwind-css-2-using-ruby-on-rails).

##### Create a new rails app
```bash
rails new stimulating_events --webpack=stimulus -T --database=
```
##### Change directories to your project's root 
```bash
cd stimulating events
```
##### Install tailwind css
```bash
yarn add tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```
##### Create a tailwind css config file
```bash
npx tailwindcss init
```
##### Make a stylesheets directory 
```bash
mkdir app/javascript/stylesheets
```
##### Make an application.scss
```bash
touch app/javascript/stylesheets/application.scss
```

##### Include the following in `application.scss` from the previous step
```javascript
/* app/javascript/stylesheets/application.scss */
@import "tailwindcss/base";
@import "tailwindcss/components";

/* Add any custom CSS here */
@import "tailwindcss/utilities";
```

##### Import the stylesheet
Open `app/javascript/packs/application.js` and add:
```javascript
import "stylesheets/application"
```

##### Add Tailwind CSS to the postcss.config.js file.
```javascript
/* ./postcss.config.js */
module.exports = {
  plugins: [
    require('tailwindcss')("./app/javascript/stylesheets/tailwind.config.js"),
    require('postcss-import'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    })
  ]
}
```

##### Add the stylesheet to `application.html.erb`
Use the `stylesheet_pack_tag`
```erb
<!DOCTYPE html>
<html>
  <head>
    <title>StimulatingEvents</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= stylesheet_pack_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```
##### Configure the purge feature of Tailwind CSS
This will remove unused css and improve performance.
```javascript
/* app/javascript/stylesheets/tailwind.config.js */
module.exports = {
  purge: [
    ".app/**/*.html.erb",
    ".app/helpers/**/*.rb",
    ".app/javascript/**/*.js",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```
Tailwind should be setup on your new rails application.

## Getting Started
We are starting with a brand new rails application that I've added [Tailwind css](https://tailwindcss.com/docs) to. We'd like to use [Stimulus](https://stimulus.hotwire.dev/reference/controllers) to add a really nice professional, modern sheen to a simple dropdown menu.

Our goal here is to first show how easy it is to use Stimulus to add modern looking interactions to our html in Rails. After we get our dropdown working, I'll point out a way to improve our initial design and go on to implement this refactor. Let's see if you can anticipate that improvement!

I like to set up my terminal with three panes, one for my commands, one to run rails server, and one to run the webpack dev server.

##### Generate a new controller
```bash
rails generate controller Demo dropdown
```

##### Add some data
We are going to be building a dropdown menu where a user can choose a keynote speaker. We'll add some data to our dropdown method in our controller. Typically in a real application this might be accomplished via database query or some other service request.
```ruby
# app/controllers/demo_controller.rb
class DemoController < ApplicationController
  def dropdown
    @keynote_speakers = [
      'David Heinemeier Hannson',
      'Eileen M. Uchitelle',
      'Aaron Patterson',
      'Bryan Cantrill'
    ]
  end
end
```
##### Adding a view
We want to view the data from our controller in a drop down view. I've put together some html with the help of [Tailwind UI](https://tailwindui.com/components), a premium html component library by the folks who made Tailwind css. We can add this to our `app/views/demo/dropdown.html.erb`. This code can be found with the repository accompanying this talk.
```erb
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
    <div class="px-4 py-5 sm:px-6">
      <h1 class="text-lg leading-6 font-bold text-gray-900">Stimulating Events</h1> 
      <h2 class="text-lg leading-6 font-medium text-gray-900">Railsconf 2021</h2> 
      <p class="mt-1 text-sm text-gray-500">
        Jesse Spevack
      </p>
    </div>
    <div class="px-4 py-5 sm:p-6 mb-48">
      <label id="listbox-label" class="block text-sm font-medium text-gray-700">
        Railsconf Keynote
      </label>
      <div class="mt-1 relative">
        <button type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm">
          <span class="block truncate">
            Select speaker
          </span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </span>
        </button>
        <div class="absolute mt-1 w-full rounded-md bg-white shadow-lg">
          <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <% @speakers.each do |speaker| %>
              <li role="option" class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                <span class="font-normal block truncate">
                  <%= speaker %>
                </span>
                <span class="text-pink-600 absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </li>
            <% end %>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Load the application

##### Start Rails Server
```bash
rails server
```
##### Start webpack dev server
This will enable hot reloads
```bash
bin/webpack-dev-server
```
##### Visit the app in your browser
```
localhost:3000/demo/dropdown
```
## Stimulus
We'll start by copying the `hello_controller.js` to get the Stimulus boilerplate for our dropdown.

A controller is the basic organizational unit of a Stimulus application. Controllers are instances of Javascript classes that we define. What I like about this is that we are getting some mandtory organizational structure for the javascript in our Rails application.
```bash
cp app/javascript/controllers/hello_controller.js app/javascript/controllers/dropdown_controller.js
```

Now it is time to link our html view to our new dropdown controller. We do this with an identifier, which is the name we use to reference a controller class in our html. Our dropdown has two parts. We are using a button tag as the selector. We are using an unordered list as the options the user can select. Let's find the `div` that wraps the button and the unordered list. We'll add a data controller attribute to this `div`, which will give the dropdown controller scope that includes the wrapper `div` as well as both our button and our unordered list.
```html
<div data-controller="dropdown">
  <button>...</button>
  <ul>...</ul>
</div>
```

Let's add a `console.log` in the `dropdown_controller.js` to show that our controller is properly connected to our html. We can use one of the Stimulus lifecylce methods, `connect`, which is called anytime the controller is connected to the DOM.
```javascript
connect() {
  console.log("Hello, Stimulus!")
}
```

Open developer tools and click on teh console in your web browser. When you first load the dropdown page, you should see the `Hello, Stimulus!` message.

At this point our controller does not do much and our dropdown is in a frozen state. It does not yet let users pick items. We can add a modern feel to this by styling the dropdown. We'll want the item that a user is mousing over to be highlighted. We'll also want the text of our button to change when the user selects and item. Finally, clicking the button should open or close the list of selectable items.

To achieve this, we have some Tailwind css classes that define styles we'd like to apply to elements on our page using the class attribute. Stimulus lets us refer to CSS classes by logical naming using a combination of data attributes and controller properties. We type `data-<the controller name in kebab case>-class="<the css class to apply>"`.

This makes a Stimulus controller re-useable as teh styles we apply can be dynamically passed in to our controller on a page by page basis. In this case we want ot add some white, pink, and bold styles. But we can imagine using different styles on another dropdown in the same application.
```html
<div
  data-controller="dropdown"
  data-dropdown-text-white-class="text-white"
  data-dropdown-text-pink-class="text-pink-600"
  data-dropdown-background-pink-class="bg-pink-600"
  data-dropdown-semibold-class="font-semibold"
  data-dropdown-hidden-class="hidden"
  class="mt-1 relative"
>
```

And we also need to add each of these classes to our controller's `static classes` array:
```javascript
// app/javascript/controllers/dropdown_controller.js
static classes = [
  "textWhite",
  "textPink",
  "backgroundPink",
  "semibold",
  "hidden"
]
```

Now we are ready to use a Stimulus action to define some behavior we'd like to see on our page. An action is a connection between a controller method, an element on the page, and a DOM event listener. We'd like change the style of the list items as the user's cursor hovers over them. So in this case the controller method will be `highlightListItem` and then we can define the action by adding the DOM event listener, `mouseenter` followed by an `->` symbol pointing to the controller, which in this case is `dropdown` and then a `#` followed by the name of the function to call. 

So adding
```html
<li data-action="mouseenter->dropdown#highlightListItem">...</li>
```
Tells the Stimulus controller that when the user's mouse enters this list item element, we want to send the event to the `highlightListItem` function in the dropdown controller.

We have to define our `highlightListItem` function, so we can add some console logging to make sure we've got it right. Every action sends the triggering event to the function in our specified Stimulus controller. This event object includes a `target`, which is the target that dispatched the event. In this case the list item. So let's console log the inner text of the first child element of the list item. This should print out the name of the speaker mouse'ed over in the console. 
```javascript
// app/javascript/controllers/dropdown_controller.js
highlightListItem(event) {
  console.log("Mouse enter: ", event.target.innerText)
}
```
Since we see this message as we cursor over our list of speakers, lets now use javascript to apply our desired style. We want the list item's background to turn pink, the font color to turn white, and the text to turn bold. We can add:
```javascript
// app/javascript/controllers/dropdown_controller.js
highlightListItem(event) {
  const listItem = event.target
  const span = listItem.firstElementChild

  listItem.classList.add(this.backgroundPinkClass)
  span.classList.add(this.textWhiteClass, this.semiboldClass)
}
```

Now as we move our mosue over our list, each item will turn pink. Almost there. But we also want to unhighlight the list item when our mouse leaves that particular list item. To do so, we need to define another action on our list item.
```html
<li data-action="mouseleave->dropdown#unhighlightListItem mouseenter->dropdown#highlightListItem">
  ...
</li>
```

Here the DOM event is `mouseleave` so when the mouse leaves the list item, the `unhighlightListItem` function in the `dropdown` controller will get called.

Let's implement that function.
```javascript
// app/javascript/controllers/dropdown_controller.js
unhighlightListItem(event) {
  const listItem = event.target
  const span = listItem.firstElementChild

  listItem.classList.remove(this.backgroundPinkClass)
  span.classList.remove(this.textWhiteClass, this.semiboldClass)
}
```

At this point our list items are highlighted and unhighlighted as our mouse enters or leaves them.

Now we need to handle the actual selection of a list item. We'll add another action. This time the DOM event we care about is a `click` event. We'll want the `click` event on a list item to trigger a new function `selectItem` that we will define in our `dropdown` controller.
```html
<li data-action="click->dropdown#selectItem mouseleave->dropdown#unhighlightListItem mouseenter->dropdown#highlightListItem">
  ...
</li>
```

And now we can add a console log within our new `selectItem` to make sure things are wired up correctly.
```javascript
selectItem(event) {
  console.log("Selecting: ", event.target.innerText)
}
```

Our console shows that we are logging the correct selected list item. Now we will want to do two things. First, we'll want to hide the list since the selection has been made. Second, we'll want to add the user's selection to the inner text of the button, so they see that their selection is made.

To do this we need an easy way to get to the text inside our button. For that, Stimulus gives us the concept of targets, which allow us to reference important elements by name in our controller.

We'll add a `data-<controller>-target="name of the target"` in our html.
```html
<span data-dropdown-target="speaker">
  Select speaker
</span>
```

And then in our controller we can add the `speaker` target to our `static targets` array.
```javascript
static targets = [
  "speaker"
]
```

This will allow us to reference this span element with the text we want to update in our `selectItem` function. We do so by calling `this` and then the name of the target followed by `Target`. This will give us the element that corresponds with the `data-dropdown-target` equal to `speaker`.
```javascript
selectItem(event) {
  this.speakerTarget.textContent = event.target.innerText
}
```

Now when we click on a list item, the text of the button will update to the text of the list item that was clicked.

The second thing we wanted to do was hide the drop down list after a selection gets made. To do so we'll add another target in our html to help us more easily reference elements from our html in our controller. Let's add another `data-dropdown-target` with the value `list` to our unordered list tag.
```html
<ul data-dropdown-target="list">
  ...
</ul>
```

And then in our controller we can add the `list` target to our `static targets` array.
```javascript
static targets = [
  "speaker",
  "list"
]
```

And then we can hide this list in the `selectItem` by adding the `hidden` class to it.
```javascript
selectItem(event) {
  this.selectTarget.textContent = event.target.innerText
  this.listTarget.classList.add(this.hiddenClass)
}
```

Now we can select away our list, but there is no way to get it back. We cna fix this by adding a click action to our button so that when the user clicks the button the list will reappear. Stimulus gives certain special elements, like buttons, their own default event short hands. So because this is a click event on a button element, we do not need to specify `click` we only need the `data-action` attribute to include the controller name and the function to call.
```html
<button data-action="dropdown#toggleList">
  ...
</button>
```

And then our `toggleList` function can toggle the hidden class on our list target.
```javascript
toggleList() {
  this.listTarget.classList.toggle(this.hiddenClass)
}
```

And because this functionality is really similar to what we just put in the `selectItem` function we can refactor and DRY up our implementation.
```javascript
selectItem(event) {
  this.selectTarget.textContent = event.target.innerText
  this.toggleList()
}
```
We can also add this to our `connect` function so that the drop down is not visible on page load.
```javascript
connect() {
  this.toggleList()
}
```

At this point our list mostly works. It would be great to get those check marks to show up nicely when we highlight. To do this we are going to first define a new function called `hideChecks` that will iterate over our list items and uncheck any that do not have our selected value.

We will first add a new `data-dropdown-target` target called `check` that will reference the span containing our check svg icon.
```html
<span data-dropdown-target="check">
   <svg></svg>
</span>
```

Next we'll add this target to our `static targets` array.
```javascript
static targets = [
  "speaker",
  "list",
  "check"
]
```

Now we can implement our `hideChecks` function. In the past we've used singular targets, but our page actually has multiple checks, one per list item. So we can use the plural targets suffix to grab an array of our check targets.
```javascript
hideChecks() {
  for (const check of this.checkTargets) {
    check.classList.add(this.hiddenClass)
  }
}
```

We can add this function to our `connect` class so that none of the speakers is checked on page load.
```javascript
connect() {
  this.toggleList()
  this.hideChecks()
}
```

Now when the user selects an item and re-opens the dropdown we want the selected item to have a visible check icon.
```javascript
selectItem(event) {
  this.toggleList()
  this.hideChecks()

  const selected = event.target.innerText.trim()
  this.selectTarget.textContent = selected
  for(const check of this.checkTargets) {
    if(check.previousElementSibling.innerText.trim() === selected) {
      check.classList.remove(this.hiddenClass)
    }
  }
}
```

And because we love our work, we will turn the check marks white when their parent list item is highlighted. To do so we'll add to the `highlightListItem` and `unhighlightListItem` functions.
```javascript
highlightListItem(event) {
  const listItem = event.target
  const span = listItem.firstElementChild
  const check = listItem.lastElementChild

  listItem.classList.add(this.backgroundPinkClass)
  span.classList.add(this.textWhiteClass, this.semiboldClass)

  if (!check.classList.contains(this.hiddenClass)) {
    check.classList.replace(this.textPinkClass, this.textWhiteClass)
  }
}
```

And we will do the reverse in unhighlight.
```javascript
unhighlightListItem(event) {
  const listItem = event.target
  const span = listItem.firstElementChild
  const check = listItem.lastElementChild

  listItem.classList.remove(this.backgroundPinkClass)
  span.classList.remove(this.textWhiteClass, this.semiboldClass)

  if (!check.classList.contains(this.hiddenClass)) {
    check.classList.replace(this.textWhiteClass, this.textPinkClass)
  }
}
```

At this point we have some classes that toggle on and off. We could imagine adding a post method when we select an item that stores the selection in our database, but that is beyond the scope of this talk.

Instead, lets look at our code. Does it bring us joy? It's kind of confusing if I'm being honest. There are a lot of things to keep track of. THis is a sign that maybe our dropdown controller is not well encapsulated.

## Refactor

Let's break our dropdown controller into two chunks. We'll keep the logic for opening and closing our list and setting the selected text in the dropdown controller. If we were posting the selected data to one of our Rails controllers, we might do that here as well.

We'll also add a new `list_item_controller` and empower each list item to manage it's own highlight styling.

First we'll make a new controller with the necessary Stimulus boilerplate.
```bash
cp app/javascript/controllers/hello_controller.js app/javascript/controllers/list_item_controller.js
```

Now around each list item we'll add a `div` on which to instantiate our new controller. That way the list item controller will have a single list item in its scope.
```html
<div data-controller="list-item">
  <li></li>
</div>
```

Let's hook send a message to our console to make sure everything is hooked up correctly.
```javascript
connect() {
  console.log("Hello, Stimulus!")
}
```

Now let's add some targets in our new list item controller so that it is easy to reference the important elements in our list item, the inner text with the name of the speaker, the check, and then the entire list item itself.
```erb
<li data-list-item-target="item" ...>
  <span data-list-item="text" ...>
    <%= speaker %>
  </span>
  <span data-list-item="check" ...>
    <svg></svg>
  </span>
</li>
```

We need to add these targets to our `static targets` array.
```javascript
static targets = [
  "text", // the span containing the speaker's name
  "check", // the span containing the check svg icon
  "item" // the entire list item 
]
```

Now lets move the `data-dropdown` class attributes to our list item. We will add these to the the `div` where we attached our `listItem` controller.
```html
<div
  data-controller="list-item"
  data-list-item-text-white-class="text-white"
  data-list-item-text-pink-class="text-pink-600"
  data-list-item-background-pink-class="bg-pink-600"
  data-list-item-semibold-class="font-semibold"
  data-list-item-normal-class="font-normal"
>
  <li></li>
</div>
```

And we also need to add these classes to the `static classes` array:
```javascript
static classes = [
  "textWhite",
  "textPink",
  "backgroundPink",
  "semibold",
  "normal"
]
```

And we also have to re-write our data actions defined on our list items.
```html
<li data-action="click->list-item#select mouseenter->list-item#highlight mouseleave->list-item#unhighlight">
</li>
```

Now let's make sure our actions are firing.
```javascript
select(event) {
  console.log("Selecting: ", event.target.innerText.trim())
}

highlight(event) {
  console.log("Highlighting: ", event.target.innerText.trim())
}

unhighlight(event) {
  console.log("UnHighlighting: ", event.target.innerText.trim())
}
```

Now let's move our highlighting functionality over. Because we defined the elements we care about as targets, we can reference them more directly instead of needing to get at them by way of first or last element child.
```javascript
highlight(event) {
  this.itemTarget.classList.add(this.backgroundPinkClass)
  this.textTarget.classList.add(this.textWhiteClass, this.semiboldClass)
  this.checkTarget.classList.replace(this.textPinkClass, this.textWhiteClass)
}
```

And this reads a lot nicer - do this to the item, and this to the text, and this to the check.

We can do the opposite for our `unhighlight`
```javascript
unhighlight(event) {
  this.itemTarget.classList.remove(this.backgroundPinkClass)
  this.textTarget.classList.remove(this.textWhiteClass, this.semiboldClass)
  this.checkTarget.classList.replace(this.textWhiteClass, this.textPinkClass)
}
```

For select, we are going to want to reach for another tool in the Stimulus tool box. We are going to use data values to store the state of our list items. We'll first add a new attribute to our `div` with our list item controller that will start with `data` hyphen the controller hyphen the name of the value hyphen `value` and set that equal to whatever value we want to store.
```html
<div ... data-list-item-is-selected-value=false>
```

We can store booleans, integers, strings among other types of data here. In this case we want a boolean value that tells us whether or not the list item is in a selected state.

We will add this value to our static values object in the controller.
```javascript
static values = {
  isSelected: Boolean
}
```

Now when we connect, we can log this value.
```javascript
connect() {
  console.log("isSelected: ", this.isSelectedValue)
}
```

And now our select function becomes a little cleaner. Instead of messing with the list item text, we'll just set the `isSelected` state to be true.
```javascript
select() {
  this.isSelectedValue = true
}
```

These values in Stimulus also come with other powers. For example, we can use a callback function that gets triggered whenever this value gets changed. These functions are name by the name of the value followed by value followed by the word `Changed`.
```javascript
isSelectedValueChanged() {
  console.log("isSelected value changed to: ", this.isSelectedValue)
}
```

When a list item is selected, we want to show the check mark, so we'll remove the hidden class.
```javascript
isSelectedValueChanged() {
  this.checkTarget.classList.toggle(this.hiddenClass)
}
```

By default we see that the changed callback is triggered when the controller is first instantiated, so all of the checks will get hidden initially.

Now our list item styles work, but we need to somehow create a line of communication between our new list item controller and our old dropdown controller and the sibling list item controllers. When a particular list item is selected, the controller associated with that item should announce "Hey, I've been selected! I'm the one!" and the sibling list items should all uncheck themselves and the dropdown should hide the list.

To do this we'll create a custom event and dispatch it when a list item is selected. We'll create a detail hash that will contain the text of the list item that is being selected. We'll call this custom event the `listItemSelected` event.
```javascript
select() {
  this.selectedValue = true

  const detail = { value: this.textTarget.innerText.trim() }
  const event = new CustomEvent('listItemSelected', { detail: detail }

  window.dispatchEvent(event)
}
```

In our html we'll add data actions to listen for this new custom event. First on our list item controller `div` we'll want to listen for this event and then de-select the list items sibling list items.
```html
<div ... data-action="listItemSelected@window->list-item#deselect">
  <li></li>
</div>
```

And then we can define the deselect function to with a console log to make sure things are working.
```javascript
deselect(event) {
  console.log("The selected item's value is: ", event.detail.value)
  console.log("This item's value is: ", this.textTarget.innerText.trim())
}
```

When these two values are the same, we are dealing with the list item that published the `listItemSelected` event. So we can just ignore it. But on the other sibling list items, we need to set the `isSelected` state to `false`.
```javascript
deselect(event) {
  if(event.detail.value !== this.textTarget.innerText.trim()) {
    this.isSelectedValue = false
  }
}
```

This will trigger the `isSelectedValueChanged` function, which will uncheck our list item appropriately.

At this point our list items more or less govern themselves. They are much more encapsulated than in our initial implementation.

Now all that is left to do is clean up our drop down controller.

First we need to remove the functions we no longer need. `selectItem`, `setCheck`, `hideCheck`, `highlightListItem` and `unhighlightListItem`. These are all either no longer needed or handled by our list item controller.

Now we'll want to add a new function to set the selected value. We can add a new data action to our `div` that will listen for any `listItemSelected` event.
```html
<div ... data-action="listItemSelected@window->dropdown#setSelected">
  ...
</div>
```

And that function just has to change the `speaker` target textContent if the event contains a value.
```javascript
setSelected(event) {
  if (event.detail.value) {
    this.speakerTarget.textContent = event.detail.value
  }
}
```

And then in the `connect` function we'll want to make sure we are still toggling the list off when the page loads.
```javascript
connect() {
  this.toggleList()
}
```

Thanks for sticking with me through the highs and lows of this. I hope you are walking away with an increased interest in Stimulus and maybe a few new tools in your stimulus repertoire. Thank you!
