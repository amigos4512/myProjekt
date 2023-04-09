/** @format */

const errorHandler = require('../utils/errorHandler');
const Categorys = require('../models/Categorys');
const { deleteFile, getValidFileName } = require('../utils/workWithFiles');

module.exports.createCategory = async (
  { body: { category, aboutCategory = null }, file },
  res,
) => {
  try {
    const newCategory = new Categorys({
      category,
      categoryImg: file.path,
      aboutCategory: !aboutCategory ? null : aboutCategory,
    });
    await newCategory.save();
    res.status(201).json({ message: `Создана новая категория - ${category}` });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.updateCategory = async ({ body, params: { id }, file }, res) => {
  try {
    const newCategoryImgSrc = {};
    if (file) {
      newCategoryImgSrc.CategoryImg = file.path;
    }
    const oldCategoryData = await Category.findByIdAndUpdate(id, {
      ...body,
      ...newCategoryImgSrc,
    });
    res
      .status(200)
      .json({ message: `Данные о категории с ID: ${id} обновлены` });
    if (
      file &&
      getValidFileName(oldCategoryData.сategoryImg) !== 'defaultCategoryImg.png'
    ) {
      deleteFile(getValidFileName(oldCategoryData.сategoryImg));
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
