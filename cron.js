//create a milk document for every new day
const CronJob = require('cron').CronJob;
const { refillMilk } = require('./common')
const job = new CronJob(
    '0 0 * * *',
    async function () {
        await refillMilk();
    },
    null,
    true,
    'Asia/Kolkata'
);



