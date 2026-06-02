exports.getCharts =
(req,res)=>{

  res.json({

    uploadsPerMonth:[
      12,
      22,
      30,
      42,
      55
    ],

    reportsPerMonth:[
      8,
      14,
      20,
      31,
      50
    ]

  });

};