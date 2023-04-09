/** @format */
import React, { useState } from 'react';
import { connectToStore } from '../../utils/workWithRedux';
import { STORE_NAME } from '../../utils/workWithBrowser';
import { registration } from '../../actions/userData';
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

const RegistrationPage = ({ actions: { registration }, history }) => {
  const [values, setValues] = useState({
    fullName: '',
    password: '',
    userName: '',
    email: '',
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

  const registrationSubmit = e => authRequests(e, registration, history);

  return (
    <>
      <ReactTitle title={`${STORE_NAME} | Регистрация`} />
      <div style={{ textAlign: 'center' }}>
        <Box
          sx={{
            width: '50%',
            height: '76ch',
            margin: '26ch auto',
            backgroundColor: 'aliceblue',
            border: '1px solid grey',
          }}
          component='form'
          onSubmit={registrationSubmit}>
          <h2>Пожалуйста зарегистрируйтесь</h2>
          <FormControl sx={{ m: '22px', width: '80%' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-fullName'>
              fullName
            </InputLabel>
            <OutlinedInput
              placeholder='Как вас зовут?'
              required
              type='text'
              id='outlined-adornment-fullName'
              value={values.fullName}
              onChange={handleChange('fullName')}
              aria-describedby='outlined-fullName-helper-text'
              inputProps={{
                'aria-label': 'fullName',
              }}
              label='fullName'
            />
          </FormControl>

          <FormControl sx={{ m: '22px', width: '80%' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-userName'>
              userName
            </InputLabel>
            <OutlinedInput
              placeholder='Придумайте уникальное имя пользователя'
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
            <div className='invalidFeedback'>
              Извините, но пользователь с таким ником уже есть
            </div>
          </FormControl>

          <div className='invalidFeedback'>Неверный пароль</div>
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
          <FormControl sx={{ m: '22px', width: '80%' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-email'>email</InputLabel>
            <OutlinedInput
              placeholder='Введите действующий Email'
              required
              type='text'
              name='email'
              id='outlined-adornment-email'
              value={values.email}
              onChange={handleChange('email')}
              aria-describedby='outlined-email-helper-text'
              inputProps={{
                'aria-label': 'email',
              }}
              label='email'
            />
            <div className='invalidFeedback'>
              Извините, но пользователь с таким email уже есть
            </div>
          </FormControl>

          <StyledButton variant='contained' color='success' type='submit'>
            Зарегистрироваться
          </StyledButton>
        </Box>
      </div>
    </>
  );
};

export default connectToStore(null, { registration })(RegistrationPage);
