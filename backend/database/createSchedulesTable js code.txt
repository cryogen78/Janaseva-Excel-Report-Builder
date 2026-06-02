const db =
require("./database");

db.run(
`
CREATE TABLE IF NOT EXISTS schedules(

 id INTEGER PRIMARY KEY AUTOINCREMENT,

 report_name TEXT,

 cron_expression TEXT,

 created_by TEXT,

 status TEXT DEFAULT 'ACTIVE'

)
`,
(err)=>{

 if(err){

   console.log(err);

 }else{

   console.log(
     "schedules ready"
   );

 }

 process.exit();

}
);