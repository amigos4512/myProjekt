/** @format */

import React from 'react';
import ChangeCopies from './ChangeCopies';
import Rating from '../../../components/Rating';
import { Paper } from '@mui/material';
import { createValidImgSrc } from '../../../utils/workWithBrowser';
import styled from 'styled-components';

const Img = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: azure;
`;
const BlockDeskription = styled.div`
  text-align: center;
`;
const CartCommudityDetail = ({
  data: { id, imgSrc, title, price, copies, alt, category, rating },
}) => {
  return (
    <>
      <Paper
        className='commodityPage__feedback'
        elevation={3}
        style={{
          backgroundColor: 'aliceblue',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '20px',
          margin: '25px 0',
        }}>
        <Img src={createValidImgSrc(imgSrc)} alt={alt} />
        <BlockDeskription>
          <h3>Категория: {category}</h3>
          <div style={{ margin: '15px 0' }}>
            <Rating userRating={rating} readOnly />
          </div>
          <ChangeCopies commodityId={id} copies={copies} />
          <h3> всего: {price} гр</h3>
        </BlockDeskription>
      </Paper>
    </>
  );
};

export default CartCommudityDetail;
