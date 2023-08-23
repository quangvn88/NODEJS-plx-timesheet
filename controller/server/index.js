const { login } = require("./login");
const { create_issue } = require("./create_issue");
const { in_progress } = require("./in_progress");
const { work_log } = require("./work_log");
const { complete } = require("./complete");

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'short',
    });
  }

const isWeekend = (date) => {
    return date.getDay() == 0 || date.getDay() == 6;
}

const create_ts = async (req, res, next) => {
    let fdate = req.body.fdate;
    let tdate = req.body.tdate;
    let OS_USERNAME = req.body.user;
    let OS_PASSWORD = req.body.pass;
    let MONTH = getMonthName(req.body.month);
    let YEAR = req.body.year;    
    let USER_ASSIGN = OS_USERNAME;
        
    let i = fdate;
    while (i <= tdate) {  
        let date = new Date(`${i}-${MONTH}-${YEAR} 07:00:00:000000000 AM`);     
        if (isWeekend(date)) {
            i++;    
            continue;
        }

        let DESC = `Hỗ trợ PLX ngày ${i}/${MONTH}/${YEAR}`;
        let data = {};    
        let COOKIE = "";
        let ISSUE_ID = "";
        let ISSUE_KEY = "";

        try {   
            res.clearCookie("JSESSIONID");
            res.clearCookie("atlassian.xsrf.token");  

            //LOGIN
            COOKIE = await login({OS_USERNAME, OS_PASSWORD});

            //CREATE ISSUE
            data = await create_issue({COOKIE, DATE: i, MONTH, YEAR, DESC, USER_ASSIGN});
            ISSUE_ID = data.ISSUE_ID;
            ISSUE_KEY = data.ISSUE_KEY;            
            
            //IN PROGRESS
            await in_progress({COOKIE, ISSUE_ID});

            //WORK LOG
            let START_DATE = Date.parse(date);
            await work_log({COOKIE, ISSUE_KEY, USER_ASSIGN, START_DATE, DESC});         
            
            //COMPLETE
            await complete({COOKIE, ISSUE_ID});
        } catch (e) {
            console.log(e);
            res.status(400).json({success: false});
            return;
        }

        i++;    
    }    

    res.status(200).json({success: true});
}

module.exports = { create_ts }