/** @format */

import React from 'react';
import LoadingData from '../LoadingData';
import Configurate from './Configurate';
import { connectToStore } from '../../utils/workWithRedux';
import styled from 'styled-components';

const GoodList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
  justify-content: space-between;
`;

const GoodsList = ({
  goodsList: { goods, loading, error },
  history,
  action,
  typePage = 'GoodsPage',
  ComponentWithoutData = null,
}) => {
  const location = history.location;
  return (
    <LoadingData
      configData={{
        loading,
        error,
        funcForRender:
          goods.length || (history.action === 'PUSH' && !location.state)
            ? null
            : action,
        routeForRedirect: '/',
      }}>
      <GoodList>
        <Configurate
          typePage={typePage}
            goods={goods}
          ComponentWithoutData={ComponentWithoutData}
        />
      </GoodList>
    </LoadingData>
  );
};

export default connectToStore(['goodsList'], null)(GoodsList, true);
