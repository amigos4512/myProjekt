/** @format */

const { Schema, model } = require('mongoose');
const path = require('path');
const { updateCommodityList } = require('../utils/modelMethods');

const categorys = new Schema({
  category: {
    type: String,
    required: true,
  },
  aboutCategory: {
    type: String,
  },
  categoryImg: {
    type: String,
    default: path.join('static', 'defaultCategoryImg.png'),
  },
  goods: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Goods',
      required: true,
    },
  ],
  goodsCount: {
    type: Number,
    default: 0,
  },
});

categorys.methods.updateCommodityList = updateCommodityList;

module.exports = model('Categorys', categorys);
