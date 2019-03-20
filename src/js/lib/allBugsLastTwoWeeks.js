import chalk from 'chalk';
import moment from 'moment';

import ApiClient from '../apiclient/index.js';
import parameters from '../../../config/parameters.js';
import { JIRA_SEARCH } from '../constants/urlEndpoints.js';
import {
  CRITICAL,
  MAJOR,
  MINOR,
  NORMAL,
  TRIVIAL,
  MINOR_PRIORITIES_SET,
  MAJOR_PRIORITIES_SET,
  CRITICAL_PRIORITIES_SET,
  ALL_PRIORITIES_SET
} from '../constants/priorities.js';

export default class BugsInLastTwoWeeks {
  constructor() {
    this.jqlQuery = `project = ${parameters.JIRA_BOARD} AND issuetype = Bug AND createdDate > startOfWeek(-2w) ORDER BY created DESC`;
    this.run = this.run.bind(this);
    this.resolvedVsUnresolved = this.resolvedVsUnresolved.bind(this);
    this.resolutionTimeFrame = this.resolutionTimeFrame.bind(this);
  }

  resolvedVsUnresolved({ issues }) {
    console.log(chalk.green('Resolved vs Unresolved in the last two weeks'));
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

  resolvedUnresolvedPriority({ issues }) {
    console.log(chalk.green('Resolved vs Unresolved in the last two weeks'));
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

  resolutionTimeFrame({ issues }) {
    const consoleTable = {
      [CRITICAL]: {
        system_restore: 0,
        perm_fix: 0,
        exceeded: 0
      },
      [MAJOR]: {
        system_restore: 0,
        perm_fix: 0,
        exceeded: 0
      },
      [MINOR]: {
        system_restore: 0,
        perm_fix: 0,
        exceeded: 0
      },
      TOTAL: {
        system_restore: 0,
        perm_fix: 0,
        exceeded: 0
      }
    };

    issues.forEach(issue => {
      const { fields } = issue;
      if (fields.resolutiondate) {
        const created = moment(fields.created);
        const resolved = moment(fields.resolutiondate);
        switch (fields.priority.name) {
        case CRITICAL: {
          if (resolved.isBefore(created.add(4, 'hours'))) {
            consoleTable[CRITICAL].system_restore += 1;
            consoleTable.TOTAL.system_restore += 1;
          } else if (resolved.isBefore(created.add(96, 'hours'))) {
            consoleTable[CRITICAL].perm_fix += 1;
            consoleTable.TOTAL.perm_fix += 1;
          } else {
            consoleTable[CRITICAL].exceeded += 1;
            consoleTable.TOTAL.exceeded += 1;
          }
          break;
        }
        case MAJOR: {
          if (resolved.isBefore(created.add(48, 'hours'))) {
            consoleTable[MAJOR].system_restore += 1;
            consoleTable.TOTAL.system_restore += 1;
          } else if (resolved.isBefore(created.add(10, 'days'))) {
            consoleTable[MAJOR].perm_fix += 1;
            consoleTable.TOTAL.perm_fix += 1;
          } else {
            consoleTable[MAJOR].exceeded += 1;
            consoleTable.TOTAL.exceeded += 1;
          }
          break;
        }
        case NORMAL:
        case TRIVIAL:
        case MINOR: {
          if (resolved.isBefore(created.add(5, 'days'))) {
            consoleTable[MINOR].system_restore += 1;
            consoleTable.TOTAL.system_restore += 1;
          } else if (resolved.isBefore(created.add(30, 'days'))) {
            consoleTable[MINOR].perm_fix += 1;
            consoleTable.TOTAL.perm_fix += 1;
          } else {
            consoleTable[MINOR].exceeded += 1;
            consoleTable.TOTAL.exceeded += 1;
          }
          break;
        }
        default: {
          break;
        }
        }
      }
    });
    console.log(chalk.green('SLA Bucket Calculations for Resolved issues in the last two weeks'));
    console.table(consoleTable);
  }

  run() {
    console.log(`${chalk.yellow('Fetching Data for Board: ')} ${chalk.bgGreen(`${parameters.JIRA_BOARD}`)}`);
    ApiClient.post(JIRA_SEARCH, {}, {
      jql: this.jqlQuery,
      validateQuery: 'warn',
      startAt: 0,
      maxResults: 75,
      fieldsByKeys: false,
      fields: [
        'key',
        'priority',
        'assignee',
        'status',
        'issuetype',
        'project',
        'resolutiondate',
        'created'
      ]
    }).then((res) => {
      console.log(`${chalk.green('Fetched Data Successfully: \n')}`);
      this.resolvedVsUnresolved(res.data);
      this.resolvedUnresolvedPriority(res.data);
      try {
        this.resolutionTimeFrame(res.data);
      } catch (err) {
        console.log(err);
      }
    }).catch((err) => {
      console.log(chalk.red.inverse('API CALL FAILED!'));
    }).finally(() => {
      console.log(chalk.green('Report Generated Successfully'));
    });
  }
}
