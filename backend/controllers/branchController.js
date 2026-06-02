exports.getBranchAnalytics =
(req,res)=>{

  res.json([

    {
      branch:"Borivali",
      uploads:45,
      reports:110
    },

    {
      branch:"Kandivali",
      uploads:35,
      reports:90
    },

    {
      branch:"Malad",
      uploads:22,
      reports:55
    }

  ]);

};