/** @format */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const {
  updateRating,
  updateReviewsData,
  increaseCountReviews,
} = require('../utils/modelMethods');

const Schema = mongoose.Schema;

const goodsSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  shortDescr: {
    type: String,
    maxlength: 300,
    required: true,
  },
  descr: {
    type: String,
    required: true,
  },
  previewImg: {
    previewImgSrc: {
      type: String,
      required: true,
    },
    previewImgAlt: {
      type: String,
      required: true,
    },
    previewImgId: {
      type: String,
    },
  },
  img: {
    imgSrc: {
      type: String,
    },
    imgAlt: {
      type: String,
    },
    imgId: {
      type: String,
    },
  },
  imgs: [
    {
      imgsSrc: {
        type: String,
      },
      imgsAlt: {
        type: String,
      },
      imgsId: {
        type: String,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  rating: {
    general: {
      type: Number,
      default: 0,
    },
    fiveStars: {
      type: Number,
      default: 0,
    },
    fourStars: {
      type: Number,
      default: 0,
    },
    threeStars: {
      type: Number,
      default: 0,
    },
    twoStars: {
      type: Number,
      default: 0,
    },
    oneStar: {
      type: Number,
      default: 0,
    },
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reviews',
    },
  ],
  countReviews: {
    type: Number,
    default: 0,
  },
});

goodsSchema.plugin(mongoosePaginate);

goodsSchema.methods.updateRating = updateRating;
goodsSchema.methods.updateReviewsData = updateReviewsData;
goodsSchema.methods.increaseCountReviews = increaseCountReviews;

const Goods = mongoose.model('Goods', goodsSchema);

const findGoods = async (offset, limit, sortedParams = null) => {
  return await Goods.find().sort(sortedParams).paginate({}, { offset: offset, limit: limit });
};

const convertArrayForClient = (arr, method) => {
  return arr.map((item) => item[method]());
};

const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ message: 'Server Error' });
};

const getGoods = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const goods = await findGoods(offset, limit);
    res.json(convertArrayForClient(goods.docs, 'deleteReviews'));
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  Goods,
  getGoods,
};

