import chalk from 'chalk';

export default function resVsUnResVsAssignees(issues) {
  let tableData = {};
  issues.forEach(issue => {
    if (!(issue.fields.assignee.key in tableData)) {
      tableData = {
        ...tableData,
        [issue.fields.assignee.key]: {
          resolved: 0,
          unresolved: 0
        }
      };
    }
    if (issue.fields.resolutiondate) {
      tableData[issue.fields.assignee.key].resolved += 1;
    } else {
      tableData[issue.fields.assignee.key].unresolved += 1;
    }
  });
  console.log(chalk.green('Resolved vs Unresolved vs Assignees'));
  console.table(tableData);
}
