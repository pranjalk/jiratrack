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
const AllbugsDayToDay = require('./src/js/lib/allBugsDayToDay.js');

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
case 'd2d': {
  const dateFrom = process.argv[3];
  const dateTo = process.argv[4];
  if (dateFrom && dateTo) {
    const allBugsDayToDay = new AllbugsDayToDay(dateFrom, dateTo);
    allBugsDayToDay.run();
  } else {
    console.log('Day To Day requires dates in "yyyy-mm-dd" format => dateFrom dateTo');
  }
  break;
}
default: {
  console.log('No valid option passed, exiting...');
  break;
}
}
