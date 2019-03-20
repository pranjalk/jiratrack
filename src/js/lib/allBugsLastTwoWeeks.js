import chalk from 'chalk';

import ApiClient from '../apiclient/index.js';
import parameters from '../../../config/parameters.js';
import { JIRA_SEARCH } from '../constants/urlEndpoints.js';

import resVsUnrescount from '../reporters/resvsunres/count.js';
import resVsUnresvsPriorities from '../reporters/resvsunres/priorities.js';
import resVsUnResVsAssignees from '../reporters/resvsunres/assignees.js';

import slaVsPriorities from '../reporters/sla/priorities.js';
import slaVsCount from '../reporters/sla/count.js';

export default class BugsInLastTwoWeeks {
  constructor() {
    this.jqlQuery = `project = ${parameters.JIRA_BOARD} AND issuetype = Bug AND createdDate > startOfWeek(-2w) ORDER BY created DESC`;
    this.run = this.run.bind(this);
  }

  run() {
    console.log(`${chalk.yellow('Fetching Data for Board: ')} ${chalk.bgMagenta.black(`${parameters.JIRA_BOARD}`)}\n`);
    ApiClient.post(JIRA_SEARCH, {}, {
      jql: this.jqlQuery,
      validateQuery: 'warn',
      startAt: 0,
      maxResults: 100,
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
      console.log(`${chalk.green('Data fetching successful...')}`);
      console.log(`${chalk.green('Generating report for last two weeks...')}`);
      console.log(`${chalk.yellow('Total issues (limited to 100)')}: ${chalk.blueBright(res.data.issues.length)}`);
      resVsUnrescount(res.data.issues);
      resVsUnresvsPriorities(res.data.issues);
      slaVsPriorities(res.data.issues);
      resVsUnResVsAssignees(res.data.issues);
      slaVsCount(res.data.issues);
    }).catch((err) => {
      console.log(err);
      console.log(chalk.red.inverse('API CALL FAILED!'));
    }).finally(() => {
      console.log(chalk.green('Report Generated Successfully'));
    });
  }
}
