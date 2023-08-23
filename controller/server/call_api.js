const axios = require("axios");

const call_api = (config) => {
    try {
        return axios(config);        
    } catch (e) {
        console.log(e);
        return e;
    }
}

module.exports = {call_api};