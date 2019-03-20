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

const BugsInLastXWeeks = require('./src/js/lib/allBugsLastXWeeks.js');

switch (process.argv[2]) {
case 'weeks': {
  const weekCount = Number.parseInt(process.argv[3], 10);
  if (weekCount && Number.isInteger(weekCount) && Math.sign(weekCount) === 1) {
    const bugsInLastTwoWeeks = new BugsInLastXWeeks(weekCount);
    bugsInLastTwoWeeks.run();
  } else {
    console.error(Error('Invalid Number passed, count has to be positive integer'));
  }
  break;
}
default: {
  console.log('No valid option passed, exiting...');
  break;
}
}
