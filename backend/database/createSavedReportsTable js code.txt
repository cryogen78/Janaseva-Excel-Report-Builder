const db =
require("./database");

db.run(
`
CREATE TABLE IF NOT EXISTS saved_reports (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  report_name TEXT,

  report_config TEXT,

  created_by TEXT,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)
`,
(err)=>{

  if(err){

    console.log(err);

  }else{

    console.log(
      "saved_reports ready"
    );

  }

  process.exit();

}
);