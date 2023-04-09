
import React, { useState, useEffect } from 'react';
import GoodsList from '../../components/GoodsList';
import Continuation from './Continuations';
import PaginationButtons from '../../components/Pagination';
import { Redirect } from 'react-router';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchGoods } from '../../actions/goodsList';
import { STORE_NAME } from '../../utils/workWithBrowser';
import { ReactTitle } from 'react-meta-tags';
import { useSelector } from 'react-redux';

const GoodsPage = ({ actions: { fetchGoods }, history, limit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector(state => state.goodsList.goods.totalPages);
  const page = useSelector(state => state.goodsList.goods.currentPage); 
  const location = history.location;
  const path = location.pathname;

  useEffect(() => {
    const configDataForAction = { page: currentPage };
    fetchGoods(configDataForAction);
  }, [currentPage, fetchGoods]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  let pageHeader = null,
    configDataForAction = null,
    ComponentWithoutData = null;

  if (path === '/Goods') {
    configDataForAction = { type: 'default' };
  } else if (path === '/Goods/new') {
    configDataForAction = { type: 'newGoods' };
    pageHeader = <h2>Горячие новинки !</h2>;
  } else if (path === '/Goods/popular') {
    configDataForAction = { type: 'popularGoods' };
    pageHeader = <h2>Самые популярные товары !</h2>;
  } else if (path.includes('/Goods/search=')) {
    const query = path.split('=')[1];
    configDataForAction = { type: 'search', strForSearch: query };
    pageHeader = <h2>Результаты поиска по запросу "{query}"</h2>;
    ComponentWithoutData = () => (
      <h2>Извините, но по запросу "{query}" ничего небыло найдено</h2>
    );
  } else {
    return <Redirect to='/Goods' />;
  }

  
  return (
    <div className="goodsPage">
      <ReactTitle title={`${STORE_NAME} | товары `} />
      {pageHeader}
      <div className="goodsPage__content">
        <GoodsList
          action={() => fetchGoods({ page: currentPage, limit: limit })}
          ComponentWithoutData={ComponentWithoutData}
        />
      </div>
      { page > 0 & configDataForAction.type !== 'search' ? (
      <PaginationButtons
        totalPages={totalPages}
        page={parseInt(page)}
        onPageChange={handlePageChange}
      />) : ('')}
      <Continuation actionType={configDataForAction?.type} />
    </div>
  );
};

export default connectToStore(null, { fetchGoods })(GoodsPage);
