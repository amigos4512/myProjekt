/** @format */

const errorHandler = require('../utils/errorHandler');
const { Goods} = require('../models/Goods')
const Users = require('../models/Users');
const Reviews = require('../models/Reviews.js');
const Categorys = require('../models/Categorys');
const {
  createDataUpdateObj,
  createArrWithoutCopies,
  createPopuldatedData,
} = require('../utils/createFuncs');
const { deleteFile, getValidFileName } = require('../utils/workWithFiles');
const {
  updateCategoryData,
  updateGoodsForClient,
} = require('../utils/updateFuncs');
const {
  convertArrayForClient,
  convertDataForClient,
} = require('../utils/convertFuncs');

const findGoods = (page = 1, limit = 10, sortedParams = null) => {
  const offset = (page - 1) * limit;
  return Goods.find()
    .sort(sortedParams)
    .skip(offset)
    .limit(limit);
};

module.exports.getGoods = async ({ query: { page = 1, limit = 10 } }, res) => {
  try {
    const goodsQuery = findGoods(page, limit).limit(Number.parseInt(limit));
    const count = await Goods.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const goods = await goodsQuery.exec();

    res.json({
      totalPages,
      currentPage: page,
      goods: convertArrayForClient(goods, 'deleteReviews')
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.bestGoods = async ({ query: { page = 1, limit = 10 } }, res) => {
  try {
    const goodsQuery = findGoods(page, limit).limit(Number.parseInt(limit), { 'rating.general': -1 });
    const count = await Goods.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const goods = await goodsQuery.exec();

    res.json({
      totalPages,
      currentPage: page,
      goods: convertArrayForClient(goods, 'deleteReviews')
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.newGoods = async ({ query: { page = 1, limit = 10 } }, res) => {
  try {
    const goodsQuery = findGoods(page, limit).limit(Number.parseInt(limit), { createdDate: -1});
    const count = await Goods.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const goods = await goodsQuery.exec();
    res.json({
      totalPages,
      currentPage: page,
      goods: convertArrayForClient(goods, 'deleteReviews')
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.popularGoods = async ({ query: { page = 1, limit = 10 } }, res) => {
  try {
    const goodsQuery = findGoods(page, limit).limit(Number.parseInt(limit), { countReviews: -1 });
      const count = await Goods.countDocuments();
      const totalPages = Math.ceil(count / limit);
      const goods = await goodsQuery.exec();
      res.json({
        totalPages,
        currentPage: page,
        goods: convertArrayForClient(goods, 'deleteReviews')
      });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getCategorys = async (req, res) => {
  try {
    const categorys = (await Categorys.find({}, 'category')).map(
      ({ category }) => ({ value: category }),
    );
    res.json(categorys);
  } catch (error) {
    errorHandler(res, error);
  }
};


module.exports.findGoods = async ({ query: { q, page = 1, limit = 10 } }, res) => {
  try {
    if (typeof q !== 'string') {
      throw new Error('Invalid search query');
    }

    const goodsQuery = Goods.find({ title: { $regex: q, $options: 'i' } }).skip((page - 1) * limit).limit(Number.parseInt(limit));
    const count = await Goods.countDocuments();
    const totalPages = Math.ceil(count / limit);
    let goods = await goodsQuery.exec();
    
    const goodsData = await Goods.find({ title: { $regex: q, $options: 'i' } }),
      categorysData = await Categorys.find({
        category: { $regex: q, $options: 'i' },
      });

    if (goodsData.length > 0) {
      goods = createArrWithoutCopies(
        convertArrayForClient(goodsData, 'deleteReviews'),
        goods,
      );
    }
    if (categorysData.length > 0) {
      goods = await updateGoodsForClient(categorysData, goods);
    }
    
    res.json({
      totalPages,
      currentPage: page,
      goods: goods.slice((page - 1) * limit, page * limit),
    });
  } catch (error) {
    errorHandler(res, error);
  }
};


module.exports.getSimilarGoods = async ({ params: { id } }, res) => {
  try {
    const commodity = await Goods.findById(id);
    let similarGoods = [];
    res.json(convertArrayForClient(similarGoods));
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.findCommodity = async ({ params: { id } }, res) => {
  try {
    const commodity = await Goods.findById(id);
    if (commodity.reviews.length) {
      const commodityWithReview = await createPopuldatedData(
        commodity,
        'reviews',
      );
      await createPopuldatedData(commodityWithReview, 'reviews.userId');
      commodity.reviews.reverse();
    }
    res.status(200).json(convertDataForClient(commodity.toObject()));
  } catch (error) {
    errorHandler(res, { message: `Товар с id:${id} не найден!` });
  }
};

module.exports.createCommodity = async (
  {
    body: {
      title,
      shortDescr,
      descr,
      price,
      previewImgAlt,
      previewImgId,
      category,
      imgAlt = null,
      imgId = null,
    },
    files,
  },
  res,
) => {
  try {
    const newCommodity = new Goods({
      category,
      title,
      shortDescr,
      descr,
      previewImg: {
        previewImgSrc: files.previewImg[0].path,
        previewImgAlt,
        previewImgId,
      },
      price,
      img: files?.img
        ? {
            imgSrc: files.img[0].path,
            imgAlt,
            imgId,
          }
        : null,
    });
    if (!category) {
      errorHandler(res, { message: 'Ошибка создания товара' });
      return;
    }
    await newCommodity.save();
    const categoryData = await Categorys.findOne({ category });
    await updateCategoryData(categoryData, newCommodity._id, category);
    res.json({ message: 'Товар был успешно добавлен!' });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.updateCommodity = async (
  { body, params: { id }, files },
  res,
) => {
  try {
    const newFiles = {
        previewImg: files?.previewImg,
        img: files?.img,
      },
      oldCommodityData = await Goods.findById(id),
      dataForUpdate = createDataUpdateObj(body, newFiles, oldCommodityData),
      { previewImg, img } = oldCommodityData;

    await Goods.updateOne({ _id: id }, dataForUpdate);
    res.status(200).json({ message: `товар с id:${id} обновлен` });
    if (dataForUpdate?.price) {
      const owners = await Users.find({ 'cart.cartItems.commodityId': id });
      owners.forEach(
        async owner => await owner.updateCartPrices(dataForUpdate.price, id),
      );
    }
    if (dataForUpdate?.category) {
      const oldCategory = await Categorys.findOne({ goods: id }),
        newCategory = await Categorys.findOne({
          category: dataForUpdate.category,
        });
      await oldCategory.updateCommodityList(id);
      await updateCategoryData(newCategory, id, dataForUpdate.category);
    }
    if (newFiles?.img && img.imgSrc) {
      deleteFile(getValidFileName(img.imgSrc));
    }
    if (newFiles?.previewImg && previewImg.previewImgSrc) {
      deleteFile(getValidFileName(previewImg.previewImgSrc));
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.removeCommodity = async ({ params: { id } }, res) => {
  try {
    const oldCommodityData = await Goods.findByIdAndDelete(id);
    res.status(200).json({ message: `товар с id:${id} удален` });
    await Reviews.deleteMany({ commodityId: id });
    (category = await Categorys.findOne({ goods: id })),
      await category.updateCommodityList(id);
    if (oldCommodityData?.img?.imgSrc) {
      deleteFile(getValidFileName(oldCommodityData.img.imgSrc));
    }
    if (oldCommodityData?.previewImg?.previewImgSrc) {
      deleteFile(getValidFileName(oldCommodityData.previewImg.previewImgSrc));
    }
  } catch (error) {
    errororHandler(res, error);
  }
};
