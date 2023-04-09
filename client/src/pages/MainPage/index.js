/** @format */

import React from 'react';
import GoodsList from '../../components/GoodsList';
import { fetchGoods } from '../../actions/goodsList';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import { scrollToTop, STORE_NAME } from '../../utils/workWithBrowser';
import { ReactTitle } from 'react-meta-tags';
import Carousel from './Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MainPage = ({ actions: { fetchGoods } }) => {
  return (
    <div className='mainPage'>
      <ReactTitle title={`${STORE_NAME} | Главная`} />
      <Carousel />
      <div>
        <GoodsList
          typePage='Main'
          action={() => fetchGoods({ type: 'bestGoods', limit: 10,page: 1, })}
        />
        <Link to='/Goods' onClick={() => scrollToTop()}>
          Больше товаров
        </Link>
      </div>
    </div>
  );
};

export default connectToStore(null, { fetchGoods })(MainPage);
