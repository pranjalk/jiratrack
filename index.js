require('@babel/register')({
  presets: [
    [
      '@babel/preset-env'
    ]
  ],
  plugins: [
    'add-module-exports',
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-object-rest-spread'
  ]
});

const BugsInLastTwoWeeks = require('./src/js/lib/allBugsLastTwoWeeks.js');

const bugsInLastTwoWeeks = new BugsInLastTwoWeeks();

bugsInLastTwoWeeks.run();
