const { call_api } = require('./call_api');

const complete = async (param) => {
    let JSESSIONID = param.COOKIE[0]["value"];
    let TOKEN = param.COOKIE[1]["value"];

    let payload = {
        "id": param.ISSUE_ID, 
        "action": "21",
        "atl_token": TOKEN,
        "decorator": "dialog",
        "inline": "true"
    }

    let cookies = `JSESSIONID=${JSESSIONID}, atlassian.xsrf.token=${TOKEN}`;

    let config = {
        method: "get",
        url: "https://jira.fis.com.vn/secure/WorkflowUIDispatcher.jspa",
        headers: { 
          "Cookie": cookies
        },
        params: payload
    };    
   
    return await call_api(config);
}

module.exports = { complete };
