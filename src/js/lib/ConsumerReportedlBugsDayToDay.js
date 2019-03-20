import chalk from 'chalk';

import parameters from '../../../config/parameters.js';

import ApiClient from '../apiclient/index.js';

import AbstractJQLSearchBuilder from './AbstractJQLSearchBuilder.js';

import resVsUnresvsPriorities from '../reporters/resvsunres/priorities.js';
import resVsUnResVsAssignees from '../reporters/resvsunres/assignees.js';
import slaVsPriorities from '../reporters/sla/priorities.js';
import bugsViolatingSLA from '../reporters/bugs/violatingSLA.js';


export default class ConsumerReportedlBugsDayToDay extends AbstractJQLSearchBuilder {
  constructor(dateFrom, dateTo) {
    super();
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.jqlQuery = `project = ${parameters.JIRA_BOARD} AND issuetype = Bug AND created >= ${dateFrom} AND created <= ${dateTo} AND "Consumer Reported" = "True" ORDER BY created DESC`;
    this.reporter = this.reporter.bind(this);
  }

  reporter(res) {
    console.log(`${chalk.green('Data fetching successful...')}`);
    console.log(`${chalk.green(`Generating report for bugs raised between ${this.dateFrom} ~ ${this.dateTo}...`)}`);
    console.log(`${chalk.yellow('Total issues (limited to 100)')}: ${chalk.blueBright(res.data.issues.length)}`);
    resVsUnresvsPriorities(res.data.issues);
    resVsUnResVsAssignees(res.data.issues);
    slaVsPriorities(res.data.issues);
    bugsViolatingSLA(res.data.issues);
  }
}
