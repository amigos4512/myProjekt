/** @format */

import React, { useEffect } from 'react';
import LoadingIndicator from '../LoadingIndicator';
import Header from '../Header';
import Footer from '../Footer';
import RegistrationPage from '../../pages/RegistrationPage';
import LoginPage from '../../pages/LoginPage';
import GoodsPage from '../../pages/GoodsPage';
import CartPage from '../../pages/CartPage';
import { connectToStore } from '../../utils/workWithRedux';
import { Route, Switch } from 'react-router-dom';
import { getDateFromLocalStorage } from '../../utils/workWithBrowser';
import { chekAccess } from '../../access';
import { isLogin } from '../../actions/userData';
import { loadCart } from '../../actions/shopingCart';
import { fetchGoods } from '../../actions/goodsList';
import { fetchCommodity } from '../../actions/commodityData';
import { createLazyPage } from './utils';
import { DeliveryPage } from '../../pages/DeliveryPage';
import { PaymentPage } from '../../pages/PaymentPage';

const MainPage = createLazyPage('Main'),
  CommodityPage = createLazyPage('Commodity'),
  AccountPage = createLazyPage('Account'),
  AdminPage = createLazyPage('Admin'),
  CreateСommodityPage = createLazyPage('CreateCommodity'),
  UpdateCommodityPage = createLazyPage('UpdateCommodity'),
  HelpLoginPage = createLazyPage('HelpLogin'),
  ResetPasswordPage = createLazyPage('ResetPassword'),
  NotFoundPage = createLazyPage('NotFound');

const App = ({ actions, history }) => {
  useEffect(() => {
    chekAccess(getDateFromLocalStorage('userData'), actions, history);
  }, [actions, history]);

  return (
    <>
      <Header />
      <div style={{ marginTop: '90px' }}>
        <React.Suspense fallback={<LoadingIndicator />}>
          <Switch>
            <Route path='/' component={MainPage} exact />
            <Route
              path='/Goods/commodity-:id'
              component={CommodityPage}
              exact
            />
            <Route path='/Goods/:params?' component={GoodsPage} exact />
            <Route path='/Cart' component={CartPage} exact />
            <Route path='/Login' component={LoginPage} exact />
            <Route path='/Registration' component={RegistrationPage} exact />
            <Route path='/MyAccount' component={AccountPage} exact />
            <Route path='/delivery' component={DeliveryPage} exact />
            <Route path='/payment' component={PaymentPage} exact />
            <Route path='/helpLogin/' component={HelpLoginPage} />
            <Route
              path='/resetPassword/token=:id'
              component={ResetPasswordPage}
              exact
            />
            <Route path='/admin' component={AdminPage} exact />
            <Route
              path='/admin/createCommodity'
              component={CreateСommodityPage}
              exact
            />
            <Route
              path='/admin/updateCommodity/:id'
              component={UpdateCommodityPage}
            />
            <Route component={NotFoundPage} exact />
          </Switch>
        </React.Suspense>
      </div>
      <Footer />
    </>
  );
};

export default connectToStore(null, {
  isLogin,
  loadCart,
  fetchGoods,
  fetchCommodity,
})(App, true);
