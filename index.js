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

const AllBugsInLastXWeeks = require('./src/js/lib/AllBugsLastXWeeks.js');
const AllbugsDayToDay = require('./src/js/lib/AllBugsDayToDay.js');
const ConsumerReportedBugsLastXWeeks = require('./src/js/lib/ConsumerReportedBugsLastXWeeks.js');
const ConsumerReportedlBugsDayToDay = require('./src/js/lib/ConsumerReportedlBugsDayToDay.js');

switch (process.argv[2]) {
case 'weeks': {
  const weekCount = Number.parseInt(process.argv[3], 10);
  if (weekCount && Number.isInteger(weekCount) && Math.sign(weekCount) === 1) {
    const bugsInLastTwoWeeks = new AllBugsInLastXWeeks(weekCount);
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
case 'crweeks': {
  const weekCount = Number.parseInt(process.argv[3], 10);
  if (weekCount && Number.isInteger(weekCount) && Math.sign(weekCount) === 1) {
    const crBugsInLastTwoWeeks = new ConsumerReportedBugsLastXWeeks(weekCount);
    crBugsInLastTwoWeeks.run();
  } else {
    console.error(Error('Invalid Number passed, count has to be positive integer'));
  }
  break;
}
case 'crd2d': {
  const dateFrom = process.argv[3];
  const dateTo = process.argv[4];
  if (dateFrom && dateTo) {
    const crAllBugsDayToDay = new ConsumerReportedlBugsDayToDay(dateFrom, dateTo);
    crAllBugsDayToDay.run();
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
