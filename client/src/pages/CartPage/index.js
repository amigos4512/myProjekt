import React, { useEffect } from 'react';
import ListView from '../../components/ListView';
import CartCommudityDetail from './CartCommodityDetail';
import LoadingData from '../../components/LoadingData';

import { fetchGoods } from '../../actions/goodsList';
import { connectToStore } from '../../utils/workWithRedux';
import { redirectToPage, STORE_NAME } from '../../utils/workWithBrowser';
import FullPrice from './FullPrice';
import { ReactTitle } from 'react-meta-tags';

const CartPage = ({
  shopingCart: { totalPrice, cart, loading, updatedPrice },
  userData: { userName },
  goodsList: { goods },
  actions: { fetchGoods },
  history,
}) => {
  useEffect(() => {
    if (userName === 'admin') {
      redirectToPage(history, '/admin');
    }
  }, [userName, history]);

  useEffect(() => {
    if (updatedPrice) {
      alert('Внимание, цены на товары в вашей корзине поменялись');
    }
  }, [updatedPrice]);

  return (
    <div className='cartPage' style={{ minHeight: '72vh' }}>
      <ReactTitle title={`${STORE_NAME} | Корзина`} />
      <LoadingData
        configData={{
          loading: userName ? false : loading,
          error: null,
          funcForRender: goods?.goods?.length ? null : fetchGoods,
        }}>
        <h4 style={{ textAlign: 'center' }}>Ваш список товаров</h4>
        <ListView
          listForRender={cart}
          ComponentForRender={CartCommudityDetail}
          ComponentWithoutData={() => <h3>Вы еще ничего не выбрали</h3>}
          history={history}
        />
        <FullPrice totalPrice={totalPrice} />
      </LoadingData>
    </div>
  );
};


export default connectToStore(
  ['shopingCart', 'userData.userName', 'goodsList'],
  { fetchGoods }
)(CartPage);
