/** @format */

const Goods = require('../models/Goods');
const Categorys = require('../models/Categorys');
const Users = require('../models/Users');
const {
  createPopuldatedData,
  createArrWithoutCopies,
} = require('./createFuncs');
const { convertArrayForClient } = require('./convertFuncs');

module.exports.updateCommodityRating = async (
  commodity,
  newRating,
  oldRating,
) => {
  await commodity.updateRating(+newRating, +oldRating);
};

module.exports.updateReviewRelatedData = async (review, type = 'create') => {
  const user = (await createPopuldatedData(review, 'userId')).userId,
    commodity = (await createPopuldatedData(review, 'commodityId')).commodityId,
    rating = type === 'create' ? review.rating : 0,
    oldRating = type === 'delete' ? review.rating : 0;

  // Для пользователя нужно увеличивать коллво отзывов только с оценкой, для товара нет
  await user.updateReviewsData(review._id, true);
  if (+rating >= 0 && +rating <= 5) {
    await this.updateCommodityRating(commodity, rating, oldRating);
  }
  await commodity.updateReviewsData(review._id, review.review);
};

module.exports.updateCategoryData = async (
  category,
  commodityId,
  categoryName,
) => {
  if (category) {
    await category.updateCommodityList(commodityId);
  } else {
    const newCategory = new Categorys({
      category: categoryName,
      goods: [commodityId],
      goodsCount: 1,
    });
    await newCategory.save();
  }
};

module.exports.updateGoodsForClient = async (
  arrWithData,
  oldDataForClient = [],
) => {
  let dataForClient = oldDataForClient;
  for (const el of arrWithData) {
    const populatedData = await createPopuldatedData(el, 'goods');
    if (oldDataForClient.length > 0) {
      dataForClient = createArrWithoutCopies(
        convertArrayForClient(populatedData.goods, 'deleteReviews'),
        dataForClient,
      );
    } else {
      dataForClient = createArrWithoutCopies(
        convertArrayForClient(populatedData.goods, 'deleteReviews'),
        dataForClient,
      );
    }
  }
  return dataForClient;
};
