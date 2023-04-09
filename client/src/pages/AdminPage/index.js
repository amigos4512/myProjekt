/** @format */

import React from 'react';
import LoadingData from '../../components/LoadingData';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { isLogout } from '../../actions/userData';
import { STORE_NAME } from '../../utils/workWithBrowser';
import { ReactTitle } from 'react-meta-tags';

const StyledLink = styled(Link)`
  color: aliceblue;
  background-color: black;
  padding: 10px;
  margin: 10px;
  border-radius: 6px;
  text-decoration: none;
`;

const AdminPage = ({
  userData: { loading, error },
  actions: { isLogout },
  history,
}) => {
  return (
    <div style={{ minHeight: '71vh', textAlign: 'center' }}>
      <ReactTitle title={`${STORE_NAME} | Админ панель`} />
      <LoadingData
        configData={{
          loading,
          error,
        }}>
        <h2 style={{ marginBottom: '110px' }}>Создать новый товар</h2>
        <StyledLink
          to={{ pathname: '/', state: 'logOut' }}
          onClick={() => isLogout()}>
          Выйти
        </StyledLink>
        <StyledLink to='/admin/createCommodity'>Создать новый товар</StyledLink>
      </LoadingData>
    </div>
  );
};

export default connectToStore(['userData'], { isLogout })(AdminPage);
