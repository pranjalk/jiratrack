import chalk from 'chalk';
import moment from 'moment';

import {
  CRITICAL,
  MAJOR,
  MINOR,
  NORMAL,
  TRIVIAL
} from '../../constants/priorities.js';

export default function slaVsPriorities(issues) {
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
  console.log(chalk.green('SLA Voilations vs Priorities'));
  console.table(consoleTable);
}
