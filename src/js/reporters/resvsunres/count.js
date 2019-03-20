import chalk from 'chalk';

export default function resVsUnrescount(issues) {
  console.log(chalk.green('Count of Resolved vs Unresolved'));
  console.table({
    resolved: {
      count: issues.filter(issue => issue.fields.resolutiondate !== null).length
    },
    unresolved: {
      count: issues.filter(issue => issue.fields.resolutiondate === null).length
    },
    total: {
      count: issues.length
    }
  });
}
