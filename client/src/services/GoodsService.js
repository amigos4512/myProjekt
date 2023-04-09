/** @format */

import BaseApiClass from './BaseApiClass';

class GoodsService extends BaseApiClass {
  getGoods = async (page = 1, limit = 10) => {
    return await this.requestToApi(
      'GET',
      `getGoods?page=${page}&limit=${limit}`,
      null
    );
  };

  loadCart = async token => {
    return await this.requestToApi(
      'GET',
      'getUserCart',
      null,
      this.headerWithToken(token)
    );
  };

  addToCart = async (id, token) => {
    return await this.requestToApi(
      'PATCH',
      `addToCart/${id}`,
      null,
      this.headerWithToken(token)
    );
  };

  removeFromCart = async (id, token) => {
    return await this.requestToApi(
      'DELETE',
      `removeFromCart/${id}`,
      null,
      this.headerWithToken(token)
    );
  };

  getCommodity = async (id, token) => {
    return await this.requestToApi(
      'GET',
      `findCommodity/${id}`,
      null,
      this.headerWithToken(token)
    );
  };

  updateCommodity = async (id, data, token) => {
    return await this.requestToApi(
      'PATCH',
      `updateCommodity/${id}`,
      data,
      this.headerWithToken(token)
    );
  };

  createCommodity = async (data, token) => {
    return await this.requestToApi(
      'POST',
      'createCommodity',
      data,
      this.headerWithToken(token)
    );
  };

  removeCommodity = async (id, token) => {
    return await this.requestToApi(
      'DELETE',
      `removeCommodity/${id}`,
      null,
      this.headerWithToken(token)
    );
  };

  findGoods = async (q, page, limit) => {
    return await this.requestToApi(
      'GET',
      `findGoods?q=${q}&page=${page}&limit=${limit}`,
      null
    );
  };

  getPopularGoods = async (page, limit) => {
    return await this.requestToApi(
      'GET',
      `popularGoods?page=${page}&limit=${limit}`,
      null
    );
  };

  getNewGoods = async (page, limit) => {
    return await this.requestToApi(
      'GET',
      `newGoods?page=${page}&limit=${limit}`,
      null
    );
  };

  getBestGoods = async (page, limit) => {
    return await this.requestToApi(
      'GET',
      `bestGoods?page=${page}&limit=${limit}`,
      null
    );
  };

  getSimilarGoods = async commodityId => {
    return await this.requestToApi(
      'GET',
      `getSimilarGoods/${commodityId}`,
      null
    );
  };

  createReview = async (data, token) => {
    return await this.requestToApi(
      'POST',
      'createReview',
      data,
      this.headerWithToken(token)
    );
  };

  updateReview = async (id, data, token) => {
    return await this.requestToApi(
      'PATCH',
      `updateReview/${id}`,
      data,
      this.headerWithToken(token)
    );
  };

  removeReview = async (id, token) => {
    return await this.requestToApi(
      'DELETE',
      `removeReview/${id}`,
      null,
      this.headerWithToken(token)
    );
  };

  getCategorys = async token => {
    return await this.requestToApi(
      'GET',
      'getCategorys',
      null,
      this.headerWithToken(token)
    );
  };
}

export default new GoodsService();
