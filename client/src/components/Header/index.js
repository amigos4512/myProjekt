/** @format */

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { scrollToTop } from '../../utils/workWithBrowser';
import { Link } from 'react-router-dom';
import { fetchGoods } from '../../actions/goodsList';
import AccountItems from './AccountItems';
import styled from 'styled-components';
import SearchAndSelect from '../Search/SearchAndSelect';

const StyledDiv = styled.div`
  .MuiAppBar-colorPrimary {
    color: #fff;
    background-color: rgb(0 0 0 / 87%);
  }
  .MuiToolbar-root {
    justify-content: space-between;
  }
`;

const SecondNav = styled.div`
  padding-right: 26px;
  padding-left: 26px;
  background-color: honeydew;
  top: 70px;
  position: relative;
  display: flex;
  align-items: center;
  height: 70px;
  justify-content: space-between;
  border-bottom: 2px solid silver;
  box-shadow: 0.3em 0.3em 1em rgba(0, 0, 0, 0.2);
`;
const StyledLinkSecond = styled(Link)`
  color: black;
  margin-right: 10px;
  text-decoration: none;
  :hover {
    color: fuchsia;
    text-decoration: none;
  }
`;
const StyledLinkFirst = styled(Link)`
  color: white;
  margin-right: 10px;
  font-size: 16px;
  text-decoration: none;
  :hover {
    color: fuchsia;
    text-decoration: none;
  }
`;
export default function Header() {
  return (
    <>
      <StyledDiv>
        <AppBar position='fixed'>
          <Toolbar>
            <div>
              <Link
                style={{
                  marginRight: '36px',
                  color: 'yellowgreen',
                  textDecoration: 'none',
                }}
                to='/'
                onClick={() => {
                  scrollToTop();
                  fetchGoods({ type: 'bestGoods' });
                }}>
                Fish@ka.com
              </Link>
              <StyledLinkFirst
                to='/delivery'
                onClick={() => {
                  scrollToTop();
                }}>
                {' '}
                Доставка
              </StyledLinkFirst>
              <StyledLinkFirst to='/payment'>Оплата</StyledLinkFirst>
            </div>
            <AccountItems />
          </Toolbar>
        </AppBar>
      </StyledDiv>
      <SecondNav>
        <Typography variant='h6'>
          <StyledLinkSecond
            to='/Goods/new'
            onClick={() => {
              scrollToTop();
              fetchGoods({ type: 'newGoods' });
            }}>
            Новинки
          </StyledLinkSecond>

          <StyledLinkSecond
            to='/Goods/popular'
            onClick={e => {
              scrollToTop();
              fetchGoods({ type: 'popularGoods' });
            }}>
            Популярное
          </StyledLinkSecond>

          <StyledLinkSecond
            to='/Goods'
            onClick={() => {
              scrollToTop();
              fetchGoods({});
            }}>
            Все товары
          </StyledLinkSecond>
        </Typography>
        <SearchAndSelect />
      </SecondNav>
    </>
  );
}
