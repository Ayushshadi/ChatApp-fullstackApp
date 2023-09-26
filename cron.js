// cron job file 
const cron = require('node-cron');
const ArchivedChat = require('./models/ArchivedChat');

const cronjob=cron.schedule('* * * * *',async()=>{
    console.log();
});
module.exports={
    cronjob,
};