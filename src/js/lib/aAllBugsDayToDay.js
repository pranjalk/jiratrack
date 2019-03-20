import chalk from 'chalk';

import ApiClient from '../apiclient/index.js';
import parameters from '../../../config/parameters.js';
import { JIRA_SEARCH } from '../constants/urlEndpoints.js';

import resVsUnresvsPriorities from '../reporters/resvsunres/priorities.js';
import resVsUnResVsAssignees from '../reporters/resvsunres/assignees.js';

import slaVsPriorities from '../reporters/sla/priorities.js';

import bugsViolatingSLA from '../reporters/bugs/violatingSLA.js';

export default class AllbugsDayToDay {
  constructor(dateFrom, dateTo) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.jqlQuery = `project = ${parameters.JIRA_BOARD} AND issuetype = Bug AND created >= ${dateFrom} AND created <= ${dateTo} ORDER BY created DESC`;
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
      console.log(`${chalk.green(`Generating report for bugs raised between ${this.dateFrom} ~ ${this.dateTo}...`)}`);
      console.log(`${chalk.yellow('Total issues (limited to 100)')}: ${chalk.blueBright(res.data.issues.length)}`);
      resVsUnresvsPriorities(res.data.issues);
      resVsUnResVsAssignees(res.data.issues);
      slaVsPriorities(res.data.issues);
      bugsViolatingSLA(res.data.issues);
    }).catch((err) => {
      console.log(chalk.red.inverse('API CALL FAILED!'));
      console.error(err);
    }).finally(() => {
      console.log(chalk.green('Report Generated Successfully'));
    });
  }
}
