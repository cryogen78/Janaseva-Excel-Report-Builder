const cron =
require("node-cron");

function startScheduler(){

  cron.schedule(
    "0 9 * * *",
    ()=>{

      console.log(
        "Daily scheduled report"
      );

    }
  );

}

module.exports =
startScheduler;