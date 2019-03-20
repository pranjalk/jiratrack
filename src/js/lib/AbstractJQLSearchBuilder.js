import chalk from 'chalk';
import parameters from '../../../config/parameters.js';

import ApiClient from '../apiclient/index.js';
import { JIRA_SEARCH } from '../constants/urlEndpoints.js';

export default class AbstractJQLSearchBuilder {
  constructor() {
    if (new.target === AbstractJQLSearchBuilder) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }
    this.run = this.run.bind(this);
    this.reporter = this.reporter.bind(this);
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
      this.reporter(res);
    }).catch((err) => {
      console.log(chalk.red.inverse('API CALL FAILED!'));
      console.error(err);
    }).finally(() => {
      console.log(chalk.green('Report Generated Successfully'));
    });
  }
}
