/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { onAddedToCart } from '../../actions/shopingCart';
import { connectToStore } from '../../utils/workWithRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { redirectToPage } from '../../utils/workWithBrowser';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: #fff;
  :hover {
    color: inherit;
    text-decoration: none;
  }
`;

const SwitchBuyBtn = ({
  userData: { token, userName },
  actions: { onAddedToCart },
  id,
  history,
}) => {
  if (userName === 'admin') {
    return (
      <Button variant='contained'>
        {' '}
        <StyledLink to={`/admin/updateCommodity/${id}`}>
          <FontAwesomeIcon icon={faWrench} />
        </StyledLink>
      </Button>
    );
  }
  if (!userName) {
    return (
      <Button
        variant='outlined'
        onClick={() => {
          const redirectToAuthPage = window.confirm(
            'Для того чтобы купить товар нужно авторизироваться'
          );
          if (redirectToAuthPage) {
            redirectToPage(history, '/Login');
          }
        }}>
        Купить
      </Button>
    );
  }
  if (userName) {
    return (
      <Button variant='contained' onClick={() => onAddedToCart(id, token)}>
        Купить
      </Button>
    );
  }
};

export default connectToStore(['userData'], { onAddedToCart })(
  SwitchBuyBtn,
  true
);
