import React from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import { connectToStore } from '../../../utils/workWithRedux';
import { onAddedToCart, onDeletedFromCart } from '../../../actions/shopingCart';

const Input = styled.input`
  text-align: center;
  width: 30px;
`;
const ChangeCopies = ({
  userData: { token },
  actions: { onAddedToCart, onDeletedFromCart },
  copies,
  commodityId,
}) => {
  return (
    <Stack direction='row'>
      <Button
        onClick={() => onDeletedFromCart(commodityId, token)}
        variant='contained'
        color='success'
        endIcon={<RemoveCircleOutlineIcon />}>
        Удалить
      </Button>
      <Input type='text' value={copies} className='formControl' readOnly />
      <Button
        onClick={() => onAddedToCart(commodityId, token)}
        variant='contained'
        color='success'
        startIcon={<AddCircleOutlineIcon />}>
        Добавить
      </Button>
    </Stack>
  );
};

export default connectToStore(['userData.token'], {
  onAddedToCart,
  onDeletedFromCart,
})(ChangeCopies);
