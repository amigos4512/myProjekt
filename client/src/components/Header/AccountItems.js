/** @format */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '@mui/material/Badge';
// import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { faUserCircle, faTools } from '@fortawesome/free-solid-svg-icons';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/workWithBrowser';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { createValidImgSrc } from '../../utils/workWithBrowser';
import { isLogout } from '../../actions/userData';

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const StyledDiv = styled.div`
  color: aliceblue;
  margin: 0 8px;
  :hover {
    color: fuchsia;
    text-decoration: none;
  }
  & span {
    color: gray;
  }
`;
const StyledLink = styled(Link)`
  color: aliceblue;
  margin: 0 8px;
  display: flex;
  align-items: center;
  text-decoration: none;
  :hover {
    color: fuchsia;
    text-decoration: none;
  }
`;

const Flex = styled.div`
  display: flex;
`;
const Auth = styled.div`
  display: flex;
  align-items: center;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: aliceblue;
  margin: 0 8px;
  font-size: 33px;
  :hover {
    color: antiquewhite;
    text-decoration: none;
  }
`;

const AccountItems = ({
  userData: { userName },
  shopingCart: { countGoods },
  actions: { isLogout },
  mode = 'desktop',
}) => {
  const avatar = useSelector(state => state.userData.avatarSrc);
  return (
    <>
      {userName === 'admin' ? (
        <>
          <StyledLink
            to='/admin'
            className='flexWrap elem'
            onClick={() => scrollToTop()}>
            <StyledFontAwesomeIcon icon={faTools} />
            <div>Админ панель</div>
          </StyledLink>
          <StyledLink
            to={{ pathname: '/', state: 'logOut' }}
            onClick={() => isLogout()}>
            Выйти
          </StyledLink>
        </>
      ) : (
        ''
      )}
      {userName && userName !== 'admin' ? (
        <>
          <StyledLink
            to='/MyAccount'
            className='flexWrap elem'
            onClick={() => scrollToTop()}>
            <StyledDiv>
              <span>Рады снова вас видеть!&nbsp; </span> {userName}
            </StyledDiv>
            <img
              src={createValidImgSrc(avatar)}
              alt={`${userName}-avatar`}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          </StyledLink>
          <Flex>
            <StyledLink
              to={{ pathname: '/', state: 'logOut' }}
              onClick={() => isLogout()}>
              Выйти
            </StyledLink>

            <StyledLink
              to='/Cart'
              className='flexWrap elem'
              onClick={() => scrollToTop()}>
              {!countGoods ? (
                <ShoppingCartIcon style={{ color: 'aqua', fontSize: '30px' }} />
              ) : (
                <IconButton aria-label='cart'>
                  <StyledBadge badgeContent={countGoods} color='secondary'>
                    <ShoppingCartIcon
                      style={{ color: 'aqua', fontSize: '30px' }}
                    />
                  </StyledBadge>
                </IconButton>
              )}
            </StyledLink>
          </Flex>
        </>
      ) : (
        ''
      )}
      {!userName ? (
        <Auth>
          <StyledLink to='/Login' onClick={() => scrollToTop()}>
            <StyledFontAwesomeIcon icon={faUserCircle} />
            <StyledDiv>Войти</StyledDiv>
          </StyledLink>
          <div>/</div>
          <StyledLink to='/Registration' onClick={() => scrollToTop()}>
            Зарегистрироваться
          </StyledLink>
        </Auth>
      ) : (
        ''
      )}
    </>
  );
};
export default connectToStore(
  ['userData', 'shopingCart.countGoods'],
  { isLogout },
  null
)(AccountItems);
