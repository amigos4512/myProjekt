/** @format */

import GoodsService from '../services/GoodsService';
import { createAction } from '../utils/workWithRedux';
import {
  FETCH_GOODS_REQUEST,
  FETCH_GOODS_FAILURE,
  FETCH_GOODS_SUCCUESS,
  UPDATE_GOODS_REQUEST,
  UPDATE_GOODS_SUCCUESS,
} from './types';

const fetchGoodsRequest = () => createAction(FETCH_GOODS_REQUEST);

const fetchGoodsFailure = () => createAction(FETCH_GOODS_FAILURE);

const updateGoodsRequest = () => createAction(UPDATE_GOODS_REQUEST);

const updateGoodsSuccuess = goods => createAction(UPDATE_GOODS_SUCCUESS, goods);

export const fetchGoodsSuccuess = goods =>
  createAction(FETCH_GOODS_SUCCUESS, goods);

const getDataFromServer = async ({
  type = 'default',
  strForSearch,
  page=1,
  limit=5,
}) => {
  switch (type) {
    case 'popularGoods':
      return await GoodsService.getPopularGoods(page,  limit);

    case 'search':
      return await GoodsService.findGoods(strForSearch, page, limit);

    case 'newGoods':
      return await GoodsService.getNewGoods(page, limit);

    case 'bestGoods':
      return await GoodsService.getBestGoods(page, limit);

    default:
      return await GoodsService.getGoods(page, limit);
  }
};



export const fetchGoods = configData => async dispatch => {
  try {
    dispatch(fetchGoodsRequest());
    const data = await getDataFromServer({ ...configData });
    dispatch(fetchGoodsSuccuess(data));
  } catch (error) {
    dispatch(fetchGoodsFailure());
  }
};

export const loadMoreGoods = configData => async dispatch => {
  try {
    dispatch(updateGoodsRequest());
    const newGoods = await getDataFromServer(configData);
    dispatch(updateGoodsSuccuess(newGoods));
    return newGoods.length;
  } catch (error) {
    dispatch(fetchGoodsFailure());
  }
};

export const searchGoods =
  (queryForSearch, page = 1, limit = 10) =>
  async dispatch => {
    try {
      dispatch(fetchGoodsRequest());
      const data = await GoodsService.findGoods(queryForSearch, page, limit);
      dispatch(fetchGoodsSuccuess(data));
    } catch (error) {
      dispatch(fetchGoodsFailure());
    }
  };

export const fetchPopularGoods =
  (page = 1, limit = 10) =>
  async dispatch => {
    try {
      dispatch(fetchGoodsRequest());
      const data = await GoodsService.getPopularGoods(page, limit);
      dispatch(fetchGoodsSuccuess(data));
    } catch (error) {
      dispatch(fetchGoodsFailure());
    }
  };

export const fetchNewGoods =
  (page  = 1, limit = 10) =>
  async dispatch => {
    try {
      dispatch(fetchGoodsRequest());
      const data = await GoodsService.getNewGoods(page, limit);
      dispatch(fetchGoodsSuccuess(data));
    } catch (error) {
      dispatch(fetchGoodsFailure());
    }
  };

export const fetchBestGoods = (page = 1, limit = 10) => async dispatch => {
  try {
    dispatch(fetchGoodsRequest());
    const data = await GoodsService.getBestGoods(page, limit);
    dispatch(fetchGoodsSuccuess(data));
  } catch (error) {
    dispatch(fetchGoodsFailure());
  }
};
