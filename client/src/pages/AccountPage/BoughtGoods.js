/** @format */

import React from 'react';
import { connectToStore } from '../../utils/workWithRedux';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

const Wrapper = styled.div`
  && .carousel-root {
    outline: none;
    width: 80%;
    margin: 0 auto;
  }
  && .legend {
    opacity: 1 !important;
    background: none !important;
  }
  && .slide img {
    height: 500px;
    width: 500px;
  }
  && .thumb img {
    width: 80px;
    height: 80px;
  }
  .thumbs-wrapper {
    margin: 0;
    overflow: hidden;
    background: whitesmoke;
    text-align: center;
    & ul {
      padding-inline-start: 0px;
    }
  }
`;
const Item = styled.div`
  background-color: black;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`;
const BoughtGoods = ({ userData: { boughtGoods } }) => {
  if (!boughtGoods?.length) {
    return null;
  }

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Мои закзы</h2>
      <Wrapper>
        <Carousel autoPlay>
          {boughtGoods.map(({ previewImg, rating, id }) => (
            <Item key={id}>
              <img alt='good' src={previewImg} />
              <div className='legend'>
                <Flex>
                  <Button variant='contained'>
                    <Link
                      style={{ textDecoration: 'none', color: 'aliceblue' }}
                      to={`/Goods/commodity-${id}`}>
                      Подробнее
                    </Link>
                  </Button>
                  <Rating name='read-only' value={rating} readOnly />
                </Flex>
              </div>
            </Item>
          ))}
        </Carousel>
      </Wrapper>
    </>
  );
};

export default connectToStore(['userData.boughtGoods'], null)(BoughtGoods);
