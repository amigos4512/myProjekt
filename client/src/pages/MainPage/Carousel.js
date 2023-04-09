import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

const Wrapper = styled.div`
  && .carousel-root {
    outline: none;
    width: 80%;
    margin: 0 auto;
  }
  && .slide img {
    height: 500px;
  }
  && .carousel .thumbs-wrapper {
    display: none;
  }
`;

export default () => (
  <Wrapper>
    <Carousel autoPlay>
      <div>
        <img alt='' src='/static/slide1.jpg' />
        <div className='legend'>
          <h2>Fish@ka.com</h2>
          <h4>Ваш любимый магазин</h4>
        </div>
      </div>
      <div>
        <img alt='' src='/static/slide2.jpg' />
        <div className='legend'>
          <h2>Fish@ka.com</h2>
          <h4>Ваш любимый магазин</h4>
        </div>
      </div>
      <div>
        <img alt='' src='/static/slide3.jpg' />
        <div className='legend'>
          <h2>Fish@ka.com</h2>
          <h4>Ваш любимый магазин</h4>
        </div>
      </div>
    </Carousel>
  </Wrapper>
);
