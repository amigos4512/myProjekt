import React from 'react';
import { connectToStore } from '../../utils/workWithRedux';
import { buyGoods } from '../../actions/shopingCart';
import Button from '@mui/material/Button';

const FullPrice = ({
  shopingCart: { totalPrice },
  userData: { token },
  actions: { buyGoods },
  history,
}) => {
  if (!totalPrice) {
    return null;
  }
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h3>Общая стоимость: {totalPrice} гр </h3>
        <Button
          variant='contained'
          onClick={async e => {
            e.persist();
            e.preventDefault();
            const elem = e.target;
            elem.disabled = true;
            await buyGoods(token, history);
            elem.disabled = false;
          }}>
          Оплатить
        </Button>
      </div>
    </>
  );
};

export default connectToStore(['shopingCart.totalPrice', 'userData.token'], {
  buyGoods,
})(FullPrice, true);
