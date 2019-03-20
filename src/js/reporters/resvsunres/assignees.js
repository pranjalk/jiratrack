import chalk from 'chalk';

export default function resVsUnResVsAssignees(issues) {
  let tableData = {};
  issues.forEach(issue => {
    const keyToUse = issue.fields.assignee ? issue.fields.assignee.key : 'unassigned';
    if (!(keyToUse in tableData)) {
      tableData = {
        ...tableData,
        [keyToUse]: {
          resolved: 0,
          unresolved: 0
        }
      };
    }
    if (issue.fields.resolutiondate) {
      tableData[keyToUse].resolved += 1;
    } else {
      tableData[keyToUse].unresolved += 1;
    }
  });
  console.log(chalk.green('Resolved vs Unresolved vs Assignees'));
  console.table(tableData);
}
