/** @format */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { redirectToLink, smoothScrollToTop } from '../../utils/workWithBrowser';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import SmsIcon from '@mui/icons-material/Sms';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { withRouter } from 'react-router';

const Content = styled.div`
  color: white;
  text-align: center;
  padding: 2rem;
  span {
    margin-left: 15px;
    color: aqua;
  }
`;

const FooterWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.87);
  margin-top: 10px;
  .upArrow {
    position: fixed;
    bottom: 3%;
    left: 2%;
    color: blueviolet;
    &:hover {
      color: brown;
      transform: scale(1.2);
      transition: all 0.5s ease-out;
    }
  }
  .fas {
    font-size: 60px;
    cursor: pointer;
  }
  .feedback {
    position: fixed;
    bottom: 3%;
    right: 2%;
    border-radius: 50%;
    width: 135px;
    height: 135px;
    &:hover {
      border: 1px solid antiquewhite;
      background-color: aliceblue;
    }
    .mainIcon {
      position: absolute;
      bottom: 20%;
      right: 26%;
      color: blueviolet;
      &:hover {
        color: brown;
        transform: scale(1.2);
        transition: all 0.5s ease-out;
      }
    }
    .helperIcon {
      position: absolute;
      color: brown;
      cursor: pointer;
      &:hover {
        color: darkviolet;
        transform: scale(1.5);
        transition: all 0.5s ease-out;
      }
    }

    .helperIcon1 {
      top: 9%;
      right: 18%;
    }
    .helperIcon2 {
      top: 3%;
      left: 22%;
    }
    .helperIcon3 {
      bottom: 48%;
      left: 5%;
    }
  }
`;

const Footer = () => {
  const [show, setShow] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const showFooterHidenElements = () => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 252) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  };

  useEffect(() => {
    showFooterHidenElements();
  }, []);

  return (
    <FooterWrapper>
      <Content>
        Produced by:
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => redirectToLink('https://mail.ukr.net')}>
          amigos4512@ukr.net &nbsp; {new Date().getFullYear()}
        </span>
      </Content>

      {show ? (
        <>
          <div className='upArrow ' onClick={() => smoothScrollToTop()}>
            <KeyboardArrowUpIcon className='fas' />
          </div>
          <div
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
            className='feedback '>
            <div className='mainIcon'>
              <SmsIcon className='fas' />
            </div>
            {showIcon ? (
              <>
                <div className='helperIcon helperIcon1 '>
                  <InstagramIcon
                    style={{ fontSize: '2rem' }}
                    onClick={() => redirectToLink('https://www.instagram.com')}
                  />
                </div>
                <div className='helperIcon helperIcon2 '>
                  <TelegramIcon
                    style={{ fontSize: '2rem' }}
                    onClick={() => redirectToLink('https://telegram.com')}
                  />
                </div>
                <div className='helperIcon helperIcon3 '>
                  <FacebookIcon
                    style={{ fontSize: '2rem' }}
                    onClick={() => redirectToLink('https://www.facebook.com')}
                  />
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        ''
      )}
    </FooterWrapper>
  );
};

export default withRouter(Footer);
