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

const BugsInLastTwoWeeks = require('./src/js/lib/all_bugs_last_two_weeks.js');

const bugsInLastTwoWeeks = new BugsInLastTwoWeeks();

bugsInLastTwoWeeks.run();
