import chalk from 'chalk';
import ApiClient from '../apiclient/index.js';
import parameters from '../../../config/parameters.js';
import { JIRA_SEARCH } from '../constants/url_endpoints.js';

export default class BugsInLastTwoWeeks {
  constructor() {
    this.jqlQuery = `project = ${parameters.JIRA_BOARD} AND issuetype = Bug AND createdDate > startOfWeek(-2w) ORDER BY created DESC`;
    this.run = this.run.bind(this);
    this.bugPriorityClassification = this.bugPriorityClassification.bind(this);
  }

  bugPriorityClassification(data) {

  }

  run() {
    ApiClient.post(JIRA_SEARCH, {}, {
      jql: this.jqlQuery,
      validateQuery: 'warn',
      startAt: 0,
      maxResults: 75,
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
      console.log(JSON.stringify(res.data));
    }).catch((err) => {
      console.log(chalk.red.inverse('API CALL FAILED!'));
    }).finally(() => {
      console.log(chalk.green('Completed Successfully'));
    });
  }
}
