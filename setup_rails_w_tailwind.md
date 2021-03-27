# Setup Rails and Tailwind CSS
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