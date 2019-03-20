import chalk from 'chalk';
import moment from 'moment';
import parameters from '../../../../config/parameters.js';

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

export default function bugsViolatingSLA(issues) {
  let consoleTable = {};
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
          break;
        } else if (resolved.isBefore(created.add(permFixValue, permFixUnit))) {
          break;
        } else {
          break;
        }
      } else if (now.isAfter(created.add(permFixValue, permFixUnit))) {
        const tableKey = `${parameters.ATLASSIAN_DOMAIN}/browse/${issue.key}`;
        consoleTable = {
          ...consoleTable,
          [tableKey]: {
            assignee: issue.fields.assignee ? issue.fields.assignee.key : 'unassigned',
            priority: issue.fields.priority.name
          }
        };
      }
      break;
    }
    case MAJOR: {
      const { unit: sysRestoreUnit, value: sysRestoreValue } = MAJOR_SLA.SYSTEM_RESTORE;
      const { unit: permFixUnit, value: permFixValue } = MAJOR_SLA.PERMANENT_FIX;
      if (resolved) {
        if (resolved.isBefore(created.add(sysRestoreValue, sysRestoreUnit))) {
          break;
        } else if (resolved.isBefore(created.add(permFixValue, permFixUnit))) {
          break;
        } else {
          break;
        }
      } else if (now.isAfter(created.add(permFixValue, permFixUnit))) {
        const tableKey = `${parameters.ATLASSIAN_DOMAIN}/browse/${issue.key}`;
        consoleTable = {
          ...consoleTable,
          [tableKey]: {
            assignee: issue.fields.assignee ? issue.fields.assignee.key : 'unassigned',
            priority: issue.fields.priority.name
          }
        };
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
          break;
        } else if (resolved.isBefore(created.add(permFixValue, permFixUnit))) {
          break;
        } else {
          break;
        }
      } else if (now.isAfter(created.add(permFixValue, permFixUnit))) {
        const tableKey = `${parameters.ATLASSIAN_DOMAIN}/browse/${issue.key}`;
        consoleTable = {
          ...consoleTable,
          [tableKey]: {
            assignee: issue.fields.assignee ? issue.fields.assignee.key : 'unassigned',
            priority: issue.fields.priority.name
          }
        };
      }
      break;
    }
    default: {
      break;
    }
    }
  });
  console.log(chalk.green('Bugs Violating SLA'));
  console.table(consoleTable);
}
