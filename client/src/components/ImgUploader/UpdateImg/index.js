import React, { useState } from 'react';
import FileUploader from '../../FileUploader/FileUploader';

import {
  createValidImgSrc,
  validateInput,
} from '../../../utils/workWithBrowser';
import CreateUpdateImgBtn from './UpdateImgBtn';
import TextField from '@mui/material/TextField';

const UpdateImg = ({ img: { src, id, alt }, funcForUpdateData }) => {
  const [previewSrc, updatePreviewSrc] = useState(null),
    [imgAlt, updateImgAlt] = useState(alt),
    [img, updateLocalImg] = useState(null);

  return (
    <div className={`modalWindow updateImg updateImg_${id} row hiddenElem`}>
      <span data-close={true}></span>

      <div className='updateImg__imgDetail flexWrapColumn_center col-5'>
        <div className='formGroup row'>
          {/* <label className='col-sm-2 formControlLable'>Alt:</label> */}
          <div className='col-sm-10'>
            <TextField
              style={{ width: '80%' }}
              id='filled-textarea'
              label='Alt:'
              placeholder='Alt'
              variant='filled'
              value={imgAlt?.trimStart()}
              onChange={e => validateInput(e, updateImgAlt)}
              required
              size='small'
            />
            {/* <input
              type='text'
              className='formControl'
              value={imgAlt?.trimStart()}
              onChange={e => validateInput(e, updateImgAlt)}
            />
            <div className='invalidFeedback'>
              Поле обязательно и не должно быть пустым
            </div> */}
          </div>
        </div>
        <FileUploader
          action={(file, src) => {
            updatePreviewSrc(src);
            updateLocalImg(file);
          }}
          id={id}
          text='Загрузить новый файл'
        />
        <CreateUpdateImgBtn
          updateFunc={funcForUpdateData}
          dataForUpdate={{
            img,
            imgSrc: previewSrc,
            oldImgSrc: src,
            newAlt: imgAlt,
            oldAlt: alt,
          }}
        />
      </div>
      <div className='updateImg__preview flexWrap_center col-7'>
        <img
          style={{ maxWidth: '500px', maxHeight: '500px', minWidth: '400px' }}
          src={
            !previewSrc
              ? `${createValidImgSrc(src)}`
              : createValidImgSrc(previewSrc)
          }
          alt={`img:${alt}`}
        />
      </div>
    </div>
  );
};

export default UpdateImg;
