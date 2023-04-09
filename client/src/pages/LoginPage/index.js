/** @format */
import React, { useState } from 'react';
import { connectToStore } from '../../utils/workWithRedux';
import { Link } from 'react-router-dom';
import { STORE_NAME } from '../../utils/workWithBrowser';
import { authorization } from '../../actions/userData';
import { ReactTitle } from 'react-meta-tags';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styled from 'styled-components';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

const StyledButton = styled(Button)`
  margin: 10px !important;
  & a {
    text-decoration: none;
  }
`;

const LoginPage = ({ actions: { authorization }, history }) => {
  const [values, setValues] = useState({
    password: '',
    userName: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const authRequests = (e, requestsToApi, history) => {
    e.preventDefault();
    const data = values;
    requestsToApi(data, { values }, history);
  };

  const loginSubmit = e => authRequests(e, authorization, history);

  return (
    <>
      <ReactTitle title={`${STORE_NAME} | Авторизация`} />
      <div style={{ textAlign: 'center' }}>
        <Box
          sx={{
            width: '50%',
            height: '47ch',
            margin: '26ch auto',
            backgroundColor: 'aliceblue',
            border: '1px solid grey',
          }}
          component='form'
          onSubmit={loginSubmit}>
          <h2>Войдите в свой аккаунт</h2>
          <FormControl sx={{ m: '22px', width: '80%' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-userName'>
              userName
            </InputLabel>
            <OutlinedInput
              required
              type='text'
              id='outlined-adornment-userName'
              value={values.userName}
              onChange={handleChange('userName')}
              aria-describedby='outlined-userName-helper-text'
              inputProps={{
                'aria-label': 'userName',
              }}
              label='userName'
            />
          </FormControl>
          <div>
            <FormControl sx={{ m: '22px', width: '80%' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                required
                name='password'
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'>
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
            </FormControl>
          </div>
          <StyledButton variant='contained' color='success' type='submit'>
            Войти
          </StyledButton>
          <StyledButton variant='contained'>
            <Link to='/Registration' style={{ color: 'aliceblue' }}>
              Зарегистрироваться
            </Link>
          </StyledButton>
          <StyledButton variant='outlined'>
            <Link to='/helpLogin'>Забыли пароль?</Link>
          </StyledButton>
        </Box>
      </div>
    </>
  );
};

export default connectToStore(null, { authorization })(LoginPage);
