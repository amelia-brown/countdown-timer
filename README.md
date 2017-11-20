# countdown-timer

## What this does

It's a countdown timer that takes two times of the day, calculates the
difference, and displays a countdown of the difference.

## Structure

Built with React & a bit of Redux, CSS modules, SASS and Webpack

`modules` - contains countdown reducer, actions, selector etc.

`helpers` - contains store & mount for React/redux/hot modules &
css globals

`components` - contains UI components for timer, countdown, input,
and wrapper componene

`containers` - contains connected components for countdown and set time

`tools` - weboack config

`lib` - compiled files

## Run build

  `npm install && npm build`
  `open index.html`

## Run dev

  `npm install && npm run start` < runs in webpack dev server at
  `localhost:3000`

### Notes
  Time inputs use 24 hour clock
  No tests written, although Jest and Enzyme are set up and configured
