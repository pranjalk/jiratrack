import chalk from 'chalk';

import {
  MAJOR_PRIORITIES_SET,
  CRITICAL_PRIORITIES_SET,
  MINOR_PRIORITIES_SET,
  ALL_PRIORITIES_SET
} from '../../constants/priorities.js';

export default function resVsUnresvsPriorities(issues) {
  console.log(chalk.green('Resolved vs Unresolved vs Priorities'));
  console.table({
    critical: {
      resolved: issues.filter(issue => {
        const { fields } = issue;
        return fields.resolutiondate !== null && CRITICAL_PRIORITIES_SET.includes(fields.priority.name);
      }).length,
      unresolved: issues.filter(issue => {
        const { fields } = issue;
        return fields.resolutiondate === null && CRITICAL_PRIORITIES_SET.includes(fields.priority.name);
      }).length
    },
    major: {
      resolved: issues.filter(issue => {
        const { fields } = issue;
        return fields.resolutiondate !== null && MAJOR_PRIORITIES_SET.includes(fields.priority.name);
      }).length,
      unresolved: issues.filter(issue => {
        const { fields } = issue;
        return fields.resolutiondate === null && MAJOR_PRIORITIES_SET.includes(fields.priority.name);
      }).length
    },
    minor: {
      resolved: issues.filter(issue => {
        const { fields } = issue;
        return fields.resolutiondate !== null && MINOR_PRIORITIES_SET.includes(fields.priority.name);
      }).length,
      unresolved: issues.filter(issue => {
        const { fields } = issue;
        return fields.resolutiondate === null && MINOR_PRIORITIES_SET.includes(fields.priority.name);
      }).length
    },
    total: {
      resolved: issues.filter(issue => {
        const { fields } = issue;
        return fields.resolutiondate !== null && ALL_PRIORITIES_SET.includes(fields.priority.name);
      }).length,
      unresolved: issues.filter(issue => {
        const { fields } = issue;
        return fields.resolutiondate === null && ALL_PRIORITIES_SET.includes(fields.priority.name);
      }).length
    }
  });
}
