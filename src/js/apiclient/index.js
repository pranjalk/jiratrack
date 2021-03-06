import axios from 'axios';

import secrets from '../../../config/secrets.js';
import parameters from '../../../config/parameters.js';

export default class ApiClient {
  static get(url, params = {}) {
    return axios({
      url,
      method: 'get',
      baseURL: parameters.ATLASSIAN_DOMAIN,
      params,
      auth: {
        username: secrets.JIRA_USER_EMAIL,
        password: secrets.JIRA_API_TOKEN
      }
    });
  }

  static post(url, params = {}, data = {}) {
    return axios({
      url,
      method: 'post',
      baseURL: parameters.ATLASSIAN_DOMAIN,
      params,
      data,
      auth: {
        username: secrets.JIRA_USER_EMAIL,
        password: secrets.JIRA_API_TOKEN
      }
    });
  }
}
