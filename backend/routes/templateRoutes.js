const express = require('express');

const router = express.Router();

const {

  saveTemplate,
  getTemplates,
  deleteTemplate

} = require('../controllers/templateController');

/*
|--------------------------------------------------------------------------
| SAVE
|--------------------------------------------------------------------------
*/

router.post(
  '/save',
  saveTemplate
);

/*
|--------------------------------------------------------------------------
| GET ALL
|--------------------------------------------------------------------------
*/

router.get(
  '/',
  getTemplates
);

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

router.delete(
  '/:id',
  deleteTemplate
);

module.exports = router;