import chalk from 'chalk';

import parameters from '../../../config/parameters.js';

import AbstractJQLSearchBuilder from './AbstractJQLSearchBuilder.js';

import resVsUnresvsPriorities from '../reporters/resvsunres/priorities.js';
import resVsUnResVsAssignees from '../reporters/resvsunres/assignees.js';
import slaVsPriorities from '../reporters/sla/priorities.js';
import bugsViolatingSLA from '../reporters/bugs/violatingSLA.js';


export default class ConsumerReportedBugsLastXWeeks extends AbstractJQLSearchBuilder {
  constructor(count) {
    super();
    this.weekCount = 2;
    if (count) {
      this.weekCount = count;
    }
    this.jqlQuery = `project = ${parameters.JIRA_BOARD} AND issuetype = Bug AND createdDate > startOfWeek(-${this.weekCount}w) AND "Consumer Reported" = "True" ORDER BY created DESC`;
    this.reporter = this.reporter.bind(this);
  }

  reporter(res) {
    console.log(`${chalk.green('Data fetching successful...')}`);
    console.log(`${chalk.green(`Generating report for last ${this.weekCount} weeks...`)}`);
    console.log(`${chalk.yellow('Total issues (limited to 100)')}: ${chalk.blueBright(res.data.issues.length)}`);
    resVsUnresvsPriorities(res.data.issues);
    resVsUnResVsAssignees(res.data.issues);
    slaVsPriorities(res.data.issues);
    bugsViolatingSLA(res.data.issues);
  }
}
