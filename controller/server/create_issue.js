const { call_api } = require('./call_api');
const PID = process.env.PID;
const COMPONENTS_ID = process.env.COMPONENTS_ID;
const FORM_TOKEN = process.env.FORM_TOKEN;

var ISSUE_ID = '';
var ISSUE_KEY = '';

const create_issue = async (param) => {        
    let JSESSIONID = param.COOKIE[0]["value"];
    let TOKEN = param.COOKIE[1]["value"];
    
    let payload = {
        "pid": PID,
        "issuetype": "3",
        "atl_token": TOKEN,
        "formToken": FORM_TOKEN,
        "summary": param.DESC,
        "security": "10200",
        "customfield_10700": "",
        "customfield_11202": "",
        "customfield_10800": "",
        "components": COMPONENTS_ID,
        "priority": "2",
        "assignee": param.USER_ASSIGN,
        "reporter": "HungNV67",
        "customfield_10103": param.DATE + "/" + param.MONTH + "/" + param.YEAR,
        "duedate": param.DATE + "/" + param.MONTH + "/" + param.YEAR,
        "customfield_10306": "1d",
        "dnd-dropzone": "",
        "customfield_12400": "",
        "fieldsToRetain": "project",
        "fieldsToRetain": "issuetype",
        "fieldsToRetain": "security",
        "fieldsToRetain": "customfield_10700",
        "fieldsToRetain": "customfield_11202",
        "fieldsToRetain": "customfield_10800",
        "fieldsToRetain": "components",
        "fieldsToRetain": "priority",
        "fieldsToRetain": "assignee",
        "fieldsToRetain": "reporter",
        "fieldsToRetain": "customfield_10103",
        "fieldsToRetain": "duedate",
        "fieldsToRetain": "customfield_10306",
        "fieldsToRetain": "labels",
        "fieldsToRetain": "customfield_12400"
    }

    let cookies = `JSESSIONID=${JSESSIONID}, atlassian.xsrf.token=${TOKEN}`;
    
    let config = {
        method: "post",
        url: "https://jira.fis.com.vn/secure/QuickCreateIssue.jspa?decorator=none",
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie": cookies
        },
        data: payload
    };    
    
    let response = await call_api(config);    
    ISSUE_ID = response.data.createdIssueDetails.id;
    ISSUE_KEY = response.data.createdIssueDetails.key;

    return {ISSUE_ID, ISSUE_KEY}
}

module.exports = { create_issue };
