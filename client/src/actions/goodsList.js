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

const getGoodsServiceMethod = type => {
  const methods = {
    popularGoods: GoodsService.getPopularGoods,
    search: GoodsService.findGoods,
    newGoods: GoodsService.getNewGoods,
    bestGoods: GoodsService.getBestGoods,
    allGoods: GoodsService.getGoods,
  };
  return methods[type] || methods.default;
};

const getDataFromServer = async ({
  type = 'allGoods',
  strForSearch,
  page=1,
  limit=5,
}) => {
  const method = getGoodsServiceMethod(type);
  return await method(strForSearch, page, limit);
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
      const data = await getDataFromServer({
        type: 'search',
        strForSearch: queryForSearch,
        page,
        limit,
      });
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
      const data = await getDataFromServer({
        type: 'popularGoods',
        page,
        limit,
      });
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
      const data = await getDataFromServer({
        type: 'newGoods',
        page,
        limit,
      });
      dispatch(fetchGoodsSuccuess(data));
    } catch (error) {
      dispatch(fetchGoodsFailure());
    }
  };

export const fetchBestGoods = (page = 1, limit = 10) => async dispatch => {
  try {
    dispatch(fetchGoodsRequest());
    const data = await getDataFromServer({
      type: 'bestGoods',
      page,
      limit,
    });
    dispatch(fetchGoodsSuccuess(data));
  } catch (error) {
    dispatch(fetchGoodsFailure());
  }
};
