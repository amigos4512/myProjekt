/** @format */
import React, { useState } from 'react';
import { STORE_NAME } from '../../utils/workWithBrowser';
import { ReactTitle } from 'react-meta-tags';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import UsersService from '../../services/UsersService';

const StyledButton = styled(Button)`
  margin: 10px !important;
  & a {
    text-decoration: none;
  }
`;

const HelpLoginPage = () => {
  const [hasError, setError] = useState(false);
  const [values, setValues] = useState({
    email: '',
    show: false,
    disabled: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClick = () => {
    setValues({
      ...values,
      show: true,
    });
  };
  const disable = () => {
    setValues({
      ...values,
      disabled: true,
    });
  };

  const errorHahdler = () => {
    setError(true);
  };

  const resetPassword = async (e, type, token = null) => {
    e.persist();
    e.preventDefault();
    const data = values;
    try {
      if (type === 'req') {
        await UsersService.resetPassword(data);
        handleClick();
        disable();
      } else if (type === 'create') {
        await UsersService.createNewPassword(token, data);
        localStorage.setItem('userData', JSON.stringify({ token }));
        disable();
      }
    } catch (error) {
      console.warn(error);
      errorHahdler();
    }
  };
  console.log(hasError);
  return (
    <>
      <ReactTitle title={`${STORE_NAME} | Восстановление пароля`} />
      <div style={{ textAlign: 'center' }}>
        <Box
          sx={{
            width: '50%',
            margin: '33ch auto',
            backgroundColor: 'aliceblue',
            border: '1px solid grey',
          }}
          component='form'
          onSubmit={e => resetPassword(e, 'req')}>
          <h2>Восстановление пароля</h2>
          <FormControl sx={{ m: '22px', width: '80%' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-email'>email</InputLabel>
            <OutlinedInput
              disabled={values.disabled ? true : false}
              placeholder='Введите ваш email'
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
            {hasError && <div style={{ color: 'red' }}>Неверный email</div>}
          </FormControl>

          <StyledButton
            disabled={values.disabled ? true : false}
            variant='contained'
            color='success'
            type='submit'
            onClick={handleClick}>
            Восстановить пароль
          </StyledButton>

          {values.show && !hasError && (
            <>
              <p style={{ color: 'green' }}>
                Письмо для восстановления пароля отправлено на ваш email
              </p>

              <StyledButton variant='outlined'>
                <Link to='/'>На главную</Link>
              </StyledButton>
            </>
          )}
        </Box>
      </div>
    </>
  );
};

export default HelpLoginPage;
