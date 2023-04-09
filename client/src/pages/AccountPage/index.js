import React, { useState, useEffect } from 'react';
import LoadingData from '../../components/LoadingData';
import Reviews from './Reviews';
import BoughtGoods from './BoughtGoods';
import UpdateUserDataBtn from './UpdateUserDataBtn';
import FileUploader from '../../components/FileUploader/FileUploader';
import Button from '@mui/material/Button';
import { connectToStore } from '../../utils/workWithRedux';
import { isLogout } from '../../actions/userData';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {
  createValidImgSrc,
  validateInput,
  STORE_NAME,
} from '../../utils/workWithBrowser';
import { ReactTitle } from 'react-meta-tags';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControl from '@mui/material/FormControl';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  background-color: firebrick;
  color: aliceblue;
  padding: 11px;
  border-radius: 5px;
  text-decoration: none;
`;
const AccountPage = ({
  userData: {
    loading,
    error,
    userName,
    fullName,
    email,
    about,
    avatar,
    avatarSrc,
  },
  actions: { isLogout },
}) => {
  const [localUserName, updateLocalUserName] = useState(userName),
    [localUserFullName, updateLocalFullName] = useState(fullName),
    [localUserEmail, updateLocalUserEmail] = useState(email),
    [localUserAvatar, updateLocalUserAvatar] = useState({ avatarSrc, avatar }),
    [localUserInfo, updateLocalUserInfo] = useState(about);

  useEffect(() => {
    updateLocalUserName(userName);
  }, [userName]);
  useEffect(() => {
    updateLocalUserEmail(email);
  }, [email]);
  useEffect(() => {
    updateLocalFullName(fullName);
  }, [fullName]);
  useEffect(() => {
    updateLocalUserInfo(about);
  }, [about]);
  useEffect(() => {
    updateLocalUserAvatar(avatarData => ({
      ...avatarData,
      avatarSrc,
    }));
  }, [avatarSrc]);

  if (userName === 'admin') {
    return <Redirect to='/admin' />;
  }
  return (
    <>
      <ReactTitle title={`${STORE_NAME} | Аккаунт`} />
      <LoadingData
        configData={{
          loading,
          error: userName ? null : error,
        }}>
        <form>
          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            justifyContent='center'>
            <Avatar
              alt={`${userName}-avatar`}
              src={createValidImgSrc(localUserAvatar.avatarSrc)}
              sx={{ width: 256, height: 256 }}
            />

            <FileUploader
              text='Обновить фото'
              withDropDown={false}
              action={(file, src) =>
                updateLocalUserAvatar({ avatarSrc: src, avatar: file })
              }
            />
            {localUserAvatar.avatarSrc !== avatarSrc && (
              <div>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() =>
                    updateLocalUserAvatar({
                      avatar,
                      avatarSrc,
                    })
                  }>
                  Отменить
                </Button>
              </div>
            )}
          </Stack>
          <Stack
            direction='column'
            spacing={2}
            alignItems='center'
            justifyContent='center'>
            <FormControl sx={{ m: '22px', width: '80%' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-fullName'>
                Full name
              </InputLabel>
              <OutlinedInput
                type='text'
                value={localUserFullName?.trimStart()}
                onChange={e => validateInput(e, updateLocalFullName)}
                required
                id='outlined-adornment-fullName'
                aria-describedby='outlined-fullName-helper-text'
                inputProps={{
                  'aria-label': 'Full name',
                }}
                label='Full name'
              />
            </FormControl>
            <FormControl sx={{ m: '22px', width: '80%' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-login'>Логин:</InputLabel>
              <OutlinedInput
                type='text'
                value={localUserName?.trimStart()}
                onChange={e => validateInput(e, updateLocalUserName)}
                required
                id='outlined-adornment-login'
                aria-describedby='outlined-login-helper-text'
                inputProps={{
                  'aria-label': 'login',
                }}
                label='Логин:'
              />
            </FormControl>
            <FormControl sx={{ m: '22px', width: '80%' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-userEmail'>
                Почта:
              </InputLabel>
              <OutlinedInput
                type='text'
                value={localUserEmail?.trimStart()}
                onChange={e => validateInput(e, updateLocalUserEmail)}
                required
                id='outlined-adornment-userEmail'
                aria-describedby='outlined-userEmail-helper-text'
                inputProps={{
                  'aria-label': 'Почта:',
                }}
                label='Почта:'
              />
            </FormControl>
            <TextareaAutosize
              aria-label='empty userInfo'
              value={localUserInfo}
              rows={50}
              className='accountPage__userInfo-aboutUser formControl'
              placeholder='Расскажите о себе...'
              onChange={e => updateLocalUserInfo(e.target.value)}
              style={{ width: '80%', borderColor: 'aqua', marginBottom: 20 }}
            />
            <UpdateUserDataBtn
              newUserData={{
                userName: localUserName,
                fullName: localUserFullName,
                email: localUserEmail,
                about: localUserInfo,
                avatar: localUserAvatar,
              }}
            />
          </Stack>
        </form>
        <BoughtGoods />
        <Reviews />
        <Stack
          direction='column'
          spacing={2}
          alignItems='center'
          justifyContent='center'>
          <StyledLink
            to={{ pathname: '/', state: 'logOut' }}
            onClick={() => isLogout()}>
            Выход
          </StyledLink>
        </Stack>
      </LoadingData>
    </>
  );
};

export default connectToStore(['userData'], { isLogout })(AccountPage);
