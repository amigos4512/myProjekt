/** @format */

const { Router } = require('express');
const authAdmin = require('../middlewares/authAdmin.middleware');
const uploadFile = require('../middlewares/uploadFile.middleware');
const controller = require('../controllers/categorys');

const router = Router();

router.post(
  '/createCategory',
  authAdmin,
  uploadFile.single('categoryImg'),
  controller.createCategory,
);

router.patch(
  '/updateCategory/:id',
  authAdmin,
  uploadFile.single('categoryImg'),
  controller.updateCategory,
);

module.exports = router;
