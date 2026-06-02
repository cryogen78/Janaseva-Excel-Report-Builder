const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

/*
|--------------------------------------------------------------------------
| MIDDLEWARE
|--------------------------------------------------------------------------
*/

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

/*
|--------------------------------------------------------------------------
| STATIC FILES
|--------------------------------------------------------------------------
*/

app.use(
    '/uploads',
    express.static(
        path.join(__dirname, 'uploads')
    )
);

/*
|--------------------------------------------------------------------------
| ROUTES
|--------------------------------------------------------------------------
*/

const authRoutes =
    require('./routes/authRoutes');

const uploadRoutes =
    require('./routes/uploadRoutes');

const reportRoutes =
    require('./routes/reportRoutes');

const templateRoutes =
    require('./routes/templateRoutes');

const dashboardRoutes =
    require('./routes/dashboardRoutes');

const analyticsRoutes =
    require('./routes/analyticsRoutes');

const userRoutes =
    require('./routes/userRoutes');

const historyRoutes =
require(
  "./routes/historyRoutes"
);

const savedReportRoutes =
require("./routes/savedReportRoutes");

const chartRoutes =
require("./routes/chartRoutes");

const branchRoutes =
require("./routes/branchRoutes");

/*
|--------------------------------------------------------------------------
| API ROUTES
|--------------------------------------------------------------------------
*/

app.use(
    '/api/auth',
    authRoutes
);

app.use(
    '/api/upload',
    uploadRoutes
);

app.use(
    '/api/reports',
    reportRoutes
);

app.use(
    '/api/templates',
    templateRoutes
);

app.use(
    '/api/dashboard',
    dashboardRoutes
);

app.use(
    '/api/analytics',
    analyticsRoutes
);

app.use(
  '/api/users',
  userRoutes
);

app.use(
  "/api/history",
  historyRoutes
);

app.use(
  "/api/saved-reports",
  savedReportRoutes
);

app.use(
  "/api/charts",
  chartRoutes
);

app.use(
  "/api/branches",
  branchRoutes
);

/*
|--------------------------------------------------------------------------
| HEALTH CHECK
|--------------------------------------------------------------------------
*/

app.get('/', (req, res) => {

    res.status(200).json({

        application:
            'Janaseva Sahakari Bank Excel Report Builder',

        version: '1.0.0',

        status: 'Running'

    });

});

/*
|--------------------------------------------------------------------------
| 404 HANDLER
|--------------------------------------------------------------------------
*/

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: 'Route not found'

    });

});

/*
|--------------------------------------------------------------------------
| ERROR HANDLER
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        success: false,

        message: err.message ||
            'Internal Server Error'

    });

});

module.exports = app;