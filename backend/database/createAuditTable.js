const db =
require("./database");

db.run(
`
CREATE TABLE IF NOT EXISTS audit_logs(

 id INTEGER PRIMARY KEY AUTOINCREMENT,

 username TEXT,

 action TEXT,

 created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)
`,
(err)=>{

 console.log(
   err || "audit ready"
 );

 process.exit();

}
);