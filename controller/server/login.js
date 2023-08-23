const setCookieParser = require("set-cookie-parser");
const qs = require("qs");
const { call_api } = require('./call_api');

const login = async (param) => {
    let payload = qs.stringify({
        "os_username": param.OS_USERNAME,
        "os_password": param.OS_PASSWORD
    });

    let config = {
        method: "post",
        url: "https://jira.fis.com.vn/login.jsp",
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: payload
    };
    
    let response = await call_api(config);
    return setCookieParser.parse(response);
}

module.exports = { login };