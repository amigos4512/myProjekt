/** @format */

import React
 from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';
import { connectToStore } from '../../utils/workWithRedux';
import { loadMoreGoods } from '../../actions/goodsList';

const Continuation = ({
  goodsList: { updateGoods, goods}
}) => {
  
  return (
    <div className={`continuation ${goods?.goods?.length ? '' : 'hiddenElem'}`}>
      {updateGoods ? <LoadingIndicator /> : null}
    </div>
  );
};

export default connectToStore(['goodsList'], { loadMoreGoods })(Continuation);
