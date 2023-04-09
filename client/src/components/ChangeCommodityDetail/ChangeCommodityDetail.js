/** @format */

import React from 'react';
import ImgUploader from '../ImgUploader';
import ChangeCommodityBtn from './ChangeCommodityBtn';
import InputWithPrompts from '../InputWithPrompts';
import {
  workWithCommodityData,
  deleteCommodity,
} from '../../utils/workWithApiRequests';
import { validateInput } from '../../utils/workWithBrowser';
import { connectToStore } from '../../utils/workWithRedux';
import {
  updateDescr,
  updateImg,
  updatePreviewImg,
  updatePrice,
  updateShortDescr,
  updateTitle,
  updateCategory,
} from '../../actions/commodityData.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const ChangeCommodityDetails = styled.form`
  textarea {
    min-height: 200px;
  }
  label {
    text-align: right;
  }
  .addBtn {
    margin-right: 15px;
  }
`;

const DeleteCommodity = styled.div``;

const ChangeCommodityDetail = ({
  type,
  userData: { token },
  dataForPrompts: { categorys },
  commodityData: {
    title,
    descr,
    shortDescr,
    img,
    previewImg,
    price,
    updatedFields,
    category,
    id,
  },
  actions: {
    updateImg,
    updatePreviewImg,
    updateTitle,
    updateDescr,
    updatePrice,
    updateShortDescr,
    updateCategory,
  },
  history,
}) => {
  const fieldsForChangeBtn =
    type === 'update'
      ? updatedFields
      : {
          title,
          descr,
          shortDescr,
          img,
          previewImg,
          price,
          category,
        };


  return (
    <>
      <h2 style={{ textAlign: 'center' }}>
        {type !== 'create' ? 'Редактировать товар' : 'Создать товар'}
      </h2>
      <Card
        style={{
          textalign: 'center',
          margin: '0 auto',
          maxWidth: '600px',
          textAlign: 'center',
        }}>
        <ChangeCommodityDetails
          onSubmit={e =>
            workWithCommodityData(e, updatedFields, token, type, id, history)
          }>
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              Название:
            </Typography>
            <TextField
              style={{ width: '80%' }}
              hiddenLabel
              id='filled-hidden-label-normal'
              defaultValue={title}
              variant='filled'
              onChange={e => validateInput(e, updateTitle)}
              required
            />
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              Категория:
            </Typography>
            <InputWithPrompts
              funcForUpdate={updateCategory}
              defaultValue={category}
              valuesForPrompts={categorys}
            />
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              Краткое описание:
            </Typography>
            <TextField
            placeholder='Не более 300 символов*'
              style={{ width: '80%' }}
              hiddenLabel
              id='filled-hidden-label-normal'
              value={shortDescr}
              variant='filled'
              onChange={e =>
                validateInput(
                  e,
                  updateShortDescr,
                  input => input.value.length < 300
                )
              }
              required
              multiline
            />
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              Превью:
            </Typography>
            <ImgUploader
              img={{
                src: previewImg?.previewImgSrc,
                alt: previewImg?.previewImgAlt,
                id: previewImg?.previewImgId,
              }}
              actionForUpdateImgData={updatePreviewImg}
            />
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              Полное описание:
            </Typography>
            <TextField
              style={{ width: '80%' }}
              hiddenLabel
              id='filled-hidden-label-normal'
              value={descr}
              onChange={e => validateInput(e, updateDescr)}
              variant='filled'
              required
              multiline
            />
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              Изображение:
            </Typography>
            <ImgUploader
              img={{
                src: img?.imgSrc,
                alt: img?.imgAlt,
                id: img?.imgId,
              }}
              actionForUpdateImgData={updateImg}
            />
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              Цена:
            </Typography>
            <TextField
              style={{ width: '80%' }}
              hiddenLabel
              id='filled-hidden-label-normal'
              value={price}
              variant='filled'
              onChange={e =>
                validateInput(e, updatePrice, input =>
                  Number.isInteger(+input.value)
                )
              }
              required
            />
          </CardContent>

          <ChangeCommodityBtn type={type} updatedFields={fieldsForChangeBtn} />
        </ChangeCommodityDetails>
        {type !== 'create' && (
          <DeleteCommodity>
            <Button
              style={{ margin: '10px' }}
              variant='contained'
              onClick={() => deleteCommodity(id, token, history)}>
              Удалить товар
            </Button>
          </DeleteCommodity>
        )}
      </Card>
    </>
  );
};

export default connectToStore(
  ['userData.token', 'commodityData', 'dataForPrompts.categorys'],
  {
    updateDescr,
    updateImg,
    updatePreviewImg,
    updatePrice,
    updateShortDescr,
    updateTitle,
    updateCategory,
  }
)(ChangeCommodityDetail, true);
