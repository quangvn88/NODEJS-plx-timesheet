const { call_api } = require('./call_api');

const work_log = async (param) => {
    let JSESSIONID = param.COOKIE[0]["value"];
    let TOKEN = param.COOKIE[1]["value"];

    let payload = {
        "issueKey": param.ISSUE_KEY,
        "userKey": param.USER_ASSIGN,
        "period": "false",
        "startDate": param.START_DATE,
        "endDate": param.START_DATE,
        "workPerDay": "8",
        "typeOfWork": "Create",
        "desc": param.DESC,
        "ot": "false",
        "type": "gantt",
        "phaseWorklog": "47"
    }

  let cookies = `JSESSIONID=${JSESSIONID}, atlassian.xsrf.token=${TOKEN}`;

  let config = {
    method: "get",
    url: "https://jira.fis.com.vn/rest/fis-worklog/1.0/createWorkLog",
    headers: {
      "Cookie": cookies
    },
    params: payload
  };

  return await call_api(config);
}

module.exports = { work_log };