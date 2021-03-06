# JIRA Track [![Node Version](https://img.shields.io/badge/node-%3E%3D10.14.0-green.svg)](https://www.github.com/pranjalk/jiratrack)

Enhanced JIRA Bug Tracking

JQL (JIRA Query Language it pretty simple to understand but is not as flexible as SQL).

In order to process the data further, we fetch base sample data from JIRA APIs using JQL and process it further locally

### References

JIRA REST API https://developer.atlassian.com/cloud/jira/platform/rest/v3

### Setup Commands
  - Requires Node version 10 and above
  - Install packages `npm ci`
  - Copy secrets `cp ./config/secrets.js.sample ./config/secrets.js`
  - Copy parameters `cp ./config/parameters.js.sample ./config/parameters.js`
  - Replace in secrets your email and API Token from https://id.atlassian.com/manage/api-tokens
  - Replace in parameters, your atlassian domain & bug board

### Creating reports

##### Weeks reporting (Max Issues => 100)

- `npm run report -- weeks <weeks>` for report from today to last x weeks
- `npm run report -- crweeks <weeks>` for report from today to last x weeks for consumer reported bugs

##### Days Interval (Max Issues  => 100)

- `npm run report -- d2d <dateFrom> <dateTo>` for report from dateFrom ~ dateTo
- `npm run report -- crd2d <dateFrom> <dateTo>` for report from dateFrom ~ dateTo for consumer reported bugs


&copy; 2019 Pranjal Kumar
