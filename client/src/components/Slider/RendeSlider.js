/** @format */

import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ListView from '../ListView';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import {
  faAngleRight,
  faAngleLeft,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { redirectToSlideLink } from './utils';
import { createValidImgSrc } from '../../utils/workWithBrowser';

const RendeSlider = ({
  position,
  slideWidth,
  content,
  nextBtnClick,
  prevBtnClick,
  dotClick,
  setDotClass,
  history,
  hasDots,
  classNames,
  notDescr,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '100%',
        },
      }}>
      <Paper elevation={3}>
        <Wrapper>
          <div className={classNames.slider ?? 'slider'}>
            <div className='slider__wrapper'>
              <div
                className='slider__track'
                style={{ transform: `translateX(${position}%)` }}>
                <ListView
                  listForRender={content}
                  ComponentForRender={({
                    data: {
                      slideImgSrc,
                      slideLink,
                      elIndex,
                      slideDetail = null,
                    },
                  }) => (
                    <div
                      className={
                        classNames.sliderItem ??
                        'slider__item flexWrapColumn_center'
                      }
                      style={{
                        minWidth: `${slideWidth}%`,
                        maxWidth: `${slideWidth}%`,
                      }}>
                      <div
                        className={
                          classNames.sliderItemImgWrapper ??
                          'slider__item-imgWrapper'
                        }>
                        <img
                          src={createValidImgSrc(slideImgSrc)}
                          alt={`slide${elIndex + 1}`}
                        />
                      </div>
                      {slideDetail ? (
                        <div className='slider__item-moreInfo flexWrap'>
                          <div>
                            <FontAwesomeIcon icon={faStar} />{' '}
                            <span style={{ color: 'black' }}>
                              {slideDetail.rating}
                            </span>
                          </div>
                          <ReadMoreOutlinedIcon
                            style={{
                              fontSize: '40px',
                              color: 'blueviolet',
                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              redirectToSlideLink(slideLink, history)
                            }
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
                />
              </div>
            </div>
            {hasDots ? (
              <div
                className={
                  classNames.sliderDots ?? 'sliderDots flexWrap_center'
                }>
                <ListView
                  listForRender={content}
                  ComponentForRender={({ data: { elIndex } }) => (
                    <span
                      className={setDotClass(elIndex)}
                      onClick={() => dotClick(elIndex)}></span>
                  )}
                />
              </div>
            ) : null}

            <div className={classNames.sliderNextBtn ?? 'slider__nextBtn'}>
              <FontAwesomeIcon
                icon={faAngleRight}
                onClick={() => nextBtnClick()}
              />
            </div>
            {notDescr ? (
              <Logo>
                <h2>Fish@ka.com</h2>
                <h4>Ваш любимый магазин</h4>
              </Logo>
            ) : (
              ''
            )}

            <div className={classNames.sliderPrevBtn ?? 'slider__prevBtn'}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                onClick={() => prevBtnClick()}
              />
            </div>
          </div>
        </Wrapper>
      </Paper>
    </Box>
  );
};
export default withRouter(RendeSlider);

const Logo = styled.div`
  position: absolute;
  position: absolute;
  bottom: 0;
  right: 38%;
  color: aliceblue;
`;
const Wrapper = styled.div`
  .slider {
    width: 97%;
    padding: 40px;
    height: 100%;
    position: relative;
    &_main {
      height: 520px;
      padding: 0;
      border: none;
      box-shadow: 0px 6px 10px 15px rgb(0 0 0 / 10%);
    }
    &__wrapper {
      overflow: hidden;
    }
    &__track {
      display: flex;
      transition: all 0.5s;
    }
    &__item {
      position: relative;
      height: 100%;
      padding: 0 40px;

      &-moreInfo {
        padding: 8px;
        margin-top: 13px;
        background-color: aliceblue;
        width: 100%;
        color: #ffffff;
        font-size: 23px;
        box-shadow: 0 0 5px aliceblue;
        div {
          svg {
            color: gold;
            cursor: default;
          }
        }
        .more {
          cursor: pointer;
          transition: all 0.2s;
          &:hover {
            color: #c54444;
          }
        }
      }
      &_main {
        padding: 0;
        img {
          height: 520px;
        }
      }
    }
    &__nextBtn,
    &__prevBtn {
      position: absolute;
      padding: 10px 25px;
      border-radius: 100%;
      top: 50%;
      color: #c54444;
      transform: translateY(-50%);
      font-size: 30px;
      svg {
        cursor: pointer;
      }
      &_main {
        background-color: #ffffff;
        color: #000000;
      }
    }
    &__nextBtn {
      right: 0;
      &_main {
        right: -3%;
        margin-right: 5px;
      }
    }
    &__prevBtn {
      left: 0;
      &_main {
        left: -3%;
        margin-left: 5px;
      }
    }
    .btn-slide {
      position: absolute;
      bottom: 10%;
      right: 2%;
      font-size: 15px;
      color: #ffffff;
    }
    .sliderDots {
      position: absolute;
      bottom: 5%;
      right: 2%;
      min-width: 200px;
      &__item {
        height: 10px;
        width: 10px;
        background-color: #ffffff;
        border-radius: 100%;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          background-color: #c54444;
        }
        &:nth-child(n) {
          margin-right: 7px;
        }
        &_active {
          background-color: #c54444;
        }
      }
    }
  }

  @media (max-width: 575px) {
    .slider {
      .sliderDots {
        left: 50%;
        transform: translateX(-50%);
      }
      &__item {
        padding: 0 8px;
        &-imgWrapper {
          &_bougthGoods {
            height: 350px;
          }
        }
        &_main {
          img {
            height: 200px;
          }
          .btn-slide {
            left: 50%;
            padding: 2px 5px;
            bottom: 15%;
            transform: translateX(-50%);
          }
        }
      }
      &__nextBtn {
        &_main {
          margin: 0;
          right: 0;
        }
      }
      &__prevBtn {
        &_main {
          margin: 0;
          left: 0;
        }
      }
      &__nextBtn,
      &__prevBtn {
        padding: 0;
        background-color: transparent;
      }
      &_main {
        height: 200px;
      }
    }
  }
`;
