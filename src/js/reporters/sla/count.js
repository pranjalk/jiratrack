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

export default function slaVsCount(issues) {
  const consoleTable = {
    TOTAL: {
      system_restore: 0,
      perm_fix: 0,
      exceeded: 0,
      violating: 0
    }
  };
  // Get violations for unresolved issues as well
  const now = moment();

  issues.forEach(issue => {
    const { fields } = issue;
    const created = moment(fields.created);
    let resolved = null;
    if (fields.resolutiondate) {
      resolved = moment(fields.resolutiondate);
    }
    switch (fields.priority.name) {
    case CRITICAL: {
      const { unit: sysRestoreUnit, value: sysRestoreValue } = CRITICAL_SLA.SYSTEM_RESTORE;
      const { unit: permFixUnit, value: permFixValue } = CRITICAL_SLA.PERMANENT_FIX;
      if (resolved) {
        if (resolved.isBefore(created.add(sysRestoreValue, sysRestoreUnit))) {
          consoleTable.TOTAL.system_restore += 1;
        } else if (resolved.isBefore(created.add(permFixValue, permFixUnit))) {
          consoleTable.TOTAL.perm_fix += 1;
        } else {
          consoleTable.TOTAL.exceeded += 1;
        }
      } else if (now.isAfter(created.add(permFixValue, permFixUnit))) {
        consoleTable.TOTAL.violating += 1;
      }
      break;
    }
    case MAJOR: {
      const { unit: sysRestoreUnit, value: sysRestoreValue } = MAJOR_SLA.SYSTEM_RESTORE;
      const { unit: permFixUnit, value: permFixValue } = MAJOR_SLA.PERMANENT_FIX;
      if (resolved) {
        if (resolved.isBefore(created.add(sysRestoreValue, sysRestoreUnit))) {
          consoleTable.TOTAL.system_restore += 1;
        } else if (resolved.isBefore(created.add(permFixValue, permFixUnit))) {
          consoleTable.TOTAL.perm_fix += 1;
        } else {
          consoleTable.TOTAL.exceeded += 1;
        }
      } else if (now.isAfter(created.add(permFixValue, permFixUnit))) {
        consoleTable.TOTAL.violating += 1;
      }
      break;
    }
    case NORMAL:
    case TRIVIAL:
    case MINOR: {
      const { unit: sysRestoreUnit, value: sysRestoreValue } = MINOR_SLA.SYSTEM_RESTORE;
      const { unit: permFixUnit, value: permFixValue } = MINOR_SLA.PERMANENT_FIX;
      if (resolved) {
        if (resolved.isBefore(created.add(sysRestoreValue, sysRestoreUnit))) {
          consoleTable.TOTAL.system_restore += 1;
        } else if (resolved.isBefore(created.add(permFixValue, permFixUnit))) {
          consoleTable.TOTAL.perm_fix += 1;
        } else {
          consoleTable.TOTAL.exceeded += 1;
        }
      } else if (now.isAfter(created.add(permFixValue, permFixUnit))) {
        consoleTable.TOTAL.violating += 1;
      }
      break;
    }
    default: {
      break;
    }
    }
  });
  console.log(chalk.green('SLA Violations vs Count'));
  console.table(consoleTable);
}
