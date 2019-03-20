import chalk from 'chalk';
import moment from 'moment';

import {
  CRITICAL,
  MAJOR,
  MINOR,
  NORMAL,
  TRIVIAL
} from '../../constants/priorities.js';

import {
  CRITICAL_SLA,
  MAJOR_SLA,
  MINOR_SLA
} from '../../constants/reporterSLAs.js';

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
        const { unit: sysRestoreUnit, value: sysRestoreValue } = CRITICAL_SLA.SYSTEM_RESTORE;
        const { unit: permFixUnit, value: permFixValue } = CRITICAL_SLA.PERMANENT_FIX;
        if (resolved.isBefore(created.add(sysRestoreValue, sysRestoreUnit))) {
          consoleTable[CRITICAL].system_restore += 1;
          consoleTable.TOTAL.system_restore += 1;
        } else if (resolved.isBefore(created.add(permFixValue, permFixUnit))) {
          consoleTable[CRITICAL].perm_fix += 1;
          consoleTable.TOTAL.perm_fix += 1;
        } else {
          consoleTable[CRITICAL].exceeded += 1;
          consoleTable.TOTAL.exceeded += 1;
        }
        break;
      }
      case MAJOR: {
        const { unit: sysRestoreUnit, value: sysRestoreValue } = MAJOR_SLA.SYSTEM_RESTORE;
        const { unit: permFixUnit, value: permFixValue } = MAJOR_SLA.PERMANENT_FIX;
        if (resolved.isBefore(created.add(sysRestoreValue, sysRestoreUnit))) {
          consoleTable[MAJOR].system_restore += 1;
          consoleTable.TOTAL.system_restore += 1;
        } else if (resolved.isBefore(created.add(permFixValue, permFixUnit))) {
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
        const { unit: sysRestoreUnit, value: sysRestoreValue } = MINOR_SLA.SYSTEM_RESTORE;
        const { unit: permFixUnit, value: permFixValue } = MINOR_SLA.PERMANENT_FIX;
        if (resolved.isBefore(created.add(sysRestoreValue, sysRestoreUnit))) {
          consoleTable[MINOR].system_restore += 1;
          consoleTable.TOTAL.system_restore += 1;
        } else if (resolved.isBefore(created.add(permFixValue, permFixUnit))) {
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
